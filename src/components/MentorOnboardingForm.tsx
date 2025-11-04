import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Full name is required"),
  preferredName: z.string().min(1, "Preferred name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),

  // Professional Credentials
  gmcNumber: z.string().min(1, "GMC number is required"),
  currentEmployer: z.string().min(1, "Current employer is required"),
  currentRole: z.string().min(1, "Current role is required"),
  specialty: z.string().min(1, "Specialty is required"),
  subspecialty: z.string().optional(),
  clinicalExperience: z.string().min(1, "Clinical experience is required"),
  nhsExperience: z.string().min(1, "NHS experience is required"),
  qualifications: z.string().min(1, "Qualifications are required"),
  teachingRoles: z.string().optional(),
  mentorshipExperience: z.string().optional(),

  // Mentor Expertise & Availability
  mentorshipAreas: z.array(z.string()).min(1, "Select at least one area"),
  languages: z.string().min(1, "Languages are required"),
  availability: z.string().min(1, "Availability is required"),
  preferredFormat: z.string().min(1, "Preferred format is required"),

  // Mentorship Experience & Philosophy
  mentorshipApproach: z.string().min(1, "Mentorship approach is required"),
  successStories: z.string().optional(),
  challengingScenarios: z.string().min(1, "This field is required"),

  // Compliance & Declarations
  gmcValid: z.boolean().refine((val) => val === true, "You must confirm valid GMC registration"),
  noInvestigations: z.boolean().refine((val) => val === true, "You must confirm no fitness to practise issues"),
  codeOfConduct: z.boolean().refine((val) => val === true, "You must agree to the code of conduct"),
  qualityReview: z.boolean().refine((val) => val === true, "You must consent to quality reviews"),
  gdprCompliance: z.boolean().refine((val) => val === true, "You must agree to GDPR policies"),

  // Platform Usage & Payment Details
  paymentMethod: z.string().min(1, "Payment method is required"),
  taxInfo: z.string().optional(),
  cpdWillingness: z.string().min(1, "CPD willingness is required"),
  developmentAreas: z.string().optional(),

  // Additional Information
  publicProfile: z.string().min(1, "Public profile preference is required"),
  specialtyMatching: z.string().min(1, "Specialty matching preference is required"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { title: "Personal Information", fields: ["fullName", "preferredName", "dateOfBirth", "email", "phone", "address"] },
  { title: "Professional Credentials", fields: ["gmcNumber", "currentEmployer", "currentRole", "specialty", "subspecialty", "clinicalExperience", "nhsExperience", "qualifications", "teachingRoles", "mentorshipExperience"] },
  { title: "Mentor Expertise", fields: ["mentorshipAreas", "languages", "availability", "preferredFormat"] },
  { title: "Experience & Philosophy", fields: ["mentorshipApproach", "successStories", "challengingScenarios"] },
  { title: "Compliance & Declarations", fields: ["gmcValid", "noInvestigations", "codeOfConduct", "qualityReview", "gdprCompliance"] },
  { title: "Platform & Payment", fields: ["paymentMethod", "taxInfo", "cpdWillingness", "developmentAreas"] },
  { title: "Additional Information", fields: ["publicProfile", "specialtyMatching", "additionalNotes"] },
  { title: "Document Upload", fields: [] }
];

const mentorshipAreaOptions = [
  "PLAB Preparation",
  "NHS Job Interview Coaching",
  "CV/Portfolio Review",
  "Postgraduate Exam Support (MRCP, MRCS, MRCOG, MRCPCH, etc.)",
  "Specialty-Specific Clinical Mentorship",
  "Leadership and Career Progression"
];

interface MentorOnboardingFormProps {
  onClose: () => void;
}

export const MentorOnboardingForm: React.FC<MentorOnboardingFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMentorshipAreas, setSelectedMentorshipAreas] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentorshipAreas: [],
      gmcValid: false,
      noInvestigations: false,
      codeOfConduct: false,
      qualityReview: false,
      gdprCompliance: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Mentor onboarding data:", data);
    // Here you would typically send the data to your backend
    alert("Application submitted successfully! We'll review and get back to you within 2-3 business days.");
    onClose();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleMentorshipAreaChange = (area: string, checked: boolean) => {
    const newAreas = checked
      ? [...selectedMentorshipAreas, area]
      : selectedMentorshipAreas.filter(a => a !== area);
    setSelectedMentorshipAreas(newAreas);
    form.setValue("mentorshipAreas", newAreas);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Mentor Onboarding Questionnaire</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </CardDescription>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => { f })} className="space-y-6">

              {/* Step 1: Personal Information */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name (as per GMC registration) *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Name / Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr./Prof./Mr./Ms." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
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
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
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
                        <FormLabel>Contact Phone Number *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residential Address (optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Professional Credentials */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gmcNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GMC Number *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentEmployer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current NHS Trust/Employer *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Role / Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Consultant, SAS, Clinical Lecturer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subspecialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subspecialty</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clinicalExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Clinical Experience (Total) *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nhsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of NHS Experience *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postgraduate Qualifications *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="MRCP, MRCS, FRCS, PhD, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teachingRoles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teaching or Supervisory Roles</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Clinical Supervisor, Educational Supervisor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mentorshipExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Mentorship or Coaching Experience</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Mentor Expertise & Availability */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mentorshipAreas"
                    render={() => (
                      <FormItem>
                        <FormLabel>Areas of Mentorship (select all that apply) *</FormLabel>
                        <div className="space-y-2">
                          {mentorshipAreaOptions.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                id={area}
                                checked={selectedMentorshipAreas.includes(area)}
                                onCheckedChange={(checked) => handleMentorshipAreaChange(area, checked as boolean)}
                              />
                              <label htmlFor={area} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {area}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages Spoken *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typical Availability *</FormLabel>
                        <FormControl>
                          <Input placeholder="days/times per week" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Mentorship Format *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video Call (Zoom, Teams, etc.)</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="email">Email/Chat</SelectItem>
                              <SelectItem value="inperson">In-person (if applicable)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Mentorship Experience & Philosophy */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mentorshipApproach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your approach to mentoring and coaching *</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="successStories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Success stories or outcomes from mentorship (brief)</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="challengingScenarios"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How do you handle difficult mentees or challenging scenarios? *</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Compliance & Declarations */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gmcValid"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I confirm I hold a full, valid GMC registration without restrictions *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noInvestigations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I confirm I have no current or past fitness to practice investigations or sanctions *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="codeOfConduct"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I agree to comply with NextDoc UK's mentor code of conduct and confidentiality policies *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualityReview"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I consent to periodic quality review and feedback collection from mentees *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gdprCompliance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I agree to adhere to GDPR and data protection policies in all mentor interactions *
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 6: Platform Usage & Payment Details */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Payment Method *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="wise">Wise</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Identification Number or relevant tax info</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpdWillingness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Willingness to participate in CPD accreditation activities or content creation *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="cpd-yes" />
                              <label htmlFor="cpd-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="cpd-no" />
                              <label htmlFor="cpd-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="developmentAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of interest for future development</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., interview workshops, webinars, online courses" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 7: Additional Information */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="publicProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you open to public profiles/testimonials being displayed? *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="profile-yes" />
                              <label htmlFor="profile-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="profile-no" />
                              <label htmlFor="profile-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialtyMatching"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you want to be matched exclusively with certain specialties or exams? *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="matching-yes" />
                              <label htmlFor="matching-yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="matching-no" />
                              <label htmlFor="matching-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any other notes or relevant info you wish to share?</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 8: Document Upload */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Document Upload</h3>
                    <p className="text-muted-foreground">Please prepare the following documents for upload:</p>

                    <div className="grid gap-4 text-left">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Required Documents:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>GMC Registration Certificate (scan or screenshot)</li>
                          <li>Proof of Specialty Qualifications (if available)</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Optional Documents:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Updated CV or Professional Bio</li>
                          <li>Proof of Professional Indemnity Insurance</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG or JPEG (MAX. 10MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={currentStep === 0 ? onClose : prevStep}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {currentStep === 0 ? "Cancel" : "Previous"}
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex items-center gap-2">
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};