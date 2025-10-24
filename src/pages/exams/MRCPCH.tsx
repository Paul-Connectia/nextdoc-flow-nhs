import ExamComingSoon from "@/components/ExamComingSoon";

const MRCPCH = () => {
  return (
    <ExamComingSoon
      examName="MRCPCH"
      examFullName="Membership of the Royal College of Paediatrics and Child Health"
      description="We're developing comprehensive MRCPCH Foundation & Progress examination preparation content with expert guidance from consultant paediatricians. Our enhanced curriculum will include paediatric clinical skills training, developmental assessment practice, and dedicated principal mentor support for your career in paediatrics."
      examParts={["MRCPCH Foundation", "MRCPCH Progress"]}
      specialtyFocus="paediatric medicine and child health"
    />
  );
};

export default MRCPCH;
