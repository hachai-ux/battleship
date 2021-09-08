
const renderGameboard = (size, gameboard, id) => {
    const container = document.querySelector(`#${id}-board`);
    gameboard.getCoordinates().forEach(row => {
        const boardRow = document.createElement('div');
        boardRow.classList.add('board-row');
        row.forEach((field, i) => {
            const y = field.y;
            const x = field.x;
            const button = document.createElement('button');
            button.setAttribute('data-y', y);
            button.setAttribute('data-x', x);
            button.classList.add('game-field');
            button.classList.add(`row-${i}`);

            boardRow.appendChild(button);
        });
         container.appendChild(boardRow);
    });
    _renderShips(gameboard, id);
};

const observeFields = (player, id) => {
    

    _updateField(gameBoard, id);
    const container = document.querySelector(`#${id}-board`);
    const fields = container.querySelectorAll('.game-field');
     fields.forEach(field => {
        field.addEventListener('click', () => {
            console.log(field.style.background);
            if (field.style.background === 'lightskyblue') {
                field.style.background = 'firebrick';
            }
            else if (field.style.background === '') {
                field.style.background = 'darkseagreen';
            
            };
        });
    }); 
};


const _renderShips = (gameboard, id) => {
      //iterate through gameboard and assign blue to each field with a ship
    gameboard.getCoordinates().forEach((element, j) => element.forEach((field, i) => {
        const status = field.status;
        const container = document.querySelector(`#${id}-board`);
        console.log(field.status);
        const domField = container.querySelector(`.board-row>button[data-x="${i}"][data-y="${j}"]`);
        if (status === 1) {
            domField.style.background = "lightskyblue";
        };
    }))
};

const _updateField = (gameboard, id, y, x) => {
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
        field.style.background = 'brickred';
        
    }
    //missed
    else if (gameboard.getCoordinates()[y][x].status === 3) {
        let iterator = 0;
        //get field number
        iterator = (y + 1) * (x + 1);
        const field = container.querySelector(`.board-row>button[data-index="${iterator}"]`);
        field.style.background = 'darkseagreen';
        
    };


};

export { renderGameboard, observeFields};

//backlog: check if it has already placed ships #redundant if user places ships on gameboard