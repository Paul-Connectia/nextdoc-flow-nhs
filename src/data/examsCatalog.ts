export type ExamType = 'membership' | 'fellowship' | 'diploma' | 'sce' | 'faculty';

// Authoritative Browser → Template mapping
export const EXAMS_TO_TEMPLATE: Record<string, string> = {
  // Physicians (RCP)
  "mrcpuk": "mrcp",
  "mrcp-sce": "mrcp-sce",

  // Surgeons
  "mrcs": "mrcs",
  "frcs": "frcs",

  // Anaesthetists
  "frca": "frca",
  "fficm": "fficm",
  "ffpmrca": "ffpmrca",

  // Radiologists
  "frcr-clinical-radiology": "frcr-cr",
  "frcr-clinical-oncology": "frcr-co",

  // Pathologists
  "frcpath-histopathology": "frcpath-histo",
  "frcpath-haematology": "frcpath-haem",
  "frcpath-med-microbiology": "frcpath-micro",
  "frcpath-virology": "frcpath-virol",
  "frcpath-chem-path-biochem": "frcpath-chem",
  "frcpath-immunology": "frcpath-immun",
  "frcpath-forensic": "frcpath-forensic",

  // Ophthalmology
  "frcophth": "frcophth",

  // Psychiatry
  "mrcpsych": "mrcpsych",

  // Paediatrics
  "mrcpch": "mrcpch",

  // Obstetrics & Gynaecology
  "mrcog": "mrcog",
  "drcog": "drcog",

  // General Practice
  "mrcgp": "mrcgp",

  // Emergency Medicine
  "mrcem": "mrcem",
  "frcem": "frcem",

  // ENT diploma
  "dohns": "dohns",

  // UK Faculties
  "mfph": "mfph",
  "dfph": "dfph",
  "mfom": "mfom",
  "ffom": "ffom",
  "mfsrh": "mfsrh",
  "dfsrh": "dfsrh",
  "mfsem": "mfsem",
  "ffsem": "ffsem",
  "mftm": "mftm",
  "fftm": "fftm",
  "mfpm": "mfpm",
  "ffpm": "ffpm"
};

export interface Track {
  id: string;
  label: string;
  steps?: string[];
  crossSell?: ('cvbooster' | 'interviewsim' | 'cpd' | 'mentor')[];
  lastUpdated?: string;
}

export interface Exam {
  id: string;
  label: string;
  type: ExamType;
  gapmapTemplate: string;
  tracks?: Track[];
  siblingGroups?: { group: string; items: { id: string; label: string }[] }[];
  next?: { id: string; label: string }[];
  meta?: {
    bookingLinks?: string[];
    seo?: { title?: string; description?: string };
    lastUpdated?: string;
  };
}

export interface College {
  id: string;
  name: string;
  exams: Exam[];
}

export interface ExamsCatalog {
  colleges: College[];
}

export const examsCatalog: ExamsCatalog = {
  colleges: [
    {
      id: 'physicians',
      name: 'Royal Colleges of Physicians',
      exams: [
        {
          id: 'mrcpuk',
          label: 'MRCP(UK)',
          type: 'membership',
          gapmapTemplate: 'mrcp',
          tracks: [
            {
              id: 'part-1',
              label: 'Part 1',
              steps: [
                'Register for MRCP(UK) Part 1',
                'Complete clinical experience requirements',
                'Study core medical sciences',
                'Book exam date',
                'Pass Part 1 examination'
              ],
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'part-2',
              label: 'Part 2 Written',
              steps: [
                'Pass MRCP Part 1',
                'Complete Foundation training',
                'Study clinical scenarios',
                'Book Part 2 Written exam',
                'Pass Part 2 Written examination'
              ],
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'paces',
              label: 'PACES',
              steps: [
                'Pass Part 2 Written',
                'Complete clinical experience',
                'Practice clinical examination skills',
                'Book PACES exam',
                'Pass PACES examination'
              ],
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          siblingGroups: [
            {
              group: 'Specialty Certificate Examinations (SCE)',
              items: [
                { id: 'sce-acute-medicine', label: 'SCE – Acute Medicine' },
                { id: 'sce-cardiology', label: 'SCE – Cardiology' },
                { id: 'sce-clin-pharm', label: 'SCE – Clinical Pharmacology & Therapeutics' },
                { id: 'sce-dermatology', label: 'SCE – Dermatology' },
                { id: 'sce-endocrinology-diabetes', label: 'SCE – Endocrinology & Diabetes' },
                { id: 'sce-gastro', label: 'SCE – Gastroenterology (ESEGH)' },
                { id: 'sce-geriatrics', label: 'SCE – Geriatric Medicine' },
                { id: 'sce-infectious-diseases', label: 'SCE – Infectious Diseases' },
                { id: 'sce-med-oncology', label: 'SCE – Medical Oncology' },
                { id: 'sce-nephrology', label: 'SCE – Nephrology (ESENeph)' },
                { id: 'sce-neurology', label: 'SCE – Neurology' },
                { id: 'sce-palliative', label: 'SCE – Palliative Medicine' },
                { id: 'sce-respiratory', label: 'SCE – Respiratory Medicine' },
                { id: 'sce-rheumatology', label: 'SCE – Rheumatology' }
              ]
            }
          ],
          meta: {
            seo: {
              title: 'MRCP(UK) Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCP(UK) Parts 1, 2 and PACES examinations for physicians'
            }
          }
        }
      ]
    },
    {
      id: 'surgeons',
      name: 'Intercollegiate Royal Colleges of Surgeons',
      exams: [
        {
          id: 'mrcs',
          label: 'MRCS',
          type: 'membership',
          gapmapTemplate: 'mrcs',
          tracks: [
            {
              id: 'intercollegiate',
              label: 'Intercollegiate MRCS',
              steps: [
                'Complete medical degree',
                'Gain surgical experience',
                'Pass MRCS Part A',
                'Pass MRCS Part B (OSCE)',
                'Achieve MRCS qualification'
              ],
              crossSell: ['cvbooster', 'interviewsim']
            }
          ],
          next: [{ id: 'frcs', label: 'FRCS (Higher Fellowship)' }],
          meta: {
            seo: {
              title: 'MRCS Exam Guide | NextDoc Guru',
              description: 'Complete guide to Intercollegiate MRCS examination for surgeons'
            }
          }
        },
        {
          id: 'frcs',
          label: 'FRCS (Higher Fellowship)',
          type: 'fellowship',
          gapmapTemplate: 'frcs',
          tracks: [
            { id: 'general-surgery', label: 'FRCS (Gen Surg)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'trauma-orthopaedics', label: 'FRCS (Tr & Orth)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'orl-hns', label: 'FRCS (ORL-HNS) – ENT', crossSell: ['cvbooster', 'mentor'] },
            { id: 'plastics', label: 'FRCS (Plast)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'urology', label: 'FRCS (Urol)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'neurosurgery', label: 'FRCS (Neurosurg)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'paediatric-surgery', label: 'FRCS (Paed Surg)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'cardiothoracic', label: 'FRCS (C-Th)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'vascular', label: 'FRCS (Vasc)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'omfs', label: 'FRCS (OMFS)', crossSell: ['cvbooster', 'mentor'] }
          ],
          meta: {
            seo: {
              title: 'FRCS Higher Fellowship Guide | NextDoc Guru',
              description: 'Complete guide to FRCS higher surgical fellowships across all specialties'
            }
          }
        },
        {
          id: 'dohns',
          label: 'DOHNS (Diploma in Otolaryngology–HNS)',
          type: 'diploma',
          gapmapTemplate: 'diploma',
          tracks: [
            {
              id: 'standard',
              label: 'DOHNS Examination',
              crossSell: ['cvbooster', 'interviewsim']
            }
          ],
          meta: {
            seo: {
              title: 'DOHNS Exam Guide | NextDoc Guru',
              description: 'Guide to the Diploma in Otolaryngology-Head and Neck Surgery'
            }
          }
        }
      ]
    },
    {
      id: 'anaesthetists',
      name: 'Royal College of Anaesthetists',
      exams: [
        {
          id: 'frca',
          label: 'FRCA',
          type: 'fellowship',
          gapmapTemplate: 'frca',
          tracks: [
            {
              id: 'primary-frca',
              label: 'Primary FRCA',
              steps: [
                'Complete Foundation training',
                'Enter anaesthetics training',
                'Study basic sciences',
                'Pass Primary MCQ',
                'Pass Primary OSCE/SOE'
              ],
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'final-frca',
              label: 'Final FRCA',
              steps: [
                'Pass Primary FRCA',
                'Complete intermediate training',
                'Pass Final MCQ',
                'Pass Final SOE',
                'Achieve FRCA qualification'
              ],
              crossSell: ['cvbooster', 'interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FRCA Exam Guide | NextDoc Guru',
              description: 'Complete guide to Primary and Final FRCA examinations'
            }
          }
        },
        {
          id: 'ffpmrca',
          label: 'FFPMRCA (Pain Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'FFPMRCA Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FFPMRCA Pain Medicine Guide | NextDoc Guru',
              description: 'Guide to the Faculty of Pain Medicine examination'
            }
          }
        },
        {
          id: 'fficm',
          label: 'FFICM (Intensive Care Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'FFICM Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FFICM Intensive Care Guide | NextDoc Guru',
              description: 'Guide to the Faculty of Intensive Care Medicine examination'
            }
          }
        }
      ]
    },
    {
      id: 'radiologists',
      name: 'Royal College of Radiologists',
      exams: [
        {
          id: 'frcr-clinical-radiology',
          label: 'FRCR (Clinical Radiology)',
          type: 'fellowship',
          gapmapTemplate: 'frcr',
          tracks: [
            {
              id: 'first-frcr',
              label: 'First FRCR (Physics & Anatomy)',
              steps: [
                'Enter radiology training',
                'Study physics module',
                'Study anatomy module',
                'Pass Physics exam',
                'Pass Anatomy exam'
              ],
              crossSell: ['cvbooster']
            },
            {
              id: 'final-a',
              label: 'Final FRCR Part A',
              steps: [
                'Pass First FRCR',
                'Complete clinical experience',
                'Study imaging techniques',
                'Pass Final Part A',
                'Progress to Part B'
              ],
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'final-b',
              label: 'Final FRCR Part B',
              steps: [
                'Pass Final Part A',
                'Complete advanced training',
                'Practice reporting skills',
                'Pass rapid reporting',
                'Pass long cases & viva'
              ],
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FRCR Clinical Radiology Guide | NextDoc Guru',
              description: 'Complete guide to FRCR Clinical Radiology examinations'
            }
          }
        },
        {
          id: 'frcr-clinical-oncology',
          label: 'FRCR (Clinical Oncology)',
          type: 'fellowship',
          gapmapTemplate: 'frcr',
          tracks: [
            {
              id: 'part-1',
              label: 'Part 1 (Basic Sciences)',
              crossSell: ['cvbooster']
            },
            {
              id: 'part-2a',
              label: 'Part 2A (Written)',
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'part-2b',
              label: 'Part 2B (Clinical/Oral)',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FRCR Clinical Oncology Guide | NextDoc Guru',
              description: 'Complete guide to FRCR Clinical Oncology examinations'
            }
          }
        }
      ]
    },
    {
      id: 'pathologists',
      name: 'Royal College of Pathologists',
      exams: [
        {
          id: 'frcpath',
          label: 'FRCPath',
          type: 'fellowship',
          gapmapTemplate: 'frcpath',
          tracks: [
            { id: 'histopathology', label: 'Histopathology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'haematology', label: 'Haematology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'medical-microbiology', label: 'Medical Microbiology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'virology', label: 'Virology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'chemical-pathology', label: 'Chemical Pathology / Clinical Biochemistry (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'immunology', label: 'Immunology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] },
            { id: 'forensic-pathology', label: 'Forensic Pathology (Part 1 & Part 2)', crossSell: ['cvbooster', 'mentor'] }
          ],
          meta: {
            seo: {
              title: 'FRCPath Exam Guide | NextDoc Guru',
              description: 'Complete guide to FRCPath examinations across all pathology specialties'
            }
          }
        }
      ]
    },
    {
      id: 'ophthalmologists',
      name: 'Royal College of Ophthalmologists',
      exams: [
        {
          id: 'frcophth',
          label: 'FRCOphth',
          type: 'fellowship',
          gapmapTemplate: 'frcophth',
          tracks: [
            {
              id: 'part-1',
              label: 'Part 1',
              steps: [
                'Enter ophthalmology training',
                'Study basic sciences',
                'Book Part 1 exam',
                'Pass Part 1 examination',
                'Progress to Part 2'
              ],
              crossSell: ['cvbooster']
            },
            {
              id: 'part-2',
              label: 'Part 2 (Written + OSCE)',
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'final',
              label: 'Final (Clinical)',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FRCOphth Exam Guide | NextDoc Guru',
              description: 'Complete guide to FRCOphth ophthalmology examinations'
            }
          }
        }
      ]
    },
    {
      id: 'psychiatrists',
      name: 'Royal College of Psychiatrists',
      exams: [
        {
          id: 'mrcpsych',
          label: 'MRCPsych',
          type: 'membership',
          gapmapTemplate: 'mrcpsych',
          tracks: [
            {
              id: 'paper-a',
              label: 'Paper A',
              steps: [
                'Enter psychiatry training',
                'Complete foundation knowledge',
                'Study for Paper A',
                'Pass Paper A examination',
                'Progress to Paper B'
              ],
              crossSell: ['cvbooster']
            },
            {
              id: 'paper-b',
              label: 'Paper B',
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'casc',
              label: 'CASC',
              steps: [
                'Pass Paper A & B',
                'Practice clinical scenarios',
                'Book CASC exam',
                'Pass CASC examination',
                'Achieve MRCPsych'
              ],
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MRCPsych Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCPsych psychiatry examinations'
            }
          }
        }
      ]
    },
    {
      id: 'paediatrics',
      name: 'Royal College of Paediatrics & Child Health',
      exams: [
        {
          id: 'mrcpch',
          label: 'MRCPCH',
          type: 'membership',
          gapmapTemplate: 'mrcpch',
          tracks: [
            {
              id: 'fop',
              label: 'Foundation of Practice (FOP)',
              crossSell: ['cvbooster']
            },
            {
              id: 'tas',
              label: 'Theory & Science (TAS)',
              crossSell: ['cvbooster']
            },
            {
              id: 'akp',
              label: 'Applied Knowledge in Practice (AKP)',
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'clinical',
              label: 'Clinical Examination',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MRCPCH Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCPCH paediatrics examinations'
            }
          }
        }
      ]
    },
    {
      id: 'obgyn',
      name: 'Royal College of Obstetricians & Gynaecologists',
      exams: [
        {
          id: 'mrcog',
          label: 'MRCOG',
          type: 'membership',
          gapmapTemplate: 'mrcog',
          tracks: [
            {
              id: 'part-1',
              label: 'Part 1',
              steps: [
                'Enter O&G training',
                'Study basic sciences',
                'Pass Part 1 SBA',
                'Progress to Part 2',
                'Continue clinical training'
              ],
              crossSell: ['cvbooster']
            },
            {
              id: 'part-2',
              label: 'Part 2',
              crossSell: ['cvbooster', 'interviewsim']
            },
            {
              id: 'part-3',
              label: 'Part 3 (OSCE)',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MRCOG Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCOG obstetrics and gynaecology examinations'
            }
          }
        },
        {
          id: 'drcog',
          label: 'DRCOG (Diploma)',
          type: 'diploma',
          gapmapTemplate: 'diploma',
          tracks: [
            {
              id: 'standard',
              label: 'DRCOG Examination',
              crossSell: ['cvbooster']
            }
          ],
          meta: {
            seo: {
              title: 'DRCOG Diploma Guide | NextDoc Guru',
              description: 'Guide to the Diploma of the Royal College of Obstetricians and Gynaecologists'
            }
          }
        }
      ]
    },
    {
      id: 'gp',
      name: 'Royal College of General Practitioners',
      exams: [
        {
          id: 'mrcgp',
          label: 'MRCGP',
          type: 'membership',
          gapmapTemplate: 'mrcgp',
          tracks: [
            {
              id: 'akt',
              label: 'AKT',
              steps: [
                'Enter GP training',
                'Study clinical knowledge',
                'Pass AKT examination',
                'Continue GP training',
                'Progress to SCA'
              ],
              crossSell: ['cvbooster']
            },
            {
              id: 'sca',
              label: 'SCA',
              steps: [
                'Complete workplace assessments',
                'Pass AKT',
                'Prepare clinical scenarios',
                'Pass SCA examination',
                'Achieve MRCGP'
              ],
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MRCGP Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCGP general practice examinations'
            }
          }
        }
      ]
    },
    {
      id: 'rcem',
      name: 'Royal College of Emergency Medicine',
      exams: [
        {
          id: 'mrcem',
          label: 'MRCEM',
          type: 'membership',
          gapmapTemplate: 'mrcem',
          tracks: [
            {
              id: 'primary',
              label: 'Primary SBA',
              crossSell: ['cvbooster']
            },
            {
              id: 'intermediate-saq',
              label: 'Intermediate SAQ',
              crossSell: ['cvbooster']
            },
            {
              id: 'osce',
              label: 'OSCE',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          next: [{ id: 'frcem', label: 'FRCEM' }],
          meta: {
            seo: {
              title: 'MRCEM Exam Guide | NextDoc Guru',
              description: 'Complete guide to MRCEM emergency medicine examinations'
            }
          }
        },
        {
          id: 'frcem',
          label: 'FRCEM',
          type: 'fellowship',
          gapmapTemplate: 'frcem',
          tracks: [
            {
              id: 'intermediate-sba',
              label: 'Intermediate SBA',
              crossSell: ['cvbooster']
            },
            {
              id: 'final-saq',
              label: 'Final SAQ',
              crossSell: ['cvbooster']
            },
            {
              id: 'final-osce',
              label: 'Final OSCE/Management',
              crossSell: ['interviewsim', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'FRCEM Exam Guide | NextDoc Guru',
              description: 'Complete guide to FRCEM fellowship in emergency medicine'
            }
          }
        }
      ]
    },
    {
      id: 'faculties',
      name: 'UK Medical Faculties',
      exams: [
        {
          id: 'mfph',
          label: 'MFPH / DFPH (Public Health)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'Public Health Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFPH Public Health Guide | NextDoc Guru',
              description: 'Guide to Faculty of Public Health examinations'
            }
          }
        },
        {
          id: 'mfom',
          label: 'MFOM / FFOM (Occupational Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'Occupational Medicine Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFOM Occupational Medicine Guide | NextDoc Guru',
              description: 'Guide to Faculty of Occupational Medicine examinations'
            }
          }
        },
        {
          id: 'mfsrh',
          label: 'MFSRH / DFSRH (Sexual & Reproductive Health)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'SRH Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFSRH Sexual & Reproductive Health Guide | NextDoc Guru',
              description: 'Guide to Faculty of Sexual & Reproductive Healthcare examinations'
            }
          }
        },
        {
          id: 'mfsem',
          label: 'MFSEM / FFSEM (Sport & Exercise Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'Sport & Exercise Medicine Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFSEM Sport & Exercise Medicine Guide | NextDoc Guru',
              description: 'Guide to Faculty of Sport & Exercise Medicine examinations'
            }
          }
        },
        {
          id: 'mftm',
          label: 'MFTM / FFTM (Travel Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'Travel Medicine Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFTM Travel Medicine Guide | NextDoc Guru',
              description: 'Guide to Faculty of Travel Medicine examinations'
            }
          }
        },
        {
          id: 'mfpm',
          label: 'MFPM / FFPM (Pharmaceutical Medicine)',
          type: 'faculty',
          gapmapTemplate: 'faculties',
          tracks: [
            {
              id: 'standard',
              label: 'Pharmaceutical Medicine Examination',
              crossSell: ['cvbooster', 'mentor']
            }
          ],
          meta: {
            seo: {
              title: 'MFPM Pharmaceutical Medicine Guide | NextDoc Guru',
              description: 'Guide to Faculty of Pharmaceutical Medicine examinations'
            }
          }
        }
      ]
    }
  ]
};
