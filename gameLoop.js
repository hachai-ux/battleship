import { PlayerFactory, ComputerFactory, GameboardFactory } from './factories.js';
import { renderGameboard } from './domManipulation.js';
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