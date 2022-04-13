import { PlayerType } from "../enums/PlayerType";

export interface Message {
  row: number;
  cell: number;
  player: PlayerType;
}
