import ExamComingSoon from "@/components/ExamComingSoon";

const MRCOG = () => {
  return (
    <ExamComingSoon
      examName="MRCOG"
      examFullName="Membership of the Royal College of Obstetricians and Gynaecologists"
      description="We're developing comprehensive MRCOG Part 1, Part 2 & Part 3 preparation content with expert guidance from consultant obstetricians and gynaecologists. Our enhanced curriculum will include clinical skills training, case-based scenarios, OSCE preparation, and dedicated principal mentor support for your O&G career pathway."
      examParts={["MRCOG Part 1", "MRCOG Part 2", "MRCOG Part 3 Clinical"]}
      specialtyFocus="obstetrics and gynaecology training"
    />
  );
};

export default MRCOG;
