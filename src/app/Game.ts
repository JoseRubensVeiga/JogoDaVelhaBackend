import { FinishMode } from "../enums/FinishMode";
import { PlayerType } from "../enums/PlayerType";
import { Message } from "../interfaces/Message";
import { Score } from "../interfaces/Score";
import { TicTacToe } from "../interfaces/TicTacToe";

export class Game {
  ticTacToe!: TicTacToe;
  currentPlayer!: PlayerType;
  isFinished!: boolean;
  finishMode: FinishMode | null = null;
  winnerName: string | null = null;
  xPlayerName = "player 1";
  oPlayerName = "player 2";
  score!: Score;
  me!: PlayerType;

  constructor() {
    this.init();
  }

  updateGame(message: Message): void {
    if (this.isFinished) {
      this.init();
    }

    this.fillCell(message.row, message.cell);

    const finished = this.getFinishMode();

    if (finished != null || this.ticTacToe.every((r) => r.every((c) => !!c))) {
      this.isFinished = true;
      this.finishMode = finished;
      this.winnerName = this.getCurrentPlayerName(message);
      this.addSCore();
    }

    this.toggleCurrentPlayer();
  }

  toString(): string {
    const obj = {
      ticTacToe: this.ticTacToe,
      currentPlayer: this.currentPlayer,
      isFinished: this.isFinished,
      finishMode: this.finishMode,
      winnerName: this.winnerName,
      xPlayerName: this.xPlayerName,
      oPlayerName: this.oPlayerName,
      score: this.score,
    };

    return JSON.stringify(obj);
  }

  clear(): void {
    this.ticTacToe = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    this.currentPlayer = "X";
    this.isFinished = false;

    this.xPlayerName = "player 1";
    this.oPlayerName = "player 2";

    this.score = {
      oPlayer: 0,
      xPlayer: 0,
    };
  }

  private init(): void {
    this.ticTacToe = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    this.currentPlayer = this.currentPlayer ?? "X";
    this.isFinished = false;

    this.xPlayerName = this.xPlayerName ?? undefined;
    this.oPlayerName = this.oPlayerName ?? undefined;

    this.score = {
      oPlayer: this.score?.oPlayer ?? 0,
      xPlayer: this.score?.xPlayer ?? 0,
    };
  }

  private addSCore(): void {
    if (this.currentPlayer === "X") {
      this.score.xPlayer++;
      return;
    }

    this.score.oPlayer++;
  }

  private getCurrentPlayerName(message: Message): string {
    if (message.player === "1") {
      return this.xPlayerName;
    }

    return this.oPlayerName;
  }

  private verifyCell(row: number, cell: number): boolean {
    return this.ticTacToe[row][cell] === this.currentPlayer;
  }

  private verifyRow(
    row: [[number, number], [number, number], [number, number]]
  ): boolean {
    return (
      this.verifyCell(row[0][0], row[0][1]) &&
      this.verifyCell(row[1][0], row[1][1]) &&
      this.verifyCell(row[2][0], row[2][1])
    );
  }

  private getFinishMode(): FinishMode | null {
    const finishModes: [FinishMode, () => boolean][] = [
      [
        FinishMode.VerticalOne,
        () =>
          this.verifyRow([
            [0, 0],
            [1, 0],
            [2, 0],
          ]),
      ],
      [
        FinishMode.VerticalTwo,
        () =>
          this.verifyRow([
            [0, 1],
            [1, 1],
            [2, 1],
          ]),
      ],
      [
        FinishMode.VerticalThree,
        () =>
          this.verifyRow([
            [0, 2],
            [1, 2],
            [2, 2],
          ]),
      ],
      [
        FinishMode.HorinzontalOne,
        () =>
          this.verifyRow([
            [0, 0],
            [0, 1],
            [0, 2],
          ]),
      ],
      [
        FinishMode.HorinzontalTwo,
        () =>
          this.verifyRow([
            [1, 0],
            [1, 1],
            [1, 2],
          ]),
      ],
      [
        FinishMode.HorinzontalThree,
        () =>
          this.verifyRow([
            [2, 0],
            [2, 1],
            [2, 2],
          ]),
      ],
      [
        FinishMode.DiagonalLeftTopToRightBottom,
        () =>
          this.verifyRow([
            [0, 0],
            [1, 1],
            [2, 2],
          ]),
      ],
      [
        FinishMode.DiagonalRightTopToLeftBottom,
        () =>
          this.verifyRow([
            [0, 2],
            [1, 1],
            [2, 0],
          ]),
      ],
    ];

    for (let condition of finishModes) {
      if (condition[1]()) {
        return condition[0];
      }
    }

    return null;
  }

  private toggleCurrentPlayer(): void {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  private fillCell(row: number, cell: number): void {
    this.ticTacToe[row][cell] = this.currentPlayer;
  }
}
