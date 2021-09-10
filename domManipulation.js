//setup doms, doms change board

const renderGameboard = (size, gameboard, id) => {
    const container = document.querySelector(`#${id}-board`);

       //dragover and drop handlers
        const dragover_handler = (ev) => {
            ev.preventDefault();
            console.log(ev);
            ev.dataTransfer.dropEffect = "move";
        };

        const drop_handler = (ev) => {
            ev.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            const data = ev.dataTransfer.getData("text/plain");
            console.log(data);
            
            //ev.target.appendChild(document.getElementById(data));
        };
    
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
          
            
            button.addEventListener("dragover", dragover_handler);
            button.addEventListener("drop", drop_handler);
            

            boardRow.appendChild(button);
            

            

        });
         container.appendChild(boardRow);
    });
    _renderShips(gameboard, id);
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
    }));
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
        //get field number
        const field = container.querySelector(`.board-row>button[data-y="${y}"][data-x="${x}"]`);
        field.style.background = 'firebrick';
        
    }
    //missed
    else if (gameboard.getCoordinates()[y][x].status === 3) {
        const field = container.querySelector(`.board-row>button[data-y="${y}"][data-x="${x}"]`);
        field.style.background = 'darkseagreen';
        
    };


};

const showWinner = (id) => {
    const body = document.querySelector('body');
    const winnerMessage = document.createElement('div');
    winnerMessage.textContent = `The winner is ${id}. Refresh page to restart. I didn't implement restart game options.`;
    body.appendChild(winnerMessage);
};

const renderDraggableShips = (size, id) => {

    //make rotataeble

    const container = document.querySelector(`#${id}-board`);
    const body = document.querySelector('body');
    const shipContainer = document.createElement('div');
    shipContainer.classList.add('ship-container');
    shipContainer.draggable = true;

   


    for (let i = 0; i < size; i++){
        const ship = document.createElement('button');
        
            
            ship.classList.add('draggable-ship');
            ship.style.background = 'lightskyblue';
        shipContainer.appendChild(ship);
    };
   body.appendChild(shipContainer);
    
         
    };

const rotateShips = () => {
    const rotateButton = document.createElement('button');
    const body = document.querySelector('body');
    rotateButton.textContent = 'Rotate Ships';
    body.appendChild(rotateButton);
}

export { updateField, renderGameboard, showWinner, renderDraggableShips, rotateShips};

//backlog: check if it has already placed ships #redundant if user places ships on gameboard