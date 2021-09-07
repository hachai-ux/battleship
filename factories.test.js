import { ShipFactory, GameboardFactory, PlayerFactory, ComputerFactory } from './factories.js';

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
    const testShip = ShipFactory(3);
    const testShip2 = ShipFactory(12);
    gameboard.placeShip(testShip, 0, 0, 'vertical');
    test('Is the ship placed at specific coordinates?', () => {
        //coordinate array with field objects with isPlaced and isHit properties
        console.log(gameboard.getCoordinates()[0][0]);
        expect(gameboard.getCoordinates()[0][0]).toHaveProperty("ship");
    });

    test('Can not place ship outside of coordinates', () => {
        expect(gameboard.placeShip(testShip2, 12, 12, "vertical")).toEqual("Can't place here, place somewhere else");
    });
});

describe('Attack at coordinates with a hit and missed shot', () => {
    // Applies only to tests in this describe block
    const gameboard = GameboardFactory(12);
     const testShip = ShipFactory(3);
    gameboard.placeShip(testShip, 0, 0, 'vertical');
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
    const testShip = ShipFactory(3);
    gameboard.placeShip(testShip, 0, 0, 'vertical');
    gameboard.receiveAttack(0, 0); //hit shot
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);


    test('Is ship sunk?', () => {
        expect(gameboard.getCoordinates()[0][0].ship.getSunkStatus()).toEqual(true);
    });
});

describe('Test players taking turns with attacking', () => {
    const computerGameboard = GameboardFactory(12);
    const playerGameboard = GameboardFactory(12);
     const testShip = ShipFactory(3);
    computerGameboard.placeShip(testShip, 0, 0, 'vertical');
    const player = PlayerFactory();
    const computer = ComputerFactory();
    player.attack(0, 0, computerGameboard); //hit shot
    player.attack(11, 11, computerGameboard); //missed shot
    computer.aiAttack(playerGameboard);
    computer.aiAttack(playerGameboard);


    test('Attack hits enemy gameboard(ship has been hit)', () => {
        //only legal if board was not attacked before
        expect(computerGameboard.getCoordinates()[0][0].ship.getHitStatus()[0]).toEqual(true)
    });

    test('Missed shot recorded?', () => {
        expect(computerGameboard.getCoordinates()[11][11].status).toEqual(3);
    });


    test('Did computer hit a gameboard element?', () => {
            //cycle through two-dimensional array then check if status is either 2 or 3(sunken or missed)
        const arrayChecker = (gameboard) => {
            const bool = gameboard.getCoordinates().some(element => element.some(element => element.status === 3 || element.status === 2));
            return bool;
        };

        expect(arrayChecker(playerGameboard)).toEqual(true);

        });


    test('Is attack legal for computer?', () => {
           //gameboard element can't be hit twice, so check if two coordinates are 2 or 3
        const arrayCheckerV2 = (gameboard) => {
            let iterator = 0;
            gameboard.getCoordinates().forEach(element => {
                element.forEach(element => {
                    if (element.status === 3 || element.status === 2) {
                        iterator++;
                    };
                
                });
            });
            return iterator;
          
        };
        //attacked twice
        expect(arrayCheckerV2(playerGameboard)).toEqual(2);
    });

   
});


