
const renderGameboard = (size, id) => {
    const container = document.querySelector(`#${id}-board`);
    for (let i = 0; i < size; i++) {
        const boardRow = document.createElement('div');
        boardRow.classList.add('board-row');
        for (let j = 0; j < size; j++){
            const button = document.createElement('button');
            button.setAttribute('data-index', j);
            button.classList.add('game-field');
            button.classList.add(`row-${j}`);

            boardRow.appendChild(button);
        };
        container.appendChild(boardRow);
    };
}

const renderShip = (ship, gameboard) => {
//render placement of ships
};

export { renderGameboard, renderShip };
