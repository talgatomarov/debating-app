// TODO: Should we use numeric enum or string enum?
export enum Format {
  UNKNOWN,
  BPF,
}

export interface Room {
  id?: string;
  roomName: string;
  format: Format;
  publicRoom: boolean;
  motion: string;
  infoslide?: string;
  owner: string;
  players: { id: string; name: string }[];
  participantsCount: number;
  judge: { id: string; name: string };
}
