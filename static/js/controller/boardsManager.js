import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates, buttonBuilder, modalBuilder } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
      );
    }
  },
  newBoard: async function () {
    const button = buttonBuilder()
    domManager.addChild("#root", button);
    domManager.addEventListener(`.btn`,'click', addBoardTitle)
    const newBoard = await dataHandler.createNewBoard();

  }
};

function addBoardTitle() {
  const newBoardModalTitle = modalBuilder()
  domManager.addChild('#root', newBoardModalTitle);
  $('.modal').modal('toggle');
}

function showHideButtonHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardId;
  cardsManager.loadCards(boardId);
}
