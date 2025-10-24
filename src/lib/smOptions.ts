export type ExamStage = { code: string; label: string };

export type ExamFamily = {
  family: string;  // Display grouping
  code: string;    // Stable identifier
  label: string;   // UI label
  stages: ExamStage[];
};

export const EXAM_FAMILIES: ExamFamily[] = [
  // Core entry & language
  { 
    family: "UKMLA", 
    code: "ukmla", 
    label: "UKMLA",
    stages: [
      { code: "akt", label: "Applied Knowledge Test (AKT)" },
      { code: "cpsa", label: "Clinical & Professional Skills Assessment (CPSA)" }
    ] 
  },
  { 
    family: "PLAB", 
    code: "plab", 
    label: "PLAB",
    stages: [
      { code: "p1", label: "Part 1" }, 
      { code: "p2", label: "OSCE (Part 2)" }
    ] 
  },
  { 
    family: "English (GMC)", 
    code: "english", 
    label: "English Language",
    stages: [
      { code: "ielts", label: "IELTS" }, 
      { code: "oet", label: "OET" }
    ] 
  },

  // Physicians (RCP)
  { 
    family: "MRCP(UK)", 
    code: "mrcpuk", 
    label: "MRCP(UK)",
    stages: [
      { code: "part1", label: "Part 1" }, 
      { code: "part2w", label: "Part 2 (Written)" }, 
      { code: "paces", label: "PACES" }
    ] 
  },
  { 
    family: "SCEs", 
    code: "sce", 
    label: "Specialty Certificate Examinations",
    stages: [
      { code: "acute_med", label: "Acute Medicine" },
      { code: "cardiology", label: "Cardiology" },
      { code: "cpt", label: "Clinical Pharmacology & Therapeutics" },
      { code: "derm", label: "Dermatology" },
      { code: "endodiab", label: "Endocrinology & Diabetes" },
      { code: "gastro", label: "Gastroenterology (ESEGH)" },
      { code: "geri", label: "Geriatric Medicine" },
      { code: "id", label: "Infectious Diseases" },
      { code: "med_onc", label: "Medical Oncology" },
      { code: "neph", label: "Nephrology (ESENeph)" },
      { code: "neuro", label: "Neurology" },
      { code: "pall", label: "Palliative Medicine" },
      { code: "resp", label: "Respiratory Medicine" },
      { code: "rheum", label: "Rheumatology" }
    ] 
  },

  // Surgery
  { 
    family: "MRCS", 
    code: "mrcs", 
    label: "MRCS",
    stages: [
      { code: "a", label: "Part A" }, 
      { code: "b_osce", label: "Part B (OSCE)" }
    ] 
  },
  { 
    family: "FRCS", 
    code: "frcs", 
    label: "FRCS (Higher Surgical Fellowship)",
    stages: [
      { code: "gen", label: "General Surgery" },
      { code: "t&o", label: "Trauma & Orthopaedics" },
      { code: "ent", label: "ORL-HNS (ENT)" },
      { code: "plastics", label: "Plastic Surgery" },
      { code: "uro", label: "Urology" },
      { code: "neuro", label: "Neurosurgery" },
      { code: "paed_surg", label: "Paediatric Surgery" },
      { code: "cardiothoracic", label: "Cardiothoracic" },
      { code: "vascular", label: "Vascular" },
      { code: "omfs", label: "Oral & Maxillofacial" }
    ] 
  },
  { 
    family: "DOHNS", 
    code: "dohns", 
    label: "DOHNS",
    stages: [
      { code: "exam", label: "Diploma" }
    ] 
  },

  // Anaesthetics / ICM / Pain
  { 
    family: "FRCA", 
    code: "frca", 
    label: "FRCA",
    stages: [
      { code: "primary", label: "Primary" }, 
      { code: "final", label: "Final" }
    ] 
  },
  { 
    family: "FFPMRCA", 
    code: "ffpmrca", 
    label: "FFPMRCA",
    stages: [
      { code: "primary", label: "Primary" }, 
      { code: "final", label: "Final" }
    ] 
  },
  { 
    family: "FFICM", 
    code: "fficm", 
    label: "FFICM",
    stages: [
      { code: "primary", label: "Primary" }, 
      { code: "final_osce_soe", label: "Final OSCE/SOE" }
    ] 
  },

  // Radiology / Oncology
  { 
    family: "FRCR – Clinical Radiology", 
    code: "frcr_cr", 
    label: "FRCR – Clinical Radiology",
    stages: [
      { code: "first", label: "First FRCR (Physics & Anatomy)" },
      { code: "final_a", label: "Final Part A" }, 
      { code: "final_b", label: "Final Part B" }
    ] 
  },
  { 
    family: "FRCR – Clinical Oncology", 
    code: "frcr_onc", 
    label: "FRCR – Clinical Oncology",
    stages: [
      { code: "p1", label: "Part 1" }, 
      { code: "p2a", label: "Part 2A" }, 
      { code: "p2b", label: "Part 2B" }
    ] 
  },

  // Pathology
  { 
    family: "FRCPath", 
    code: "frcpath", 
    label: "FRCPath",
    stages: [
      { code: "histopath_p1", label: "Histopathology Part 1" },
      { code: "histopath_p2", label: "Histopathology Part 2" },
      { code: "haem_p1", label: "Haematology Part 1" },
      { code: "haem_p2", label: "Haematology Part 2" },
      { code: "micro_p1", label: "Medical Microbiology Part 1" },
      { code: "micro_p2", label: "Medical Microbiology Part 2" },
      { code: "virol_p1", label: "Virology Part 1" },
      { code: "virol_p2", label: "Virology Part 2" },
      { code: "chem_p1", label: "Chemical Path/Clinical Biochem Part 1" },
      { code: "chem_p2", label: "Chemical Path/Clinical Biochem Part 2" },
      { code: "immun_p1", label: "Immunology Part 1" },
      { code: "immun_p2", label: "Immunology Part 2" },
      { code: "forensic_p1", label: "Forensic Pathology Part 1" },
      { code: "forensic_p2", label: "Forensic Pathology Part 2" }
    ] 
  },

  // Ophthalmology
  { 
    family: "FRCOphth", 
    code: "frcophth", 
    label: "FRCOphth",
    stages: [
      { code: "p1", label: "Part 1" },
      { code: "p2_written", label: "Part 2 (Written)" },
      { code: "p2_osce", label: "Part 2 (OSCE)" },
      { code: "final_clin", label: "Final Clinical" }
    ] 
  },

  // Psychiatry
  { 
    family: "MRCPsych", 
    code: "mrcpsych", 
    label: "MRCPsych",
    stages: [
      { code: "paper_a", label: "Paper A" }, 
      { code: "paper_b", label: "Paper B" }, 
      { code: "casc", label: "CASC" }
    ] 
  },

  // Paediatrics
  { 
    family: "MRCPCH", 
    code: "mrcpch", 
    label: "MRCPCH",
    stages: [
      { code: "fop", label: "FOP" }, 
      { code: "tas", label: "Theory & Science (TAS)" },
      { code: "akp", label: "AKP" }, 
      { code: "clinical", label: "Clinical" }
    ] 
  },

  // O&G
  { 
    family: "MRCOG", 
    code: "mrcog", 
    label: "MRCOG",
    stages: [
      { code: "p1", label: "Part 1" }, 
      { code: "p2", label: "Part 2" }, 
      { code: "p3_osce", label: "Part 3 (OSCE)" }
    ] 
  },
  { 
    family: "DRCOG", 
    code: "drcog", 
    label: "DRCOG",
    stages: [
      { code: "exam", label: "Diploma" }
    ] 
  },

  // General Practice
  { 
    family: "MRCGP", 
    code: "mrcgp", 
    label: "MRCGP",
    stages: [
      { code: "akt", label: "AKT" }, 
      { code: "sca", label: "SCA" }
    ] 
  },

  // Emergency Medicine
  { 
    family: "MRCEM", 
    code: "mrcem", 
    label: "MRCEM",
    stages: [
      { code: "primary_sba", label: "Primary SBA" }, 
      { code: "intermediate_saq", label: "Intermediate SAQ" }, 
      { code: "osce", label: "OSCE" }
    ] 
  },
  { 
    family: "FRCEM", 
    code: "frcem", 
    label: "FRCEM",
    stages: [
      { code: "intermediate_sba", label: "Intermediate SBA" }, 
      { code: "final_saq", label: "Final SAQ" }, 
      { code: "final_osce_mgmt", label: "Final OSCE/Management" }
    ] 
  },

  // Faculties & specialty colleges
  { 
    family: "Public Health", 
    code: "mfph", 
    label: "MFPH/DFPH",
    stages: [
      { code: "mfph_a", label: "MFPH Part A" }, 
      { code: "mfph_b", label: "MFPH Part B" }, 
      { code: "dfph", label: "DFPH" }
    ] 
  },
  { 
    family: "Occupational Medicine", 
    code: "mfom", 
    label: "MFOM/FFOM",
    stages: [
      { code: "mfom", label: "MFOM" }, 
      { code: "ffom", label: "FFOM" }
    ] 
  },
  { 
    family: "Sexual & Reproductive Health", 
    code: "mfsrh", 
    label: "MFSRH/DFSRH",
    stages: [
      { code: "mfsrh", label: "MFSRH" }, 
      { code: "dfsrh", label: "DFSRH" }
    ] 
  },
  { 
    family: "Sport & Exercise Medicine", 
    code: "mfsem", 
    label: "MFSEM/FFSEM",
    stages: [
      { code: "mfsem", label: "MFSEM" }, 
      { code: "ffsem", label: "FFSEM" }
    ] 
  },
  { 
    family: "Travel Medicine", 
    code: "mftm", 
    label: "MFTM/FFTM",
    stages: [
      { code: "mftm", label: "MFTM" }, 
      { code: "fftm", label: "FFTM" }
    ] 
  },
  { 
    family: "Pharmaceutical Medicine", 
    code: "mfpm", 
    label: "MFPM/FFPM",
    stages: [
      { code: "mfpm", label: "MFPM" }, 
      { code: "ffpm", label: "FFPM" }
    ] 
  }
];
