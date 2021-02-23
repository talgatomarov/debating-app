import { Player } from "./Player";
import { Judge } from "./Judge";

export enum Format {
  UNKNOWN = "Unknown",
  BPF = "British Parliamentary Format",
}

export enum Stage {
  formation = "formation",
  preparation = "preparation",
  ongoing = "ongoing",
  deliberation = "deliberation",
  adjudication = "adjudication",
}
export interface Room {
  id?: string;
  roomName: string;
  stage: Stage;
  format: Format;
  privacy: string;
  motion: string;
  infoslide: string | null;
  owner: string;
  players: Player[];
  participantsCount: number;
  judge: Judge;
  judgeJoinedRoundRoom: boolean;
  enteredPlayersCount: number;
  timerInfo: {
    timerOn: boolean;
    speechStart: number;
    timeLeft: number;
  };
}
