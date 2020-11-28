// TODO: Should we use numeric enum or string enum?
export enum Format {
  UNKNOWN = "Unknown",
  BPF = "British Parliamentary Format",
}

export interface Player {
  id: string | null;
  name: string | null;
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
  judge: Player; // extend Player interface if needed
}
