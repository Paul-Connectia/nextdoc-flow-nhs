export interface CVIntakePayload {
  pathway: string;
  templateId: string;
  template: string; // backward compatibility
  data: {
    personal: {
      fullName: string;
      email: string;
      phone: string;
      gmcNumber?: string;
    };
    experience: Array<{
      role: string;
      organisation: string;
      start: string;
      end: string;
      duties: string[];
    }>;
    education: Array<{
      degree: string;
      institute: string;
      year: string;
    }>;
    certs: Array<{
      name: string;
      issuer: string;
      month: number;
      year: number;
      expires?: string;
    }>;
    publications: Array<{
      title: string;
      url?: string;
      doi?: string;
    }>;
    referees: Array<{
      name: string;
      role: string;
      email: string;
      phone?: string;
      org?: string;
    }>;
  };
  customSections: Array<{
    title: string;
    bullets: string[];
    tags: string[];
  }>;
  keywords: string[];
  targetRole: string;
  region: string;
}

export function serializeCVData(
  pathwayId: string,
  templateId: string,
  formData: any,
  keywords: string[]
): CVIntakePayload {
  const payload: CVIntakePayload = {
    pathway: pathwayId,
    templateId: templateId,
    template: templateId,
    data: {
      personal: {
        fullName: formData.personalInfo?.fullName || "",
        email: formData.personalInfo?.email || "",
        phone: formData.personalInfo?.phone || "",
        gmcNumber: formData.personalInfo?.gmcNumber || ""
      },
      experience: formData.experience?.previousRoles || [],
      education: formData.education?.qualifications || [],
      certs: [],
      publications: [],
      referees: []
    },
    customSections: [],
    keywords: keywords,
    targetRole: formData.experience?.currentRole || "",
    region: formData.experience?.region || ""
  };

  // Map conditional fields to customSections
  if (pathwayId === "plab-img" && formData.conditionalFields?.inductionOrientation) {
    payload.customSections.push({
      title: "Induction & Orientation",
      bullets: splitIntoBullets(formData.conditionalFields.inductionOrientation),
      tags: ["projects"]
    });
  }

  if (pathwayId === "plab-img" && formData.conditionalFields?.nhsTransitionActivities) {
    payload.customSections.push({
      title: "NHS Transition Activities",
      bullets: splitIntoBullets(formData.conditionalFields.nhsTransitionActivities),
      tags: ["projects"]
    });
  }

  if (pathwayId === "return" && formData.conditionalFields?.recencyPlan) {
    payload.customSections.push({
      title: "Recency & Readiness Plan",
      bullets: splitIntoBullets(formData.conditionalFields.recencyPlan),
      tags: ["projects"]
    });
  }

  if (templateId === "arcp-portfolio" && formData.conditionalFields) {
    const wbaBullets = [];
    if (formData.conditionalFields.miniCEXCompleted) {
      wbaBullets.push(`Mini-CEX completed: ${formData.conditionalFields.miniCEXCompleted}`);
    }
    if (formData.conditionalFields.cbdCompleted) {
      wbaBullets.push(`CBD completed: ${formData.conditionalFields.cbdCompleted}`);
    }
    if (formData.conditionalFields.dopsCompleted) {
      wbaBullets.push(`DOPS completed: ${formData.conditionalFields.dopsCompleted}`);
    }
    if (formData.conditionalFields.latestARCPOutcome) {
      wbaBullets.push(`Latest ARCP outcome: ${formData.conditionalFields.latestARCPOutcome}`);
    }
    if (wbaBullets.length > 0) {
      payload.customSections.push({
        title: "Workplace-Based Assessments",
        bullets: wbaBullets,
        tags: ["audit"]
      });
    }
  }

  if (pathwayId === "consultant" && formData.conditionalFields?.leadershipRoles?.length > 0) {
    payload.customSections.push({
      title: "Leadership & Management",
      bullets: formData.conditionalFields.leadershipRoles.map((role: any) =>
        `${role.role} at ${role.committee} (${role.from} - ${role.to}): ${role.impact}`
      ),
      tags: ["leadership"]
    });
  }

  if (pathwayId === "consultant" && formData.conditionalFields?.researchGrants?.length > 0) {
    payload.customSections.push({
      title: "Research & Grants",
      bullets: formData.conditionalFields.researchGrants.map((grant: any) =>
        `${grant.title} - ${grant.funder} (£${grant.value}, ${grant.year}) - Role: ${grant.role}`
      ),
      tags: ["research"]
    });
  }

  if (pathwayId === "postgrad-exam" && formData.conditionalFields?.examLinkedExposure) {
    payload.customSections.push({
      title: "Exam-Linked Clinical Exposure",
      bullets: splitIntoBullets(formData.conditionalFields.examLinkedExposure),
      tags: ["projects"]
    });
  }

  if (pathwayId === "sas-ahp" && formData.conditionalFields?.governanceEvidence) {
    payload.customSections.push({
      title: "Governance & Revalidation Evidence",
      bullets: splitIntoBullets(formData.conditionalFields.governanceEvidence),
      tags: ["audit"]
    });
  }

  return payload;
}

function splitIntoBullets(text: string, maxWords: number = 18): string[] {
  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const words = line.trim().split(' ');
      if (words.length <= maxWords) return line.trim();
      return words.slice(0, maxWords).join(' ') + '...';
    });
}
