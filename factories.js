const ShipFactory = (length) => {

    const shipLength = length;
    const hitStatus = [];
    let sunkStatus = false;
    for (let i = 0; i < shipLength; i++){
        hitStatus.push(false);
    };

    const hit = (number) => {
        hitStatus[number] = true;
        //check if it's sunk after ship has been hit
        _isSunk();
    }

    const _isSunk = () => {
        sunkStatus = hitStatus.every(Boolean);
    };


    const getShipLength = () => shipLength;
    const getHitStatus = () => hitStatus;
    const getSunkStatus = () => sunkStatus;

    return { getShipLength, getHitStatus, getSunkStatus, hit};
};

const GameboardFactory = (size) => {
    // 0 = empty
    // 1 = part of a ship
    // 2 = a sunken part of a ship
    // 3 = a missed shot
    const coordinates = [];
    const boardSize = size;
    const getCoordinates = () => coordinates;

    
    const _createBoard = () => {

        //create two-dimensional array for the gameboard coordinates
        for (let i = 0; i < boardSize; i++) {
            const innerArray = [];
            for (var j = 0; j < boardSize; j++) {
                //set status of every board element to 0(empty)
                innerArray.push({status: 0});
            };

            coordinates.push(innerArray);

        };

    };

    const _checkPlaceable = (shipLength, y, x, direction) => {
        let isPlaceable = true;
        //check overflow of board
        if (direction === "horizontal") {
            for (let i = 0; i < shipLength; i++) {
                try {
                    coordinates[y][x + i]
                }
                catch (error) {
                    isPlaceable = false;
                };
                        
            };
        }
        else if (direction === "vertical") {
            for (let i = 0; i < shipLength; i++) {
                //check if coordinates array is defined
                try {
                    coordinates[y + i][x]
                }
                catch (error) {
                    isPlaceable = false;
                };

                
            };
        };
        //check ship overlaps
        return isPlaceable;
    }

    const placeShip = (ship, y, x, direction) => {
    
        const isPlaceable = _checkPlaceable(ship.getShipLength(), y, x, direction);
        //outer = y
        //inner = x
        if (isPlaceable === true) {
            if (direction === "horizontal") {
                for (let i = 0; i < ship.getShipLength(); i++) {
                    
                    coordinates[y][x + i] = {ship: ship, part: i, status: 1};
                
                };
            }
            else if (direction === "vertical") {
                for (let i = 0; i < ship.getShipLength(); i++) {
                    coordinates[y+i][x] = {ship: ship, part: i, status: 1};
                };
            };
        }
        else return "Can't place here, place somewhere else"
        
    };

    const receiveAttack = (y, x) => {

        try {
            if (coordinates[y][x].status === 1) {
                //check status if ship is placed there, than hit ship with the position of the part of the ship
                coordinates[y][x].ship.hit(coordinates[y][x].part);
                //set board status
                coordinates[y][x].status = 2;
            }
            else {
                //set board status to missed if no ship was placed(status not 1)
                coordinates[y][x].status = 3;

            };
        }
        catch (error) {
            //coordinates don't exist
            console.error(error);
            };
       
    };


    _createBoard();

    return { placeShip, receiveAttack, getCoordinates };
};

const PlayerFactory = () => {

    const attack = (y, x, gameboard) => {
        gameboard.receiveAttack(y, x);
    };
    return { attack };
};
    
const ComputerFactory = () => {

    
    const aiAttack = (gameboard) => {
        const gameboardSize = gameboard.getCoordinates().length;
        //coordinates to cycle through array
        const y = _getRandomInt(0, gameboardSize);
        const x = _getRandomInt(0, gameboardSize);
        if (_checkLegal(y, x, gameboard) === true) {
            gameboard.receiveAttack(y, x);
        }
        else {
            //when all fields are 2 or 3 then we have a problem, however the game will probably stop before that
            //not the most elegant solution so far
            aiAttack(gameboard);
        };
       
    };

    const _getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };

    const _checkLegal = (y, x, gameboard) => {
        console.log(y);
        console.log(x);
        console.log(gameboard);
        if (gameboard.getCoordinates()[y][x].status === 3 || gameboard.getCoordinates()[y][x].status === 2) {
            return false;
        }
        else return true;
    };
    
    return {aiAttack};
};

export { ShipFactory, GameboardFactory, PlayerFactory, ComputerFactory };

//backlog:
//hit function to the correct ship