import {dataHandler} from "../data/dataHandler.js";
import {
    htmlFactory,
    htmlTemplates,
    buttonBuilder,
    modalBuilder,
    renameBoard,
    makeDroppable,
} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let boardsManager = {
    loadBoards: async function () {
        this.newBoard()
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            // makeDroppable.droppableMain
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
        renameBoardTitle(boards);
    },
    newBoard: async function () {
        const button = buttonBuilder()
        domManager.addChild("#root", button);
        domManager.addEventListener(`#create_new_board`, 'click', addBoardTitle)
    }
};

function addBoardTitle() {
    const newBoardModalTitle = modalBuilder()
    domManager.addChild('#root', newBoardModalTitle);
    $('.modal').modal('toggle');
    domManager.addEventListener('#create', 'click', async function () {
        const boardTitle = $('#new-board-title').val()
        console.log(boardTitle)
        const newBoard = await dataHandler.createNewBoard(boardTitle);
        console.log(newBoard)
        document.getElementById('root').innerHTML = ''

        await boardsManager.loadBoards()
    })
    domManager.addEventListener('.close', 'click', async function () {
        document.getElementById('root').innerHTML = ''
        await boardsManager.loadBoards()
    })
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function renameBoardTitle(boards) {
    // const title = document.getElementsByClassName('rename-board');
    console.log(document)


    console.log(boards)
    for (let board of boards) {
        console.log(document.getElementsByClassName('board-header'))
    domManager.addallEventListener('#title', 'click', async function () {

            console.log(board)
            await renameBoard(board).then(
                result => domManager.addChild('.rename'))
            let saveButton = document.getElementsByClassName('rename-board');
            saveButton.addEventListener('click', () => domManager.addChild('.rename')

    )}
    )}
}