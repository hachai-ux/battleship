import { ShipFactory, PlayerFactory, ComputerFactory, GameboardFactory } from './factories.js';
import { updateField, renderGameboard, showWinner, renderDraggableShips, rotateShips} from './domManipulation.js';
//facilitator

const runGameLoop = (() => {

    const playerID = 'player';
    const computerID = 'computer';
    const player = PlayerFactory();
    const computer = ComputerFactory();
    const computerGameboard = GameboardFactory(10);
    const playerGameboard = GameboardFactory(10);

    const courier = {length: 5};
    const battleship = {length: 4};
    const destroyer = {length: 3};
    const submarine = {length: 3};
    const patrolBoat = { length: 2 };

    const playerCourier = ShipFactory(courier.length);
    const playerBattleship = ShipFactory(battleship.length);
    const playerDestroyer = ShipFactory(destroyer.length);
    const playerSubmarine = ShipFactory(submarine.length);
    const playerPatrolBoat = ShipFactory(patrolBoat.length);

    const computerCourier = ShipFactory(courier.length);
    const computerBattleship = ShipFactory(battleship.length);
    const computerDestroyer = ShipFactory(destroyer.length);
    const computerSubmarine = ShipFactory(submarine.length);
    const computerPatrolBoat = ShipFactory(patrolBoat.length);



     const observeDraggeableShips = () => {

         const dragstart_handler = (ev) => {
             // Add the target element's id to the data transfer object
             console.log(ev.target.childNodes.length);
             ev.dataTransfer.setData("text/plain", ev.target.childNodes.length);
             ev.dataTransfer.dropEffect = "link";
         };

       
    

         const shipContainers = document.querySelectorAll("body>.ship-container");
         console.log(shipContainers);
        // Add the ondragstart event listener
        shipContainers.forEach(shipContainer => {
        shipContainer.addEventListener("dragstart", dragstart_handler);
        });
         
     };
    
   
    
   

    const computerContainer = document.querySelector(`#${computerID}-board`);
    const fields = computerContainer.querySelectorAll('.game-field');
    fields.forEach(field => {
         field.addEventListener('click', () => {
            const y = field.getAttribute('data-y');
            const x = field.getAttribute('data-x');
            
             //check if field has not been attacked yet
             if (computerGameboard.getCoordinates()[y][x].status !== 2) {
                player.attack(y, x, computerGameboard);
             updateField(computerGameboard, computerID, y, x);
             const attackedFields = computer.aiAttack(playerGameboard);
             updateField(playerGameboard, playerID, attackedFields.y, attackedFields.x);
            
             _checkWinCondition();  
             }
            
    
        });
    });

    const _checkWinCondition = () => {
        let computerStatus = false;
        let iterator = 0;
        let shipIterator = 0;

        //count number of ship fields
        computerGameboard.getCoordinates().forEach(row => row.forEach(field => {
            if (typeof field === 'object') {
                if (field.hasOwnProperty('ship')) {
                    shipIterator++;
                }
                
            }
        }));

        computerGameboard.getCoordinates().forEach(row => row.forEach(field => {
            if (typeof field === 'object') {
                if (field.hasOwnProperty('ship')) {
                    if (field.ship.getSunkStatus() === true) {
                        iterator++;
                        if (iterator === shipIterator) {
                            computerStatus = true;
                            };
                    };
                    console.log(field.ship.getSunkStatus());
                }
                
            }
        }));
       
        console.log(computerStatus);

        if (computerStatus === true) {
            showWinner(playerID);

        }

        const playerStatus =  playerGameboard.getCoordinates().every(row => row.every(field => {
            field.ship.getSunkStatus === true;
        }));
        if (playerStatus === true) {
            showWinner(computerID);
        }
    };


      //pre-determined coordinates to test
    playerGameboard.placeShip(playerCourier, 0, 0, 'horizontal');
    playerGameboard.placeShip(playerBattleship, 1, 0, 'horizontal');
    playerGameboard.placeShip(playerDestroyer, 2, 0, 'horizontal');
    playerGameboard.placeShip(playerSubmarine, 3, 0, 'horizontal');
    playerGameboard.placeShip(playerPatrolBoat, 4, 0, 'horizontal');

    computerGameboard.placeShip(computerCourier, 0, 0, 'horizontal');
    computerGameboard.placeShip(computerBattleship, 1, 0, 'horizontal');
    computerGameboard.placeShip(computerDestroyer, 2, 0, 'horizontal');
    computerGameboard.placeShip(computerSubmarine, 3, 0, 'horizontal');
    computerGameboard.placeShip(computerPatrolBoat, 4, 0, 'horizontal');

    renderGameboard(10, playerGameboard, playerID);
    renderGameboard(10, computerGameboard, computerID, '', '');

    renderDraggableShips(courier.length, playerID);
    renderDraggableShips(battleship.length, playerID);
    renderDraggableShips(destroyer.length, playerID);
    renderDraggableShips(submarine.length, playerID);
    renderDraggableShips(patrolBoat.length, playerID);
    rotateShips();
    observeDraggeableShips();

        

    //check win condition
   
    
    //test
    //updateField(computerGameboard, computerID, 0, 0);

    //important, check if ships are overlapped

})();
