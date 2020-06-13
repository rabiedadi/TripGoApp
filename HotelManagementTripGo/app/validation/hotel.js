let resError = {};

module.exports = {
    addConfirmedPhone: function(req, res, next){
        if (req.body.hasOwnProperty('phone')){
            next()
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), addConfirmedPhone';
            next(resError);
        }
    },

    basicInfo: function (req, res, next) {
        if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('starsNumber') && req.body.hasOwnProperty('address')
            && req.body.hasOwnProperty('city') && req.body.hasOwnProperty('province') && !req.body.hasOwnProperty('phone')
            && req.body.hasOwnProperty('email') && req.params.hasOwnProperty('realEstate_id')){
            req.currentStep = 0;
            next()
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), basicInfo';
            next(resError);
        }
    },

    installationServices: function (req, res, next) {
        req.currentStep = 2;
        if (req.body.hasOwnProperty('services') && req.body.hasOwnProperty('speakingLanguages') && req.body.hasOwnProperty('parking')
            && req.body.hasOwnProperty('breakfast') && req.params.hasOwnProperty('realEstate_id')){
            next();
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), installationServices';
            next(resError);
        }
    },

    equipment: function (req, res, next) {
        req.currentStep = 3;
        if ((req.body.hasOwnProperty('extraBedCount') || req.body.hasOwnProperty('extraBed') || req.body.hasOwnProperty('otherEquipment'))
            && req.params.hasOwnProperty('realEstate_id')){
            next();
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), equipment';
            next(resError);
        }
    },

    images: function (req, res, next) {
        req.currentStep = 4;
        //still need validation
        if (/*req.body.images && */req.params.hasOwnProperty('realEstate_id')){
            next();
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), images';
            next(resError);
        }
    },

    policy: function (req, res, next) {
        req.currentStep = 5;
        if (req.body.hasOwnProperty('policy') && req.body.hasOwnProperty('checkIn') && req.body.hasOwnProperty('checkOut')
            && req.body.hasOwnProperty('animals') && req.params.hasOwnProperty('realEstate_id')){
            next();
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), policy';
            next(resError);
        }
    },

    payment: function (req, res, next) {
        req.currentStep = 6;
        if (req.body.hasOwnProperty('creditCards') && req.body.hasOwnProperty('invoiceName') && req.params.hasOwnProperty('realEstate_id')){
            next();
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'hotelAPI, hotel(V), payment';
            next(resError);
        }
    },
};
