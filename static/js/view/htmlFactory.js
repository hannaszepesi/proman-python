import {domManager} from "./domManager.js";

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

export function renameBoard(board){
    return new Promise(function(resolve, reject) {
        let scriptRename = `<div class="board-header"><span class="board-title">
            <input class="rename" type="text" placeholder="${board.title}"</span>
            <button class="rename-board" type="submit"> Save</button></div>`
        console.log(document.getElementsByClassName('board-header'))
    resolve(scriptRename)})
}


function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}>
                <div class="board-header"><span id='title' class="board-title">${board.title}</span>
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
export function buttonBuilder() {
    return `<button type="button" class='btn btn-outline-dark' data-toggle='modal' data-target='#newBoard'
            id="create_new_board" name="new_board">Create new board</button>`
}

export function modalBuilder() {
    return `<div class="modal" id="newBoard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">For create a new board choose a title </h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
<!--                    <button type="button" class="btn-close" data-bs-dismiss="modal" style="float: right" aria-label="Close">X</button>-->
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="new-board-title" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="new-board-title">
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="create" data-bs-dismiss="modal">Create</button>
                  </div>
                </div>
              </div>
            </div>`
}