import { Link } from "react-router-dom";
import { ExamListCard } from "../components/examListCard";
import examCatgoryListMock from "../mock/examCatgory.json";
import { Button } from "@/components/ui/button";

export default function ExamCategoryList() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          + Add Exam
        </Button>
      </div>

      {/* Exam List */}
      <div className="grid gap-4">
        {examCatgoryListMock.examCategory.map((examCategory) => (
          <Link to={examCategory.id} className="block" key={examCategory.id}>
            <ExamListCard
              key={examCategory.id}
              exam={{
                id: examCategory.id,
                name: examCategory.name,
                description: examCategory.description,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
