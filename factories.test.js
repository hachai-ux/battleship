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
    gameboard.placeShip(3, 0, 0, 'vertical');
    test('Is the ship placed at specific coordinates?', () => {
        //coordinate array with field objects with isPlaced and isHit properties
        console.log(gameboard.getCoordinates()[0][0]);
        expect(gameboard.getCoordinates()[0][0]).toHaveProperty("ship");
    });

    test('Can not place ship outside of coordinates', () => {
        expect(gameboard.placeShip(12, 12, 12, "vertical")).toEqual("Can't place here, place somewhere else");
    });
});

describe('Attack at coordinates with a hit and missed shot', () => {
    // Applies only to tests in this describe block
    const gameboard = GameboardFactory(12);
    gameboard.placeShip(3, 0, 0, 'vertical');
    gameboard.receiveAttack(0, 0); //hit shot
    gameboard.receiveAttack(11, 11); //missed shot


    test('Ship has been hit?', () => {
        expect(gameboard.getCoordinates()[0][0].ship.getHitStatus()[0]).toEqual(true);
    });

    test('Ship hasnt been hit on second position, right?', () => {
         //you can get the ship with either coordinates, the ship is placed on all three coordinates
        expect(gameboard.getCoordinates()[0][0].ship.getHitStatus()[1]).toEqual(false);
    });
    test('Missed shot recorded?', () => {
        expect(gameboard.getCoordinates()[11][11].status).toEqual(3);
    });

    test('Is ship sunk?', () => {
        expect(gameboard.getCoordinates()[0][0].ship.getSunkStatus()).toEqual(false);
    });
});


describe('Test when all parts of ship are sunk', () => {
    // Applies only to tests in this describe block
    const gameboard = GameboardFactory(12);
    gameboard.placeShip(3, 0, 0, 'vertical');
    gameboard.receiveAttack(0, 0); //hit shot
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);


    test('Is ship sunk?', () => {
        expect(gameboard.getCoordinates()[0][0].ship.getSunkStatus()).toEqual(true);
    });
});

describe('Test players taking turns with attacking', () => {
    //computerFactory inherits from playerFactory?
    const player = PlayerFactory();
    const computer = ComputerFactory();
    player.attack(0, 0); //hit shot
    computer.aiAttack();


    test('Is attack legal for player?', () => {
        //only legal if board was not attacked before
        expect().toEqual(true);
    });


    test('Is attack legal for computer?', () => {
           //only legal if board was not attacked before
        expect().toEqual(true);
    });


    test('Was player attacked?', () => {
    //check board for changed status
    expect().toEqual(true);
    });


    test('Was player attacked?', () => {
    //check board for changed status
    expect().toEqual(true);
    });
});


