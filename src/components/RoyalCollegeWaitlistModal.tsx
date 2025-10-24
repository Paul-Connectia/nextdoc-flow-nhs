import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";
import { ROYAL_COLLEGE_EXAMS } from "@/data/royalCollegeExams";
import { Link } from "react-router-dom";

interface RoyalCollegeWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExam?: string;
}

export const RoyalCollegeWaitlistModal = ({ isOpen, onClose, preselectedExam }: RoyalCollegeWaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      analytics.track('rc_waitlist_opened', { exam_id: preselectedExam });
      
      // Preselect exam if provided
      if (preselectedExam && !selectedExams.includes(preselectedExam)) {
        setSelectedExams([preselectedExam]);
      }
    }
  }, [isOpen, preselectedExam]);

  const handleExamToggle = (examId: string) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return isValidEmail(email) && selectedExams.length > 0 && consent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      email,
      exams: selectedExams,
      timeframe,
      role,
      country,
      utm: {
        source: window.location.pathname,
        medium: 'web',
        campaign: 'rc_hub'
      }
    };

    analytics.track('rc_waitlist_submitted', { 
      exams: selectedExams, 
      timeframe 
    });

    // Placeholder - Backend integration pending
    console.log('Waitlist submission (backend pending):', payload);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);
    analytics.track('rc_waitlist_success');
  };

  const handleClose = () => {
    setEmail("");
    setSelectedExams([]);
    setTimeframe("");
    setRole("");
    setCountry("");
    setConsent(false);
    setShowSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Join the Waitlist</DialogTitle>
              <DialogDescription>
                Get early access and launch updates for Royal College exam programmes.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Exam Selection */}
              <div className="space-y-2">
                <Label>Select Exams of Interest *</Label>
                <ScrollArea className="h-[200px] border rounded-md p-4">
                  <div className="space-y-3">
                    {ROYAL_COLLEGE_EXAMS.map((exam) => (
                      <div key={exam.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={exam.id}
                          checked={selectedExams.includes(exam.id)}
                          onCheckedChange={() => handleExamToggle(exam.id)}
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor={exam.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {exam.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-xs text-muted-foreground">
                  {selectedExams.length} exam{selectedExams.length !== 1 ? 's' : ''} selected
                </p>
              </div>

              {/* Timeframe */}
              <div className="space-y-2">
                <Label htmlFor="timeframe">When do you plan to take this exam?</Label>
                <Select value={timeframe} onValueChange={setTimeframe} disabled={isSubmitting}>
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0-3 months</SelectItem>
                    <SelectItem value="3-6">3-6 months</SelectItem>
                    <SelectItem value="6-12">6-12 months</SelectItem>
                    <SelectItem value="12+">12+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role/Grade */}
              <div className="space-y-2">
                <Label htmlFor="role">Current Role/Grade (optional)</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="e.g., CT1-2, ST3+"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country/Region (optional)</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="e.g., UK, India, Pakistan"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  disabled={isSubmitting}
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I agree to receive updates about NextDoc programmes *
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll email you when this programme opens.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/gapmap" className="flex-1" onClick={handleClose}>
                <Button variant="secondary" className="w-full">
                  Explore GapMap™
                </Button>
              </Link>
              <Link to="/mentors" className="flex-1" onClick={handleClose}>
                <Button variant="secondary" className="w-full">
                  Meet Mentors
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
