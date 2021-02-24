import { Player } from "./Player";
import { Judge } from "./Judge";

export enum Format {
  UNKNOWN = "Unknown",
  BPF = "British Parliamentary Format",
}

export interface BPFPositions {
  "Opening Government": {
    "Prime Minister": Player | null;
    "Deputy Prime Minister": Player | null;
  };
  "Opening Opposition": {
    "Leader of Opposition": Player | null;
    "Deputy Prime Minister": Player | null;
  };
  "Closing Government": {
    "Government Member": Player | null;
    "Government Whip": Player | null;
  };
  "Closing Opposition": {
    "Opposition Member": Player | null;
    "Opposition Whip": Player | null;
  };
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
  players: string[];
  judges: Judge[];
  chair: Judge | null;
  positions: any;
  timerInfo: {
    timerOn: boolean;
    speechStart: number;
    timeLeft: number;
  };
}
