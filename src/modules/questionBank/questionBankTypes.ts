export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  code: string;
  text: string;
  options: string[];
  correctIndex: number;
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
  correctIndex: 0,
  difficulty: "easy",
  tags: [],
  createdAt: new Date().toISOString(),
  createdBy: {
    id: "",
    name: "",
  },
  timesUsed: 0,
};
