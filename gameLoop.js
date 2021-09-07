import { PlayerFactory, ComputerFactory, GameboardFactory } from './factories.js';
import { renderGameboard, renderShip } from './domManipulation.js';
//facilitator

const player = PlayerFactory();
const computer = ComputerFactory();
const computerGameboard = GameboardFactory(12);
const playerGameboard = GameboardFactory(12);

computerGameboard.placeShip(3, 0, 0, 'vertical');
player.attack(0, 0, computerGameboard); //hit shot
player.attack(11, 11, computerGameboard); //missed shot
computer.aiAttack(playerGameboard);
computer.aiAttack(playerGameboard);

renderGameboard(10, 'player');
renderGameboard(10, 'computer');

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

const computerourier = ShipFactory(courier.length);
const computerBattleship = ShipFactory(battleship.length);
const computerDestroyer = ShipFactory(destroyer.length);
const computerSubmarine = ShipFactory(submarine.length);
const computerPatrolBoat = ShipFactory(patrolBoat.length);

renderShip(playerCourier, playerGameboard);
renderShip(playerBattleship, playerGameboard);
renderShip(playerDestroyer, playerGameboard);
renderShip(playerSubmarine, playerGameboard);
renderShip(playerPatrolBoat, playerGameboard);

renderShip(computerCourier, computerGameboard);
renderShip(computerBattleship, computerGameboard);
renderShip(computerDestroyer, computerGameboard);
renderShip(computerSubmarine, computerGameboard);
renderShip(computerPatrolBoat, computerGameboard);

