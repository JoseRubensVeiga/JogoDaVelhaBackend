import { PlayerType } from "../enums/PlayerType";

type TicTacToeCell = PlayerType | null;
type TicTacToeRow = [TicTacToeCell, TicTacToeCell, TicTacToeCell];

export type TicTacToe = [TicTacToeRow, TicTacToeRow, TicTacToeRow];
