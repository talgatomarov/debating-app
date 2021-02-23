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
  name: string;
  stage: Stage;
  format: Format;
  privacy: string;
  motion: string;
  infoslide: string | null;
  owner: string;
  players: Player[];
  judges: Judge[];
  chair: Judge | null;
  timerInfo: {
    timerOn: boolean;
    speechStart: number;
    timeLeft: number;
  };
}
