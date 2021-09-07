
const renderGameboard = (size, gameboard, id) => {
    const container = document.querySelector(`#${id}-board`);
    let iterator = 0;
    for (let i = 0; i < size; i++) {
        const boardRow = document.createElement('div');
        boardRow.classList.add('board-row');
        
        for (let j = 0; j < size; j++) {
            iterator++;
            const button = document.createElement('button');
            button.setAttribute('data-index', `${iterator}`);
            button.classList.add('game-field');
            button.classList.add(`row-${j}`);

            boardRow.appendChild(button);
        };
        container.appendChild(boardRow);
    };
    _renderShips(gameboard, id);
};

const _renderShips = (gameboard, id) => {
    let iterator = 0;
    gameboard.getCoordinates().forEach((element, j) => element.forEach((field, i) => {
        const status = field.status;
        iterator++;
        console.log(iterator);
        const container = document.querySelector(`#${id}-board`);
        const domField = container.querySelector(`.board-row>button[data-index="${iterator}"]`);
        if (status === 1) {
            domField.style.backgroundColor = "LightSkyBlue";
        };
    }))
};

const updateField = (gameboard, id, y, x) => {
//render placement of ships on coordinates
//color the fields depending on status
    // 0 = empty = no color
    // 1 = part of a ship = blue
    // 2 = a sunken part of a ship = red
    // 3 = a missed shot = green
    //const fields = document.querySelectorAll()
        //console.log(field);
//loop through gameboard array, check for status, then change color
    const container = document.querySelector(`#${id}-board`);
    
    console.log(container);

    //sunk
    if (gameboard.getCoordinates()[y][x].status === 2) {
        let iterator = 0;
        //get field number
        iterator = (y + 1) * (x + 1);
        const field = container.querySelector(`.board-row>button[data-index="${iterator}"]`);
        field.style.backgroundColor = "red";
        
    }
    //missed
    else if (gameboard.getCoordinates()[y][x].status === 3) {
        let iterator = 0;
        //get field number
        iterator = (y + 1) * (x + 1);
        const field = container.querySelector(`.board-row>button[data-index="${iterator}"]`);
        field.style.backgroundColor = "green";
        
    };


};

export { renderGameboard, updateField};
