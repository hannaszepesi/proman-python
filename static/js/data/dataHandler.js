export let dataHandler = {
    getBoards: async function () {
        const response = await apiGet("/api/boards");
        return response;
    },
    getBoard: async function () {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function (boardId) {
        let data = await postData('/api/getStatuses', {boardId:boardId});
        return data
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        const response = await apiGet(`/api/boards/${boardId}/cards/`);
        return response;
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        return postData('/api/new_board', {title: boardTitle})
            .then(data => {
                return data// JSON data parsed by `data.json()` call
            });

    },

    renameBoard: function (id, boardTitle) {
        return postData('/api/rename_board', {id:id, title: boardTitle})
            .then(data => {
                return data// JSON data parsed by `data.json()` call
            });
    },

    renameColumn: function (columnId, newStatus) {
        let ColumnId = columnId[0];
        let boardId = columnId[2];
        console.log(ColumnId, boardId);
        return postData('/api/rename_column', {id:ColumnId, board_id:boardId, title:newStatus})
            .then(data => {
                return data
            });
    },

    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    return postData('/api/new_card', {title: cardTitle, board_id: boardId, status: statusId})
            .then(data => {
                return data// JSON data parsed by `data.json()` call
            });
    },

    writeDefaultColumns: async function (boardId) {
        return postData('/api/default_columns', {boardId:boardId})
    }
};


export async function postData(url = '', data = {}) {
            // Default options are marked with
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }


async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.status === 200) {
        let data = response.json();
        return data;
    }
}

async function apiPost(url, payload) {
}

async function apiDelete(url) {
}

async function apiPut(url) {
}
