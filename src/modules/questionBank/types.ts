export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  tags: string[];
}

export const defaultNewQuestion: Omit<Question, "id"> = {
  text: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  difficulty: "easy",
  tags: [],
};
