import ExamComingSoon from "@/components/ExamComingSoon";

const MRCP = () => {
  return (
    <ExamComingSoon
      examName="MRCP"
      examFullName="Membership of the Royal Colleges of Physicians"
      description="We're developing comprehensive MRCP Part 1, Part 2 & PACES preparation content with expert guidance from experienced UK consultant physicians. Our enhanced curriculum will include interactive case-based learning, mock examinations, and dedicated principal mentor support to maximise your success in physician training."
      examParts={["MRCP Part 1", "MRCP Part 2 Written", "PACES Clinical"]}
      specialtyFocus="physician training and internal medicine"
    />
  );
};

export default MRCP;
