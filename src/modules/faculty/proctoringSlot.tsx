import { useEffect, useState } from "react";

import { ExamDetailsTab } from "./scedulingLayout/examBasicDetails";
import { ExamSlotsTab } from "./scedulingLayout/examSlots";
import ConfigDialog from "@/components/final/configDialog";

import ExamDetailsCard from "./scedulingLayout/examDetaulsCard";
import ExamDetailsMockResponse from "./mock/examList.json";

export default function ExamSchedulerPage() {
  // Exam Config Data
  const [showScheduleExamDialog, setShowScheduleExamDialog] = useState(false);
  const [examName, setExamName] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [studentCutoff, setStudentCutoff] = useState<Date>();
  const [teacherCutoff, setTeacherCutoff] = useState<Date>();
  const [lastRegDate, setLastRegDate] = useState<Date>();
  const [slots, setSlots] = useState<
    Record<string, { start: string; end: string }[]>
  >({});
  const [isScheduleExamSubmissionAllowed, setIsScheduleExamSubmissionAllowed] =
    useState(true);
  const [examDetails, setExamDetails] = useState<any>({});

  const getExamDetails = () => {
    setExamDetails(ExamDetailsMockResponse);
    console.log(ExamDetailsMockResponse);
  };

  useEffect(() => {
    getExamDetails();
  }, []);

  const addSlot = (dateStr: string) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { start: "", end: "" }],
    }));
  };

  const removeSlot = (dateStr: string, index: number) => {
    setSlots((prev) => {
      const updated = [...(prev[dateStr] || [])];
      updated.splice(index, 1);
      return { ...prev, [dateStr]: updated };
    });
  };

  const updateSlot = (
    dateStr: string,
    index: number,
    key: "start" | "end",
    value: string
  ) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr].map((slot, i) =>
        i === index ? { ...slot, [key]: value } : slot
      ),
    }));
  };

  const scheduleExam = () => {
    console.log({
      examName,
      selectedDates,
      slots,
      studentCutoff,
      teacherCutoff,
      lastRegDate,
    });
    setShowScheduleExamDialog(false);
  };

  const scheduleExamTabDetails = [
    {
      value: "details",
      label: "Details",
      component: ExamDetailsTab,
      props: {
        examName,
        setExamName,
        selectedDates,
        setSelectedDates,
        studentCutoff,
        setStudentCutoff,
        teacherCutoff,
        setTeacherCutoff,
        lastRegDate,
        setLastRegDate,
      },
    },
    {
      value: "slots",
      label: "Slots",
      component: ExamSlotsTab,
      props: {
        selectedDates,
        slots,
        addSlot,
        removeSlot,
        updateSlot,
      },
    },
  ];

  const saveExamAsDraft = () => {
    console.log("Save Draft");
  };

  const handleConfirmSlots = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{examDetails?.examName}</h2>
        <ConfigDialog
          tabsDetails={scheduleExamTabDetails}
          isDialogOpen={showScheduleExamDialog}
          actionButtonLabel="Schedule Exam"
          dialogTitle={`Schedule ${examDetails?.examName} Exam`}
          isDraft={true}
          isSubmissionAllowed={isScheduleExamSubmissionAllowed}
          setIsDialogOpen={setShowScheduleExamDialog}
          handleSaveDraft={saveExamAsDraft}
          handleActionConfimration={scheduleExam}
          handleDiscard={() => setShowScheduleExamDialog(false)}
        />
      </div>

      <div className="space-y-4">
        {examDetails.exams?.map((exam: any) => (
          <ExamDetailsCard
            key={exam.examId}
            examData={exam}
            getConfirmSlots={handleConfirmSlots}
          />
        ))}
      </div>
    </div>
  );
}
