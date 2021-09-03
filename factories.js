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
                innerArray.push(0);
            };

            coordinates.push(innerArray);

        };

    };

    const _checkPlaceable = (shipLength, x, y, direction) => {
        let isPlaceable = true;
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
        return isPlaceable;
    }

    const placeShip = (shipLength, x, y, direction) => {

        const isPlaceable = _checkPlaceable(shipLength, x, y, direction);
        //outer = y
        //inner = x
        if (isPlaceable === true) {
            if (direction === "horizontal") {
                for (let i = 0; i < shipLength; i++) {
                    
                    coordinates[y][x+i] = 1;
                };
            }
            else if (direction === "vertical") {
                for (let i = 0; i < shipLength; i++) {
                    coordinates[y+i][x] = 1;
                };
            };
        }
        else return "Can't place here, place somewhere else"
        
    };

    const receiveAttack = () => {

    };

    _createBoard();
    console.log(getCoordinates()[0][0]);

    return { placeShip, receiveAttack, getCoordinates };
};

export  { ShipFactory, GameboardFactory };