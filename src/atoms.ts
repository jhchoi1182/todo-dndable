import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const todoState = atom<IToDoState>({
  key: "toDo",
  default: {
    Todo: ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});