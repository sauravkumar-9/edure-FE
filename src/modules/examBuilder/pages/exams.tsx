import { useEffect, useState } from "react";

import { ExamDetailsTab } from "../components/examBasicDetails";
import { ExamSlotsTab } from "../components/examSlots";
import ComponentDialog from "@/components/dialog/componentDialog";

import ExamDetailsCard from "../components/examDetaulsCard";
import { ExamDetailsCardSkeleton } from "../skeletonComponents/examDetailsCardSkeleton"; // Import the skeleton
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getExamBatchList } from "../services/examBuilder";
import PageInfo from "@/components/comman/pageInfo";
import { useNavigate } from "react-router-dom";

export default function ExamScheduleList() {
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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getExamBatchDetails = async () => {
    // Simulate API call
    setIsLoading(true);
    const examBatchList = await getExamBatchList();
    setExamDetails(examBatchList);
    setIsLoading(false);
  };

  useEffect(() => {
    getExamBatchDetails();
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
      label: "Basic Details",
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
      label: "Exam Slots",
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

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {isLoading ? (
            <Skeleton className="h-7 w-40" />
          ) : (
            <h2 className="text-xl font-bold">{examDetails?.name}</h2>
          )}
          <div className="flex gap-2">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(`/questions/exams/1`)}
            >
              <BookOpen className="h-4 w-4" />
              Question Bank
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowScheduleExamDialog(true)}
            >
              <CalendarClock className="h-4 w-4" />
              Schedule Exam
            </Button>
          </div>

          <ComponentDialog
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
        <PageInfo
          title="Manage Your Exams"
          description="Create and organize exams for your institution. Each exam can have multiple date slots, question banks, and registration settings. Use the status badges to track progress from draft to published and completed exams."
          variant="blue"
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Show skeleton loading while data is loading
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <ExamDetailsCardSkeleton key={index} />
            ))}
          </>
        ) : (
          // Show actual exam cards when data is loaded
          examDetails.exams?.map((exam: any) => (
            <ExamDetailsCard
              key={exam.examId}
              examData={exam}
              getConfirmSlots={handleConfirmSlots}
            />
          ))
        )}
      </div>
    </div>
  );
}
