import {dataHandler} from "../data/dataHandler.js";
import {
    htmlFactory,
    htmlTemplates,
    buttonBuilder,
    modalBuilder,
    inputBuilder,
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
            const content = boardBuilder(board); //ezek a script-ek
            domManager.addChild("#root", content); //itt kerül be a script, és lesz valós elem
            makeDroppable.droppableBoards();
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
        domManager.addallEventListener(
            `.board-title`,
            "dblclick",
            renameBoardTitle
        );
        domManager.addallEventListener(
            '.add-card',
            'click',
            addNewCard);
    },
    newBoard: async function () {
        const button = buttonBuilder()
        domManager.addChild("#root", button);
        domManager.addEventListener(`#create_new_board`, 'click', addBoardTitle)
    }
};

function addNewCard(clickEvent) {
    const boardId = clickEvent.target.parentElement.parentElement.dataset.boardId
    const newCardModalTitle = modalBuilder('new_card')
    domManager.addChild('#root', newCardModalTitle);
    $('.modal').modal('toggle');
    domManager.addEventListener('#create', 'click', async function () {
        const cardTitle = $('#new-board-title').val()
        console.log(cardTitle)
        console.log(1)
        const newBoard = await dataHandler.createNewCard(cardTitle, boardId, 1);
        console.log(2)
        $("board-toggle").click() // akkor fog működni ha össze mergeltük a close branch eredményével
        $("board-toggle").click()
        console.log(3)
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

function renameBoardTitle(clickEvent) {
    console.log('parent', clickEvent.target.parentElement)
    const boardId = clickEvent.target.dataset.boardId;
    let actualBoard = clickEvent.target
    actualBoard.style.visibility = 'hidden'
    console.log(1, actualBoard.textContent)
    const inputbar = inputBuilder(actualBoard.textContent)
    let parent = clickEvent.target.parentElement
    parent.insertBefore(inputbar[1], parent.childNodes[0])
    parent.insertBefore(inputbar[0], parent.childNodes[0])


    domManager.addEventListener('.rename-board', 'click', async function () {
            let newTitle = inputbar[0].value
            const writedTitle = await dataHandler.renameBoard(boardId, newTitle)
            inputbar[0].remove()
            inputbar[1].remove()
            actualBoard.style.visibility = 'visible'
            actualBoard.textContent = newTitle
        }
    )
}

function addBoardTitle() {
  const newBoardModalTitle = modalBuilder('new_board')
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