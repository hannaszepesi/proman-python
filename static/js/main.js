import { boardsManager } from "./controller/boardsManager.js";

function init() {
  boardsManager.loadBoards();
}

function newBoard() {
  boardsManager.newBoard();
}
newBoard()
init();
