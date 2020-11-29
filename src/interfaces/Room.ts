import { Player } from "./Player";
import { Judge } from "./Judge";

export enum Format {
  UNKNOWN = "Unknown",
  BPF = "British Parliamentary Format",
}

export interface Room {
  id?: string;
  roomName: string;
  format: Format;
  publicRoom: boolean;
  motion: string;
  infoslide: string | null;
  owner: string;
  players: Player[];
  participantsCount: number;
  judge: Judge;
  judgeJoinedRoundRoom: boolean;
  timerInfo: {
    timerOn: boolean;
    speechStart: number;
    timeLeft: number;
  };
}
