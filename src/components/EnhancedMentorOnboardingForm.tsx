import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { mentorApplicationSchema, createRateLimiter } from "@/lib/validation";
import {
  MENTOR_TIER_PRICING,
  getPricingBandForTier,
  formatCurrency,
  validateRateForTier,
  PRICING_VERSION,
} from "@/config/mentorPricing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Upload,
  FileText,
  CheckCircle,
  User,
  Briefcase,
  Award,
  Clock,
  Shield,
  FileUp,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

const mentorshipAreaOptions = [
  "CV Review & Optimization",
  "Interview Preparation",
  "Clinical Skills Assessment",
  "Medical Registration (GMC)",
  "NHS Job Applications",
  "Specialty Training Guidance",
  "Academic Medicine",
  "Research & Publications",
  "Leadership Development",
  "Career Progression",
];

const specialtyOptions = [
  "General Medicine",
  "General Surgery",
  "Cardiology",
  "Neurology",
  "Psychiatry",
  "Paediatrics",
  "Obstetrics & Gynaecology",
  "Anaesthetics",
  "Radiology",
  "Pathology",
  "Emergency Medicine",
  "General Practice",
  "Public Health",
  "Other",
];

const tierOptions = [
  {
    value: "associate",
    label: "Associate Mentor",
    description: "Recently qualified or early career NHS professional",
  },
  {
    value: "senior",
    label: "Senior Mentor",
    description: "Experienced NHS professional with 5+ years",
  },
  {
    value: "principal",
    label: "Principal Mentor",
    description: "Senior consultant or leadership role",
  },
];

// Enhanced form schema with all required fields
const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone number is required"),
    gmcNumber: z
      .string()
      .min(7, "GMC number must be 7 digits")
      .max(7, "GMC number must be 7 digits"),
    specialty: z.string().min(1, "Specialty is required"),
    experienceYears: z.number().int().min(0).max(50),
    bio: z.string().min(50, "Bio must be at least 50 characters"),
    jobTitle: z.string().optional(),
    nhsTrust: z.string().optional(),
    mentorTier: z
      .enum(["associate", "senior", "principal"])
      .default("associate"),
    hourlyRate: z
      .number()
      .multipleOf(
        0.01,
        "Please enter a valid amount with up to 2 decimal places"
      )
      .optional(),
    mentoringAreas: z
      .array(z.string())
      .min(1, "Select at least one mentoring area"),
    calendlyLink: z
      .string()
      .url("Valid Calendly URL required")
      .optional()
      .or(z.literal("")),
    gdprConsent: z
      .boolean()
      .refine((val) => val === true, "GDPR consent is required"),
    recordingConsent: z.boolean(),
    termsConsent: z
      .boolean()
      .refine((val) => val === true, "Terms consent is required"),
  })
  .refine(
    (data) => {
      if (data.hourlyRate !== undefined && data.mentorTier) {
        const validation = validateRateForTier(
          data.hourlyRate,
          data.mentorTier
        );
        return validation.valid;
      }
      return true;
    },
    {
      message: "Hourly rate must be within your tier's range",
      path: ["hourlyRate"],
    }
  );

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    title: "Personal Information",
    icon: User,
    fields: ["fullName", "email", "phone"],
  },
  {
    id: 2,
    title: "Professional Credentials",
    icon: Briefcase,
    fields: [
      "gmcNumber",
      "specialty",
      "nhsTrust",
      "jobTitle",
      "experienceYears",
    ],
  },
  {
    id: 3,
    title: "Mentor Profile",
    icon: Award,
    fields: ["mentorTier", "bio", "mentoringAreas", "hourlyRate"],
  },
  { id: 4, title: "Availability Setup", icon: Clock, fields: ["calendlyLink"] },
  { id: 5, title: "Document Upload", icon: FileUp, fields: [] },
  {
    id: 6,
    title: "Consent & Terms",
    icon: Shield,
    fields: ["gdprConsent", "recordingConsent", "termsConsent"],
  },
];

interface EnhancedMentorOnboardingFormProps {
  onClose: () => void;
  isOpen: boolean;
}

// Rate limiter for form submissions (max 3 submissions per 15 minutes)
const submitRateLimiter = createRateLimiter(15 * 60 * 1000, 3);

const EnhancedMentorOnboardingForm: React.FC<
  EnhancedMentorOnboardingFormProps
> = ({ onClose, isOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<{
    [key: string]: File;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentoringAreas: [],
      mentorTier: "associate",
      gdprConsent: false,
      recordingConsent: false,
      termsConsent: false,
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const handleDocumentUpload = (documentType: string, file: File) => {
    setUploadedDocuments((prev) => ({ ...prev, [documentType]: file }));
    toast.success(`${documentType} uploaded successfully`);
  };

  const nextStep = () => {
    const currentStepFields = steps[currentStep - 1]?.fields || [];

    form.trigger(currentStepFields as any).then((isValid) => {
      if (isValid && currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to submit your application");
        return;
      }

      // Apply rate limiting
      if (!submitRateLimiter(user.id)) {
        toast.error(
          "Too many submission attempts. Please wait 15 minutes before trying again."
        );
        return;
      }

      // Upload documents to storage if any
      const documentsMetadata: { [key: string]: string } = {};

      for (const [docType, file] of Object.entries(uploadedDocuments)) {
        const fileName = `${user.id}/${docType}_${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("mentor-documents")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
        } else {
          documentsMetadata[docType] = fileName;
        }
      }

      // Generate referral code
      const { data: referralCode } = await supabase.rpc(
        "generate_referral_code"
      );

      // Get pricing band for the selected tier
      const selectedTier = data.mentorTier as
        | "associate"
        | "senior"
        | "principal";
      const pricingBand = getPricingBandForTier(selectedTier);

      // Create mentor application
      const applicationData = {
        ...data,
        documents: documentsMetadata,
        referral_code: referralCode,
        pricing_band: {
          min: pricingBand.min,
          max: pricingBand.max,
          default: pricingBand.default,
        },
        version: PRICING_VERSION,
      };

      const { error: applicationError } = await supabase
        .from("mentor_applications")
        .insert({
          user_id: user.id,
          application_data: applicationData,
          documents: documentsMetadata,
        });

      if (applicationError) {
        throw applicationError;
      }

      // Assign mentor role
      await supabase.from("user_roles").insert({
        user_id: user.id,
        role: "mentor",
      });

      toast.success(
        "Application submitted successfully! We'll review it within 2-3 business days."
      );
      onClose();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@nhs.net"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+44 7XXX XXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="gmcNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GMC Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your General Medical Council registration number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Specialty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialtyOptions.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nhsTrust"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NHS Trust/Organisation</FormLabel>
                  <FormControl>
                    <Input placeholder="NHS Foundation Trust" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Consultant, Registrar, FY2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of NHS Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        const selectedTier = form.watch("mentorTier") || "associate";
        const pricingBand = getPricingBandForTier(
          selectedTier as "associate" | "senior" | "principal"
        );
        const currentRate = form.watch("hourlyRate");

        return (
          <div className="space-y-4">
            {/* Mentor Tier Selector */}
            <FormField
              control={form.control}
              name="mentorTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentor Tier</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Auto-prefill default rate when tier changes
                      const newBand = getPricingBandForTier(value as any);
                      form.setValue("hourlyRate", newBand.default);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mentor tier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tierOptions.map((tier) => (
                        <SelectItem key={tier.value} value={tier.value}>
                          <div>
                            <div className="font-medium">{tier.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {tier.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hourly Rate with Validation */}
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Hourly Rate (£)</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-[#F2F4F7]">
                          <p className="text-sm">
                            Recommended range based on your mentor badge. You
                            may adjust freely within this range.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min={pricingBand.min}
                      max={pricingBand.max}
                      placeholder={pricingBand.default.toString()}
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(value);

                        // Real-time validation feedback
                        if (!isNaN(value)) {
                          const validation = validateRateForTier(
                            value,
                            selectedTier as any
                          );
                          if (!validation.valid) {
                            form.setError("hourlyRate", {
                              type: "manual",
                              message: validation.error,
                            });
                          } else {
                            form.clearErrors("hourlyRate");
                          }
                        }
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Recommended range for your badge – Associate £20–£60, Senior
                    £80–£120, Principal £120–£200. You can set any amount within
                    this range now and adjust it later in your dashboard.
                  </FormDescription>
                  {currentRate && !isNaN(currentRate) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Your current mentoring fee per hour:{" "}
                      {formatCurrency(currentRate)} (Excluding VAT)
                    </p>
                  )}
                  <FormMessage className="text-[#D92D20]" />
                </FormItem>
              )}
            />

            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your medical journey, expertise, and what you can offer as a mentor..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 50 characters. This will be shown to potential
                    mentees.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mentoring Areas */}
            <FormField
              control={form.control}
              name="mentoringAreas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentoring Areas of Expertise</FormLabel>
                  <FormDescription>
                    Select all areas where you can provide guidance
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-3">
                    {mentorshipAreaOptions.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={field.value.includes(area)}
                          onCheckedChange={(checked) => {
                            const updatedAreas = checked
                              ? [...field.value, area]
                              : field.value.filter((item) => item !== area);
                            field.onChange(updatedAreas);
                          }}
                        />
                        <label
                          htmlFor={area}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Optional Enhancement: Micro-text */}
            <p className="text-xs text-muted-foreground">
              NextDoc UK adds VAT at checkout and auto-handles platform fees —
              you receive the full take-home amount.
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="calendlyLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calendly Booking Link (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://calendly.com/your-profile"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    If you have a Calendly account, paste your booking link
                    here. You can set this up later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Availability Setup</CardTitle>
                <CardDescription>
                  We recommend setting up a Calendly account for seamless
                  booking management. You can configure your availability and
                  integrate it with your calendar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>After approval, you'll be able to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Set your available time slots</li>
                    <li>Sync with your calendar</li>
                    <li>Manage booking preferences</li>
                    <li>Set buffer times between sessions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Upload Required Documents
              </h3>
              <p className="text-sm text-muted-foreground">
                Please upload the following documents to verify your credentials
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { key: "cv", label: "Current CV/Resume", required: true },
                {
                  key: "gmc_certificate",
                  label: "GMC Registration Certificate",
                  required: true,
                },
                {
                  key: "medical_degree",
                  label: "Medical Degree Certificate",
                  required: true,
                },
                {
                  key: "photo_id",
                  label: "Photo ID (Passport/Driving License)",
                  required: true,
                },
                {
                  key: "additional",
                  label: "Additional Certificates (Optional)",
                  required: false,
                },
              ].map((doc) => (
                <Card key={doc.key} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.label}</p>
                        {doc.required && (
                          <p className="text-xs text-red-500">Required</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {uploadedDocuments[doc.key] ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Uploaded</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) handleDocumentUpload(doc.key, file);
                            };
                            input.click();
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Consent & Terms</h3>
              <p className="text-sm text-muted-foreground">
                Please review and accept the following terms to complete your
                application
              </p>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="gdprConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>GDPR Consent (Required)</FormLabel>
                      <FormDescription className="text-sm">
                        I consent to NextDoc UK processing my personal data in
                        accordance with the
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary underline"
                        >
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </Button>
                        . This includes storing my application data, documents,
                        and contact information.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Session Recording Consent (Optional)
                      </FormLabel>
                      <FormDescription className="text-sm">
                        I consent to mentoring sessions being recorded for
                        quality assurance and training purposes. Recordings will
                        be stored securely and only accessed by authorized
                        personnel.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms & Conditions (Required)</FormLabel>
                      <FormDescription className="text-sm">
                        I agree to the NextDoc UK
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary underline mx-1"
                        >
                          <Link to="/terms-and-conditions">
                            Terms & Conditions
                          </Link>
                        </Button>
                        and
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary underline mx-1"
                        >
                          <Link to="/mentor-code-of-conduct">
                            Mentor Code of Conduct
                          </Link>
                        </Button>
                        . I understand my responsibilities as a mentor.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join as NHS Mentor</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center max-w-[80px] ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(currentStepData.icon, {
                      className: "h-5 w-5",
                    })}
                    {currentStepData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{renderStepContent()}</CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep === steps.length ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedMentorOnboardingForm;
