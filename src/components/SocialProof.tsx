import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Trophy, CheckCircle } from 'lucide-react';

// Removed testimonials as platform is new - replaced with verified statistics and achievements
const achievements = [
  {
    title: "NextDoc Platform – Fully Functional",
    description: "Integrated career, exam, and mentorship tools now available",
    icon: Trophy,
    status: "Live"
  },
  {
    title: "Mentor Network – Active & Growing",
    description: "Connect with NHS consultants and peers worldwide",
    icon: Users,
    status: "Active"
  },
  {
    title: "Evidence-Based Learning – Verified",
    description: "Every module developed and reviewed by practising NHS doctors",
    icon: CheckCircle,
    status: "Verified"
  }
];

const stats = [
  { number: "Dashboards", label: "Mentor & User", icon: Star },
  { number: "NHS", label: "Aligned Pathways", icon: Trophy },
  { number: "AI + Mentor", label: "Hybrid Model", icon: Users },
  { number: "Global", label: "Access & Standards", icon: CheckCircle }
];

export const SocialProof = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Badge className="mb-3 sm:mb-4 bg-primary text-primary-foreground text-xs sm:text-sm">
            🚀 Now Live
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">Built for NHS Success</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Expert-developed tools and content designed specifically for medical professionals transitioning to the NHS.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-between min-h-[120px] sm:min-h-[140px]">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-primary mb-1 leading-tight whitespace-nowrap">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground text-center min-h-[2.5rem] flex items-center justify-center">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-4 sm:p-6 text-center">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <achievement.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base sm:text-lg mb-2">{achievement.title}</h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Status Badge */}
                <Badge 
                  variant={achievement.status === "Verified" ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {achievement.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60 px-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              <span>NHS Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              <span>ICO Registered</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              <span className="hidden sm:inline">Coming Soon - Reviews</span>
              <span className="sm:hidden">Reviews Coming</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};