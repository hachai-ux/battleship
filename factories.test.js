import { ShipFactory, GameboardFactory } from './factories.js';

describe('Hit ship on first position', () => {
    // Applies only to tests in this describe block
        const testShip = ShipFactory(3);
        testShip.hit(1);

    test('Did hitStatus change on position?', () => {
        expect(testShip.getHitStatus()[1]).toEqual(true);
    });

    test('Is ship hit on second position?', () => {
        expect(testShip.getHitStatus()[2]).toEqual(false);
    });

    test('Is ship sunken?', () => {
        const testShip = ShipFactory(3);
        testShip.hit(1);
        expect(testShip.getSunkStatus()).toEqual(false);
    });

    //didn't test when ship sunken is true yet
});

describe('place ships at specific coordinates on gameboard with size 12x12', () => {
    // Applies only to tests in this describe block
    const gameboard = GameboardFactory(12);
    gameboard.placeShip(1, 1, 'horizontal');

    test('Is the ship placed at specific coordinates?', () => {
        //coordinate array with field objects with isPlaced and isHit properties
        expect(gameboard.coordinates[0][0].isPlaced).toEqual(true);
    });

    test('place ship outside of coordinates', () => {
        expect(gameBoard.placeShip(12,12, vertical)).toEqual("Can't place here, place somewhere else");
    });

    //didn't test when ship sunken is true yet
});

describe('Attack at coordinates with a hit and missed shot', () => {
    // Applies only to tests in this describe block
    const gameboard = GameboardFactory(12);
    gameboard.placeShip(1, 1, 'horizontal');
    gameboard.receiveAttack(1, 1); //hit shot
    gameboard.receiveAttack(12, 12); //missed shot

    test('Is the ship placed at specific coordinates?', () => {
        expect(gameboard.getPlacedShips.coordinates()[0][0]).toEqual(true);
    });

    test('Ship has been hit?', () => {
        expect(gameboard.coordinates[1][1].isHit).toEqual(true);
    });
    test('Missed shot recorded?', () => {
        expect(gameboard.coordinates[12][12].isMissed).toEqual(true);
    });

    test('All ships sunk?', () => {
        expect(gameboard.getAllSunkStatus).toEqual(false);
    });
});

