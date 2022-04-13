import { PlayerType } from "../enums/PlayerType";

export interface Message {
  row: number;
  cell: number;
  player: "1" | "2";
  playerName: PlayerType;
  action?: string;
}
