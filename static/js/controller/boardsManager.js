import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, buttonBuilder, modalBuilder, makeDroppable} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let boardsManager = {
    loadBoards: async function () {
        this.newBoard()
        const boards = await dataHandler.getBoards();
        let columns = document.getElementsByClassName('board-content');
        columns.style.visibility ="hidden";
        console.log(columns)
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board); //ezek a script-ek
            domManager.addChild("#root", content); //itt kerül be a script, és lesz valós elem
            makeDroppable.droppableBoards();
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    newBoard: async function () {
        const button = buttonBuilder()
        domManager.addChild("#root", button);
        domManager.addEventListener(`#create_new_board`, 'click', addBoardTitle)
    }
};

async function addBoardTitle() {
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


// function toggleContent(boardId) {
//     let button = document.getElementsByClassName('board-toggle')
//     let boardContent = document.getElementsByClassName('board-content');
//     console.log(button.boardId)
//     if (button.dataset.boardId === boardId) {
//         button.addEventListener('click', function () {
//             boardContent.dataset.boardId.classList.add('hide');
//         })
//     }
// }