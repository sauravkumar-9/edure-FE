export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  code: string;
  text: string;
  options: any[];
  correctOptionId: number;
  difficulty: string;
  tags: string[];
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  timesUsed: number;
}

export const defaultNewQuestion: Omit<Question, "id"> = {
  code: "",
  text: "",
  options: ["", "", "", ""],
  correctOptionId: 0,
  difficulty: "easy",
  tags: [],
  createdAt: new Date().toISOString(),
  createdBy: {
    id: "",
    name: "",
  },
  timesUsed: 0,
};
