import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Calendar, Award, Users, CheckCircle, BarChart3 } from "lucide-react";
import { BadgeFrameworkSection } from "@/components/BadgeFrameworkSection";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

interface MentorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const MentorInfoModal = ({ isOpen, onClose, onApply }: MentorInfoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      analytics.track('mentor_info_modal_opened', { timestamp: new Date().toISOString() });
    }
  }, [isOpen]);

  const handleApplyClick = () => {
    analytics.track('mentor_info_modal_apply_clicked');
    onApply();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground -m-6 p-6 mb-4 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">
            Why Become a Mentor at NextDoc UK
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2">
          <p className="text-base leading-relaxed">
            Mentoring is a rewarding opportunity to share your NHS experience, develop leadership skills, 
            and contribute to the professional growth of the next generation of doctors.
          </p>

          {/* Key Benefits */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <Trophy className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Professional Growth</h4>
                  <p className="text-sm text-muted-foreground">
                    Build leadership and teaching experience that strengthens your clinical and managerial profile.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Empower aspiring doctors to succeed in the NHS by sharing your insights and practical guidance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Flexible Commitment</h4>
                  <p className="text-sm text-muted-foreground">
                    Conduct sessions that fit your schedule – monthly, quarterly, or ad hoc.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Award className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive acknowledgment within the NextDoc Mentor Network and opportunities for collaboration on CPD-accredited teaching and research.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Join a supportive network of NHS mentors committed to shaping a globally competent, compassionate workforce.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <BarChart3 className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Dashboard & Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Access your personalized mentor dashboard with real-time analytics tracking sessions, earnings, referrals, and mentee progress.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Badge Framework Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Understanding Mentor Badges
            </h3>
            <BadgeFrameworkSection />
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p className="text-sm pt-1">Apply through our Mentor Onboarding Form.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p className="text-sm pt-1">Our team reviews your background and aligns your mentoring preferences.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p className="text-sm pt-1">Begin mentoring sessions through the secure NextDoc UK platform.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <p className="text-sm pt-1">Track mentee feedback and earn badge upgrades as you grow your mentoring impact.</p>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-xl font-bold mb-4">Eligibility</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Current or former NHS clinicians (FY2 and above) with valid GMC registration.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Demonstrated interest in mentoring, training, or professional development.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Commitment to ethical, inclusive, and supportive teaching practices.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" className="px-8" onClick={handleApplyClick}>
              Apply to Mentor
            </Button>
            <Button size="lg" variant="outline" className="px-8" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
