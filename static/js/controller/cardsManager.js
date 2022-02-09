import {dataHandler} from "../data/dataHandler.js";
import {postData} from "../data/dataHandler.js";
// import {deleteCard} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, makeDroppable} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-status="${card['status_id']}_${boardId}"]`, content);
            makeDroppable.draggableCard();
            domManager.addEventListenerToMore(
                `.fas`,
                "click",
                deleteButtonHandler
            );
        }
    },

    changeCardStatus: function (cardId, cardStatus) {
        let dict = {'card_id': cardId, 'card_status': cardStatus}
        postData('/api/change_card_status', dict)
    },

  changeCardOrder: function (cardId, cardOrder, cardStatus ) {
    let data = {'card_id': cardId, 'order_status': cardOrder, 'card_status': cardStatus}
      postData('/api/change_card_order', data)
    },

};

function deleteButtonHandler(clickEvent) {
    let cardId = clickEvent.target.parentElement.parentElement.dataset.cardId
    console.log(cardId)
    let actualCard = clickEvent.target.parentElement.parentElement
    actualCard.remove();
    dataHandler.deleteCard(cardId);
}


// function deleteCard(clickEvent){
//
// }