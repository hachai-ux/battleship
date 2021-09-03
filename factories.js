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

    const placeShip = (shipLength, y, x, direction) => {
    
        const isPlaceable = _checkPlaceable(shipLength, y, x, direction);
        //outer = y
        //inner = x
        if (isPlaceable === true) {
            const ship = ShipFactory(shipLength);
            if (direction === "horizontal") {
                for (let i = 0; i < shipLength; i++) {
                    
                    coordinates[y][x + i] = {ship: ship, part: i, status: 1};
                
                };
            }
            else if (direction === "vertical") {
                for (let i = 0; i < shipLength; i++) {
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

export { ShipFactory, GameboardFactory };

//backlog:
//hit function to the correct ship