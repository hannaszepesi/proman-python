import {dataHandler} from "../data/dataHandler.js";
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
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }



    },
};

function deleteButtonHandler(clickEvent) {
}
