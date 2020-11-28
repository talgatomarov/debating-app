// TODO: Should we use numeric enum or string enum?
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
  players: { id: string | null; name: string | null }[];
  participantsCount: number;
  judge: { id: string | null; name: string | null };
}
