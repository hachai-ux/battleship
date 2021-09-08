import { ShipFactory, PlayerFactory, ComputerFactory, GameboardFactory } from './factories.js';
import { observeFields, renderGameboard} from './domManipulation.js';
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
    renderGameboard(10, computerGameboard, computerID);
    observeFields(computerID);

    const playerTurn = false;
    const computerTurn = false;

    
    //test
    //updateField(computerGameboard, computerID, 0, 0);

    //important, check if ships are overlapped

})();
