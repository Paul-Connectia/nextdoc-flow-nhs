import ExamComingSoon from "@/components/ExamComingSoon";

const MRCS = () => {
  return (
    <ExamComingSoon
      examName="MRCS"
      examFullName="Membership of the Royal Colleges of Surgeons"
      description="We're developing comprehensive MRCS Part A & Part B preparation content with expert surgical training from consultant surgeons practising in the NHS. Our enhanced curriculum will include detailed anatomy resources, surgical skills practice, OSCE preparation, and dedicated principal mentor support for your surgical career."
      examParts={["MRCS Part A", "MRCS Part B OSCE"]}
      specialtyFocus="surgical training and core surgical skills"
    />
  );
};

export default MRCS;
