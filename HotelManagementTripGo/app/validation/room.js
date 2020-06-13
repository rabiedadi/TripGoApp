let resError = {};

module.exports = {
    roomCreate: function (req, res, next) {
        //need to verify the size of beds

        let verifiedRooms = 0;

        req.body.forEach(room => {
            if (room.hasOwnProperty('roomType') && room.hasOwnProperty('available') && room.hasOwnProperty('roomName')
                && room.hasOwnProperty('smoking') && room.hasOwnProperty('area') && room.hasOwnProperty('roomCount')
                && room.hasOwnProperty('bathRoomCount') && room.hasOwnProperty('livingRoomCount') &&
                room.hasOwnProperty('roomCapacity') && room.hasOwnProperty('price')) {
                if (room.hotel){
                    resError.status = 401; resError.message = 'unauthorized modification'; resError.code = 11;
                    resError.path = 'HotelAPI, auth(V), signUp, unauthorized fields';
                    next(resError);
                }else  {
                    verifiedRooms++;
                }
            } else {
                resError.status = 400; resError.message = 'Data validation Error';
                resError.code = 9; resError.path = 'HotelAPI, hotel(V), roomCreate';
                next(resError);
            }
        });

        if (verifiedRooms === req.body.length){
            req.currentStep = 1;
            next();
        }



    },
};
