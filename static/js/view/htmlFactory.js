import {domManager} from "./domManager";

export const htmlTemplates = {
    board: 1,
    card: 2
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}>${board.title}
                <div class="board-header"><span class="board-title">Board ${board.id}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                </div>
                <div class="board-columns">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content" data-status="1_${board.id}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In progress</div>
                    <div class="board-column-content" data-status="2_${board.id}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" data-status="3_${board.id}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" data-status="4_${board.id}"></div>
                </div>
                </div>
                </section>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" draggable="true">${card.title}</div>`;
}

export const makeDroppable = {
    droppableMain: function(){
        // ide kell egy for, a board-okat egyesével kell nézni
        domManager.addEventListener(board-column-content, 'dragstart', dragStart())
    },
    dragStart: function(){

    },
    dragEnd: function(){

    },
    dragOver: function(){

    },
    dragEnter: function(){

    },
    dragLeave: function(){

    },
    dragDrop: function(){

    }
}