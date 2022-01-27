import {dataHandler} from "../data/dataHandler.js";
import {
    htmlFactory,
    htmlTemplates,
    buttonBuilder,
    modalBuilder,
    makeDroppable,
    inputBuilder
} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let boardsManager = {
        loadBoards: async function () {
            this.newBoard()
            const boards = await dataHandler.getBoards();
            let columns = document.getElementsByClassName('board-content');
            console.log(columns)
            for (let board of boards) {
                const boardBuilder = htmlFactory(htmlTemplates.board);
                const content = boardBuilder(board); //ezek a script-ek
                domManager.addChild("#root", content); //itt kerül be a script, és lesz valós elem
                makeDroppable.droppableBoards();
                // domManager.addEventListener(
                //     `.toggle-board-button[data-board-id="${board.id}"]`,
                //     "click",
                //     showHideButtonHandler
                // );
                domManager.addallEventListener(
                    `.board-title`,
                    "dblclick",
                    renameBoardTitle
                );
                domManager.addallEventListener(
                    '.add-card',
                    'click',
                    addNewCard);
            }
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );

            for (let column of columns) {
                column.style.visibility = "hidden";
            }
        },
        newBoard: async function () {
            const button = buttonBuilder()
            domManager.addChild("#root", button);
            domManager.addEventListener(`#create_new_board`, 'click', addBoardTitle)
        }
    }
;

function addNewCard() {
    const newCardModalTitle = modalBuilder('new_card')
    domManager.addChild('#root', newCardModalTitle);
    $('.modal').modal('toggle');
    domManager.addEventListener('#create', 'click', async function () {
        const cardTitle = $('#new-board-title').val()
        console.log(cardTitle)
        const newBoard = await dataHandler.createNewCard(cardTitle);
        console.log(newBoard)
        document.getElementById('root').innerHTML = ''

        await boardsManager.loadBoards()
    })
    domManager.addEventListener('.close', 'click', async function () {
        document.getElementById('root').innerHTML = ''
        await boardsManager.loadBoards()
    })
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

async function showHideButtonHandler(clickEvent) {
    let columns = document.getElementsByClassName('board-content')
    let boardId = clickEvent.target.dataset.boardId
    console.log(clickEvent.target)
    console.log(clickEvent.target.dataset.show)
    if (clickEvent.target.dataset.show === "false") {
        const boardId = clickEvent.target.dataset.boardId;
        console.log(clickEvent.target.dataset.show)
        await cardsManager.loadCards(boardId);
        clickEvent.target.dataset.show = "true";
        for (let column of columns) {
            if (boardId === column.dataset.boardId) {
                column.style.visibility = "visible";
            }
        }
        console.log(clickEvent.target)
    } else {
        for (let column of columns) {
            if (boardId === column.dataset.boardId) {

                let cards = document.getElementsByClassName('board-column-content')
                console.log(cards)
                for (let col of cards) {
                    col.innerHTML = ''
                }
                column.style.visibility = "hidden";
                console.log(column.style.visibility)
                console.log(column)
                clickEvent.target.dataset.show = "false";
                console.log(column.dataset.show)
            }
        }

    }

}
