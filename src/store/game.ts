import { atom } from "recoil";

export const currentState = atom({
  key: "atom.current",
  default: {
    type: 2,
    x: 0,
    y: 0
  },
});

export const nextState = atom({
  key: "atom.next",
  default: 0,
});