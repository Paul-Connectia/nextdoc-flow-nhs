export interface RoyalCollegeExam {
  id: string;
  title: string;
  group: string;
  microCopy: string;
  sortOrder: number;
}

export const ROYAL_COLLEGE_GROUPS = [
  'Royal College of Anaesthetists',
  'Royal College of Radiologists',
  'Royal College of Pathologists',
  'Royal College of Ophthalmologists',
  'Royal College of Psychiatrists',
  'Royal College of General Practitioners',
  'Royal College of Emergency Medicine',
  'Intercollegiate Surgical',
  'Royal College of Obstetricians & Gynaecologists',
  'Royal College of Physicians - SCEs',
  'UK Faculties'
];

export const ROYAL_COLLEGE_EXAMS: RoyalCollegeExam[] = [
  // Royal College of Anaesthetists (sortOrder: 0)
  {
    id: 'frca',
    title: 'FRCA (Primary, Final)',
    group: 'Royal College of Anaesthetists',
    microCopy: 'Primary & Final prep with anaesthetics consultants.',
    sortOrder: 0
  },
  {
    id: 'fficm',
    title: 'FFICM (Primary, Final OSCE/SOE)',
    group: 'Royal College of Anaesthetists',
    microCopy: 'ICM primary + OSCE/SOE with mock vivas.',
    sortOrder: 0
  },
  {
    id: 'ffpmrca',
    title: 'FFPMRCA',
    group: 'Royal College of Anaesthetists',
    microCopy: 'Pain medicine fellowship exam preparation.',
    sortOrder: 0
  },
  
  // Royal College of Radiologists (sortOrder: 1)
  {
    id: 'frcr-clinical-radiology',
    title: 'FRCR – Clinical Radiology',
    group: 'Royal College of Radiologists',
    microCopy: 'Physics, Anatomy, Final A/B with image-rich drills.',
    sortOrder: 1
  },
  {
    id: 'frcr-clinical-oncology',
    title: 'FRCR – Clinical Oncology',
    group: 'Royal College of Radiologists',
    microCopy: 'CO Part 1, 2A, 2B mapped to latest blueprint.',
    sortOrder: 1
  },
  
  // Royal College of Pathologists (sortOrder: 2)
  {
    id: 'frcpath-histopathology',
    title: 'FRCPath – Histopathology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-haematology',
    title: 'FRCPath – Haematology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-microbiology',
    title: 'FRCPath – Medical Microbiology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-virology',
    title: 'FRCPath – Virology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-chemical-pathology',
    title: 'FRCPath – Chemical Pathology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-immunology',
    title: 'FRCPath – Immunology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-forensic',
    title: 'FRCPath – Forensic Pathology',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  {
    id: 'frcpath-biochemistry',
    title: 'FRCPath – Clinical Biochemistry',
    group: 'Royal College of Pathologists',
    microCopy: 'Part 1 & 2 preparation with consultant pathologists.',
    sortOrder: 2
  },
  
  // Royal College of Ophthalmologists (sortOrder: 3)
  {
    id: 'frcophth',
    title: 'FRCOphth (Part 1, 2, Final Clinical)',
    group: 'Royal College of Ophthalmologists',
    microCopy: 'Parts 1–2 & clinical OSCE with station practice.',
    sortOrder: 3
  },
  
  // Royal College of Psychiatrists (sortOrder: 4)
  {
    id: 'mrcpsych',
    title: 'MRCPsych (Paper A, B, CASC)',
    group: 'Royal College of Psychiatrists',
    microCopy: 'Paper A/B & CASC with role-play stations.',
    sortOrder: 4
  },
  
  // Royal College of General Practitioners (sortOrder: 5)
  {
    id: 'mrcgp',
    title: 'MRCGP (AKT, SCA)',
    group: 'Royal College of General Practitioners',
    microCopy: 'AKT & SCA with simulated consults.',
    sortOrder: 5
  },
  
  // Royal College of Emergency Medicine (sortOrder: 6)
  {
    id: 'mrcem',
    title: 'MRCEM (Primary, Intermediate, OSCE)',
    group: 'Royal College of Emergency Medicine',
    microCopy: 'Primary/Intermediate/Final with SAQ/OSCE practice.',
    sortOrder: 6
  },
  {
    id: 'frcem',
    title: 'FRCEM (Intermediate, Final SAQ, OSCE)',
    group: 'Royal College of Emergency Medicine',
    microCopy: 'Primary/Intermediate/Final with SAQ/OSCE practice.',
    sortOrder: 6
  },
  
  // Intercollegiate Surgical (sortOrder: 7)
  {
    id: 'frcs-general-surgery',
    title: 'FRCS – General Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-trauma-ortho',
    title: 'FRCS – Trauma & Orthopaedics',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-orlhns',
    title: 'FRCS – ORL-HNS',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-plastic-surgery',
    title: 'FRCS – Plastic Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-urology',
    title: 'FRCS – Urology',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-neurosurgery',
    title: 'FRCS – Neurosurgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-paediatric-surgery',
    title: 'FRCS – Paediatric Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-cardiothoracic',
    title: 'FRCS – Cardiothoracic Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-vascular',
    title: 'FRCS – Vascular Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'frcs-maxillofacial',
    title: 'FRCS – Oral & Maxillofacial Surgery',
    group: 'Intercollegiate Surgical',
    microCopy: 'Fellowship prep tailored to your surgical specialty.',
    sortOrder: 7
  },
  {
    id: 'dohns',
    title: 'DOHNS (Diploma)',
    group: 'Intercollegiate Surgical',
    microCopy: 'ENT OSCE exam preparation.',
    sortOrder: 7
  },
  
  // Royal College of Obstetricians & Gynaecologists (sortOrder: 8)
  {
    id: 'drcog',
    title: 'DRCOG (Diploma)',
    group: 'Royal College of Obstetricians & Gynaecologists',
    microCopy: 'Diploma exam essentials for primary care.',
    sortOrder: 8
  },
  
  // Royal College of Physicians - SCEs (sortOrder: 9)
  {
    id: 'sce-acute-medicine',
    title: 'SCE – Acute Medicine',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-cardiology',
    title: 'SCE – Cardiology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-clinical-pharmacology',
    title: 'SCE – Clinical Pharmacology & Therapeutics',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-dermatology',
    title: 'SCE – Dermatology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-endocrinology',
    title: 'SCE – Endocrinology & Diabetes',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-gastroenterology',
    title: 'SCE – Gastroenterology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-geriatric-medicine',
    title: 'SCE – Geriatric Medicine',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-infectious-diseases',
    title: 'SCE – Infectious Diseases',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-medical-oncology',
    title: 'SCE – Medical Oncology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-nephrology',
    title: 'SCE – Nephrology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-neurology',
    title: 'SCE – Neurology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-palliative-medicine',
    title: 'SCE – Palliative Medicine',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-respiratory-medicine',
    title: 'SCE – Respiratory Medicine',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  {
    id: 'sce-rheumatology',
    title: 'SCE – Rheumatology',
    group: 'Royal College of Physicians - SCEs',
    microCopy: 'Specialty Certificate Exam prep aligned to RCP.',
    sortOrder: 9
  },
  
  // UK Faculties (sortOrder: 10)
  {
    id: 'mfph',
    title: 'MFPH (Part A, Part B)',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'dfph',
    title: 'DFPH',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'mfom',
    title: 'MFOM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'ffom',
    title: 'FFOM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'mfsrh',
    title: 'MFSRH',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'dfsrh',
    title: 'DFSRH',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'mfsem',
    title: 'MFSEM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'ffsem',
    title: 'FFSEM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'mftm',
    title: 'MFTM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'fftm',
    title: 'FFTM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'mfpm',
    title: 'MFPM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  },
  {
    id: 'ffpm',
    title: 'FFPM',
    group: 'UK Faculties',
    microCopy: 'Consultant-led preparation aligned to faculty standards.',
    sortOrder: 10
  }
];
