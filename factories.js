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

const GameboardFactory = () => {

};

export  { ShipFactory, GameboardFactory };