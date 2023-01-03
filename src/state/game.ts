import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

enum StateKeys {
  PlayersInfo = "Battleground.PlayersInfo",
  Steps = "Game.Steps",
  Winner = "Game.Winner",
  Winners = "Game.Winners",
}

export const stepsState = atom<number>({
  key: StateKeys.Steps,
  default: 0,
});

export const winnerState = atom<string>({
  key: StateKeys.Winner,
  default: "",
});

export const winnersState = atom<any[]>({
  key: StateKeys.Winners,
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const playersInfoState = atom<{
  name1: string;
  age1: string;
  name2: string;
  age2: string;
}>({
  key: StateKeys.PlayersInfo,
  default: {
    name1: "",
    age1: "",
    name2: "",
    age2: "",
  },
  effects_UNSTABLE: [persistAtom],
});
