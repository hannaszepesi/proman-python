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
            console.log(board)
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
        console.log(document.getElementsByClassName('board-title'))
            domManager.addallEventListener(
                `.board-title`,
                "click",

                renameBoardTitle

            );
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
    console.log(boardId);
    console.log(clickEvent.target)
    cardsManager.loadCards(boardId);
}

function renameBoardTitle(clickEvent) {
    // kellene nekünk annak a boardnak az ID-ja, amelyik boardon lekattintjuk a show cards-ot, ezt a fenti functionból láttam el
    console.log(clickEvent.target)
    console.log('parent', clickEvent.target.parentElement)
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
    // aztán kell nekünk a fenti ID alapján az a board title, aminek az az ID-ja
    let actualBoard = clickEvent.target
    actualBoard.style.visibility = 'hidden'
    const input = inputBuilder(actualBoard.textContent)
    let parent = clickEvent.target.parentElement.classList[0]
    console.log('megint', parent)

    domManager.addfirstChild(parent, input)
    dataHandler.renameBoard()
    console.log(actualBoard)
    // data-board-id?

// de aztán pedig megkapnánk azt a táblát, amire kattintottunk, vegyük ki annak az eredeti szövegét:
   // let originalTitle = actualBoard.innerHTML
   // let title = actualBoard.innerHTML
    // és ha title != originalTitle, akkor hívjuk meg rá a függvényt:
   // if (title != originalTitle) {
   //     dataHandler.renameBoard(boardId, title)
   // }



    // console.log(boardId)
    // const title = document.getElementsByClassName('rename-board');
    // console.log(document)


    // console.log(boards)
    // for (let board of boards) {
    //     console.log(document.getElementsByClassName('board-header'))
    // domManager.addallEventListener('#title', 'click', async function () {
    //
    //         console.log(board)
    //         await renameBoard(board).then(
    //             result => domManager.addChild('.rename'))
    //         let saveButton = document.getElementsByClassName('rename-board');
    //         saveButton.addEventListener('click', () => domManager.addChild('.rename')
    //
    // )}
    // )}
}