import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const BadgeFrameworkSection = () => {
  const badgeCriteria = [
    {
      level: "Associate Mentor",
      badge: "🩵",
      badgeClass: "border-2 border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300",
      title: "Early-Career NHS Professional",
      criteria: [
        "NHS doctor or PLAB-qualified IMG with at least one year of UK clinical experience",
        "Verified medical registration and current NHS employment",
        "Demonstrates commitment to guiding early-career colleagues and fostering professional development",
        "Focuses on peer support, exam preparation, and adaptation to NHS practice"
      ],
      color: "Blue Outline"
    },
    {
      level: "Senior Mentor",
      badge: "💙",
      badgeClass: "bg-teal-600 text-white border-0",
      title: "Experienced NHS Clinician",
      criteria: [
        "Minimum three years of NHS experience (Registrar or Specialty Doctor level and above)",
        "Proven contribution to professional training, supervision, or mentorship",
        "Consistently positive feedback from mentees or colleagues",
        "Recognised for collaboration, professionalism, and support of international and UK graduates"
      ],
      color: "Teal"
    },
    {
      level: "Principal Mentor",
      badge: "🟡",
      badgeClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-md",
      title: "Consultant-Level or Senior Clinical Leader",
      criteria: [
        "Typically eight or more years of NHS experience at Consultant, Clinical Director, or equivalent senior role",
        "Provides strategic guidance in clinical career progression, leadership, and wellbeing",
        "Actively promotes inclusion, reflective practice, and career excellence",
        "Serves as a role model and advocate for professional growth within the healthcare system"
      ],
      color: "Gold"
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        NextDoc Global recognizes mentors through a transparent badge system that reflects NHS experience, 
        teaching involvement, and contributions to supporting colleagues. Each badge helps mentees identify 
        the right level of guidance for their professional journey.
      </p>

      <div className="space-y-4">
        {badgeCriteria.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Badge Visual */}
                <div className="flex-shrink-0">
                  <Badge className={`${item.badgeClass} text-xs px-3 py-1.5 font-semibold`}>
                    <span className="mr-1">{item.badge}</span>
                    {item.level}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1 text-center">{item.color}</p>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <ul className="space-y-1.5">
                    {item.criteria.map((criterion, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground">
        <p>
          <strong>Badge Governance:</strong> Mentor badges recognise NHS experience, verified credentials, 
          and contributions to supporting colleagues. Each badge reflects professional growth — not hierarchy.
        </p>
      </div>
    </div>
  );
};
