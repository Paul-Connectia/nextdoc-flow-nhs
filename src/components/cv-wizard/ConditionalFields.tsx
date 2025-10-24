import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, AlertCircle } from "lucide-react";

interface ConditionalFieldsProps {
  pathwayId: string;
  templateId: string;
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
}

export const PLABIMGFields = ({ formData, updateFormData }: any) => {
  const toggleExposure = (type: string) => {
    const current = formData.conditionalFields?.firstUKExposure || [];
    const exists = current.find((item: any) => item.type === type);
    
    if (exists) {
      updateFormData("conditionalFields", "firstUKExposure", 
        current.filter((item: any) => item.type !== type)
      );
    } else {
      updateFormData("conditionalFields", "firstUKExposure", 
        [...current, { type, date: "" }]
      );
    }
  };

  const toggleSystem = (system: string) => {
    const current = formData.conditionalFields?.systemsFamiliarity || [];
    if (current.includes(system)) {
      updateFormData("conditionalFields", "systemsFamiliarity", 
        current.filter((s: string) => s !== system)
      );
    } else {
      updateFormData("conditionalFields", "systemsFamiliarity", [...current, system]);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h4 className="font-semibold text-blue-900 dark:text-blue-100">PLAB/IMG Specific Information</h4>
      
      <div>
        <Label>First UK Exposure</Label>
        <p className="text-xs text-muted-foreground mb-2">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {["Observership", "Clinical attachment", "Locum", "Shadowing", "TNA/Induction"].map((type) => {
            const isSelected = (formData.conditionalFields?.firstUKExposure || []).find((item: any) => item.type === type);
            return (
              <Badge
                key={type}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleExposure(type)}
              >
                {type}
              </Badge>
            );
          })}
        </div>
      </div>
      
      <div>
        <Label>NHS Systems Familiarity</Label>
        <p className="text-xs text-muted-foreground mb-2">Select systems you're familiar with</p>
        <div className="flex flex-wrap gap-2">
          {["SBAR", "NEWS2", "EPMA", "eRS", "ICE/OrderComms", "e-Obs"].map((system) => {
            const isSelected = (formData.conditionalFields?.systemsFamiliarity || []).includes(system);
            return (
              <Badge
                key={system}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSystem(system)}
              >
                {system}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const PLABIMGAdditionalFields = ({ formData, updateFormData }: any) => (
  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
    <Label>Induction & Orientation</Label>
    <p className="text-xs text-muted-foreground mb-2">Trust induction, shadowing, supervised start</p>
    <Textarea
      value={formData.conditionalFields?.inductionOrientation || ""}
      onChange={(e) => updateFormData("conditionalFields", "inductionOrientation", e.target.value)}
      placeholder="e.g., Completed 2-day trust induction, shadowed consultant for 3 shifts..."
      rows={3}
    />
  </div>
);

export const PLABIMGSpecialistFields = ({ formData, updateFormData }: any) => (
  <div className="space-y-4 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">PLAB/IMG Specialist Information</h4>
    
    <div>
      <Label>Country of Prior Practice</Label>
      <Select 
        value={formData.conditionalFields?.countryOfPriorPractice || ""} 
        onValueChange={(value) => updateFormData("conditionalFields", "countryOfPriorPractice", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="india">India</SelectItem>
          <SelectItem value="pakistan">Pakistan</SelectItem>
          <SelectItem value="nigeria">Nigeria</SelectItem>
          <SelectItem value="egypt">Egypt</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Scope of Duties</Label>
      <p className="text-xs text-muted-foreground mb-2">Select all that apply</p>
      <div className="flex flex-wrap gap-2">
        {["Ward cover", "On-calls", "Clinics", "Theatre assist", "Procedures"].map((duty) => {
          const isSelected = (formData.conditionalFields?.scopeOfDuties || []).includes(duty);
          return (
            <Badge
              key={duty}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const current = formData.conditionalFields?.scopeOfDuties || [];
                if (current.includes(duty)) {
                  updateFormData("conditionalFields", "scopeOfDuties", current.filter((d: string) => d !== duty));
                } else {
                  updateFormData("conditionalFields", "scopeOfDuties", [...current, duty]);
                }
              }}
            >
              {duty}
            </Badge>
          );
        })}
      </div>
    </div>

    <div>
      <Label>NHS Transition Activities</Label>
      <Textarea
        value={formData.conditionalFields?.nhsTransitionActivities || ""}
        onChange={(e) => updateFormData("conditionalFields", "nhsTransitionActivities", e.target.value)}
        placeholder="e.g., SAS shadowing, supervised lists/clinics..."
        rows={3}
      />
    </div>
  </div>
);

export const ARCPFields = ({ formData, updateFormData }: any) => (
  <div className="space-y-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
    <h4 className="font-semibold text-green-900 dark:text-green-100">ARCP Portfolio Information</h4>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Training Programme</Label>
        <Input
          value={formData.conditionalFields?.trainingProgramme || ""}
          onChange={(e) => updateFormData("conditionalFields", "trainingProgramme", e.target.value)}
          placeholder="e.g., Internal Medicine ST3"
        />
      </div>
      <div>
        <Label>Deanery/School</Label>
        <Input
          value={formData.conditionalFields?.deanery || ""}
          onChange={(e) => updateFormData("conditionalFields", "deanery", e.target.value)}
          placeholder="e.g., Health Education England North West"
        />
      </div>
    </div>
  </div>
);

export const ARCPWBAFields = ({ formData, updateFormData }: any) => {
  const hasNoWBAs = 
    (!formData.conditionalFields?.miniCEXCompleted || formData.conditionalFields.miniCEXCompleted === 0) &&
    (!formData.conditionalFields?.cbdCompleted || formData.conditionalFields.cbdCompleted === 0) &&
    (!formData.conditionalFields?.dopsCompleted || formData.conditionalFields.dopsCompleted === 0);

  return (
    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
      <Label className="font-semibold text-green-900 dark:text-green-100">WBAs & ARCP Evidence</Label>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div>
          <Label className="text-sm">Mini-CEX</Label>
          <Input
            type="number"
            min="0"
            value={formData.conditionalFields?.miniCEXCompleted || 0}
            onChange={(e) => updateFormData("conditionalFields", "miniCEXCompleted", parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label className="text-sm">CBD</Label>
          <Input
            type="number"
            min="0"
            value={formData.conditionalFields?.cbdCompleted || 0}
            onChange={(e) => updateFormData("conditionalFields", "cbdCompleted", parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label className="text-sm">DOPS</Label>
          <Input
            type="number"
            min="0"
            value={formData.conditionalFields?.dopsCompleted || 0}
            onChange={(e) => updateFormData("conditionalFields", "dopsCompleted", parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
      
      <div className="mt-3 grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Latest ARCP Outcome</Label>
          <Input
            value={formData.conditionalFields?.latestARCPOutcome || ""}
            onChange={(e) => updateFormData("conditionalFields", "latestARCPOutcome", e.target.value)}
            placeholder="e.g., Outcome 1"
          />
        </div>
        <div>
          <Label className="text-sm">ePortfolio URL</Label>
          <Input
            type="url"
            value={formData.conditionalFields?.ePortfolioURL || ""}
            onChange={(e) => updateFormData("conditionalFields", "ePortfolioURL", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      {hasNoWBAs && (
        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-3 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Add at least one WBA entry for ARCP readiness
        </p>
      )}
    </div>
  );
};

export const UKGradFields = ({ formData, updateFormData }: any) => (
  <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
    <h4 className="font-semibold text-purple-900 dark:text-purple-100">UK Graduate Information</h4>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label>Formal Teaching Delivered</Label>
        <Input
          type="number"
          min="0"
          value={formData.conditionalFields?.formalTeachingDelivered || 0}
          onChange={(e) => updateFormData("conditionalFields", "formalTeachingDelivered", parseInt(e.target.value) || 0)}
          placeholder="Number of sessions"
        />
      </div>
      <div>
        <Label>Formal Teaching Attended</Label>
        <Input
          type="number"
          min="0"
          value={formData.conditionalFields?.formalTeachingAttended || 0}
          onChange={(e) => updateFormData("conditionalFields", "formalTeachingAttended", parseInt(e.target.value) || 0)}
          placeholder="Number of sessions"
        />
      </div>
    </div>
  </div>
);

export const PostgradExamFields = ({ formData, updateFormData }: any) => (
  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
    <Label>Exam-Linked Clinical Exposure</Label>
    <p className="text-xs text-muted-foreground mb-2">Highlight clinics/blocks aligned to exam syllabus</p>
    <Textarea
      value={formData.conditionalFields?.examLinkedExposure || ""}
      onChange={(e) => updateFormData("conditionalFields", "examLinkedExposure", e.target.value)}
      placeholder="e.g., Attended cardiology clinic focusing on PACES stations..."
      rows={3}
    />
  </div>
);

export const SASAHPFields = ({ formData, updateFormData }: any) => (
  <div className="space-y-4 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-800">
    <h4 className="font-semibold text-teal-900 dark:text-teal-100">SAS/AHP Professional Information</h4>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={formData.conditionalFields?.independentPractice || false}
          onCheckedChange={(checked) => updateFormData("conditionalFields", "independentPractice", checked)}
        />
        <Label>Independent Practice</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={formData.conditionalFields?.supervisedPractice || false}
          onCheckedChange={(checked) => updateFormData("conditionalFields", "supervisedPractice", checked)}
        />
        <Label>Supervised Practice</Label>
      </div>
    </div>

    <div>
      <Label>Governance & Revalidation Evidence</Label>
      <Textarea
        value={formData.conditionalFields?.governanceEvidence || ""}
        onChange={(e) => updateFormData("conditionalFields", "governanceEvidence", e.target.value)}
        placeholder="Appraisals, audits, SOPs, workplace assessments..."
        rows={3}
      />
    </div>
  </div>
);

export const ConsultantFields = ({ formData, updateFormData }: any) => (
  <div className="space-y-4 p-4 bg-rose-50 dark:bg-rose-950/20 rounded-lg border border-rose-200 dark:border-rose-800">
    <h4 className="font-semibold text-rose-900 dark:text-rose-100">Consultant/Academic/Clinical Fellow Information</h4>
    
    <div>
      <Label>Leadership & Management Roles</Label>
      <p className="text-xs text-muted-foreground mb-2">Committee memberships, team lead roles</p>
      <Textarea
        value={formData.conditionalFields?.leadershipRolesText || ""}
        onChange={(e) => updateFormData("conditionalFields", "leadershipRolesText", e.target.value)}
        placeholder="e.g., Clinical Lead for Cardiology (2020-2023) - Led service redesign..."
        rows={3}
      />
    </div>
  </div>
);

export const ReturnToPracticeFields = ({ formData, updateFormData }: any) => {
  const gapMonths = formData.conditionalFields?.timeOutStart && formData.conditionalFields?.timeOutEnd
    ? Math.round((new Date(formData.conditionalFields.timeOutEnd).getTime() - new Date(formData.conditionalFields.timeOutStart).getTime()) / (1000 * 60 * 60 * 24 * 30))
    : 0;

  return (
    <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
      <h4 className="font-semibold text-amber-900 dark:text-amber-100">Return to Practice Information</h4>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label>Time Out - Start</Label>
          <Input
            type="month"
            value={formData.conditionalFields?.timeOutStart || ""}
            onChange={(e) => updateFormData("conditionalFields", "timeOutStart", e.target.value)}
          />
        </div>
        <div>
          <Label>Time Out - End</Label>
          <Input
            type="month"
            value={formData.conditionalFields?.timeOutEnd || ""}
            onChange={(e) => updateFormData("conditionalFields", "timeOutEnd", e.target.value)}
          />
        </div>
        <div>
          <Label>Reason (Optional)</Label>
          <Input
            value={formData.conditionalFields?.timeOutReason || ""}
            onChange={(e) => updateFormData("conditionalFields", "timeOutReason", e.target.value)}
            placeholder="e.g., Parental leave"
          />
        </div>
      </div>

      {gapMonths >= 6 && (
        <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Gap ≥ 6 months detected. Please add refresher/CPD entries.
        </p>
      )}

      <div>
        <Label>Recency & Readiness Plan</Label>
        <Textarea
          value={formData.conditionalFields?.recencyPlan || ""}
          onChange={(e) => updateFormData("conditionalFields", "recencyPlan", e.target.value)}
          placeholder="Refresher courses, supervised restart plan, induction updates..."
          rows={3}
        />
      </div>
    </div>
  );
};
