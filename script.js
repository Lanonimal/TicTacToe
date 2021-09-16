const Player = (identity) => {
    this.identity = identity;

    const getIdentity = () => {
        return identity;
    }

    return { getIdentity };
};


const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const setField = (index, identity) => {
        if(index > board.length) return;
        board[index] = identity;
    };

    const getField = (index) => {
        if(index > board.length) return;
        return board[index];
    };

    //const reset

    return {setField, getField};
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.getElementById('playerTurn')

    fieldElements.forEach((field) => field.addEventListener("click", (e) => {
        if (e.target.textContent !== '') return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateGameboard(); 
        })
    );

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };

    return { setMessageElement }
})

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerIdentity());
        round++;
        displayController.setMessageElement(`{getCurrentPlayerIdentity()}'s turn`);
    };

    const getCurrentPlayerIdentity = () => {
        round % 2 === 1 ? playerX.getIdentity() : playerO.getIdentity();
    };

    return { playRound };
})();


/*updateGameboard()

function updateGameboard() {
    const fieldElements = document.querySelectorAll('.field');
    for (let i = 0; i < fieldElements.length; i++) {
        fieldElements[i].textContent = gameBoard.getField(i);
    }
}*/