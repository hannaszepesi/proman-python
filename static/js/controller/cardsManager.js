import {dataHandler} from "../data/dataHandler.js";
import {postData} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, inputBuilder, makeDroppable} from "../view/htmlFactory.js";
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
                renameCard
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

function renameCard(clickEvent) {
    console.log(clickEvent.target)
    const cardId = clickEvent.target.dataset.cardId;
    let actualCard = clickEvent.target
    actualCard.style.visibility = 'hidden'
    const inputbar = inputBuilder('card')
    let parent = clickEvent.target.parentElement
    parent.insertBefore(inputbar[0], actualCard)
    parent.insertBefore(inputbar[1], actualCard)
   // parent.insertBefore(inputbar[1], parent.childNodes[0])
    //parent.insertBefore(inputbar[0], parent.childNodes[0])

    domManager.addEventListener('.rename-card', 'click', async function () {
            let newTitle = inputbar[0].value
            await dataHandler.renameCard(cardId, newTitle)
            inputbar[0].remove()
            inputbar[1].remove()
            actualCard.style.visibility = 'visible'
            actualCard.textContent = newTitle
        }
    )

}
