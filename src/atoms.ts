import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const todoState = atom<IToDoState>({
  key: "toDo",
  default: {
    Todo: [],
    Doing: [],
    Done: [],
  },
});
