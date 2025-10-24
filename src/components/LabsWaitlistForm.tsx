import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { analytics } from "@/lib/analytics";
import { CheckCircle2 } from "lucide-react";

const waitlistSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  role: z.enum(["Author", "Reviewer", "Collaborator"], {
    required_error: "Please select a role",
  }),
  organisation: z.string().trim().max(200).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive updates",
  }),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export const LabsWaitlistForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      consent: false,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      // Track analytics
      analytics.track("waitlist_join", {
        role: data.role,
        organisation: data.organisation || "Not specified",
      });

      // TODO: Add backend integration here when ready
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Waitlist submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
            <h3 className="text-2xl font-bold">Thanks! We'll email you before launch.</h3>
            <p className="text-muted-foreground">
              You're on the early access list for NextDoc Labs. We'll notify you as soon as
              our submission portal opens.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              Submit Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the Early Access List</CardTitle>
        <CardDescription>
          Be first to access the submission portal, reviewer invitations, and calls for papers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Smith" {...field} />
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane.smith@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I'm interested in *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Author">Author (Submit research)</SelectItem>
                      <SelectItem value="Reviewer">Reviewer (Peer review)</SelectItem>
                      <SelectItem value="Collaborator">Collaborator (Research partner)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organisation (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="University or Hospital" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current institution or affiliation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to receive updates about NextDoc Labs *
                    </FormLabel>
                    <FormDescription>
                      Including submission windows, reviewer calls, and publication releases. 
                      You can unsubscribe anytime. See{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Notice
                      </a>
                      .
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join Early Access List"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
