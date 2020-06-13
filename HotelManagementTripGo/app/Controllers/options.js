const bedSizeModel = require('../Models/options/bedSize');
const breakfastOptionsModel = require('../Models/options/breakfastOption');
const extraBedForModel = require('../Models/options/extraBedFor');
const otherEquipmentModel = require('../Models/options/otherEquipment');
const parkingOptionsModel = require('../Models/options/parkingOption');
const paymentTimeModel = require('../Models/options/paymentTime');
const roomCustomNameModel = require('../Models/options/roomCustomName');
const roomNameModel = require('../Models/options/roomName');
const roomTypeModel = require('../Models/options/roomType');
const serviceModel = require('../Models/options/service');
const speakingLanguageModel = require('../Models/options/speakingLanguage');
const creditCardModel = require('../Models/options/creditCard');
const platformLanguageModel = require('../Models/configuration/platformLanguage');
const translationModel = require('../Models/configuration/translation');
const hotelModel = require('../Models/hotel');
const roomModel = require('../Models/room');
const userModel = require('../Models/user');




const mongoose = require('mongoose');

module.exports = {
    getAllBedSize: function(req, res, next){
        bedSizeModel.find({language: req.params.language}, function (err, bedSizes) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllBedSize';
                next(err);
            }else {
                res.status(200).json(bedSizes);
            }
        });
    },
    createBedSize: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        bedSizeModel.create(req.body, function (err, bedSize) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createBedSize';
                next(err);
            }else {
                res.status(200).json(bedSize);
            }
        });
    },
    addLanguageBedSize: function(req, res, next){
        req.body.reference = req.params.ref;
        bedSizeModel.create(req.body, function (err, bedSize) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageBedSize';
                next(err);
            }else {
                next();
            }
        });
    },




    getAllBreakfastOptions: function(req, res, next){
        breakfastOptionsModel.find({language: req.params.language}, function (err, breakfastOptions) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllBreakfastOptions';
                next(err);
            }else {
                res.status(200).json(breakfastOptions);
            }
        });
    },
    createBreakfastOption: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        breakfastOptionsModel.create(req.body, function (err, breakfastOption) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createBreakfastOption';
                next(err);
            }else {
                res.status(200).json(breakfastOption);
            }
        });
    },
    addLanguageBreakfastOption: function(req, res, next){
        req.body.reference = req.params.ref;
        breakfastOptionsModel.create(req.body, function (err, breakfastOption) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageBreakfastOption';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllExtraBedsFor: function(req, res, next){
        extraBedForModel.find({language: req.params.language}, null, {sort:{reference: 1 }}, function (err, extraBedsFor) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllExtraBedsFor';
                next(err);
            }else {
                res.status(200).json(extraBedsFor);
            }
        });
    },
    createExtraBedFor: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        extraBedForModel.create(req.body, function (err, extraBedFor) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createExtraBedFor';
                next(err);
            }else {
                res.status(200).json(extraBedFor);
            }
        });
    },
    addLanguageExtraBedFor: function(req, res, next){
        req.body.reference = req.params.ref;
        extraBedForModel.create(req.body, function (err, extraBedFor) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageExtraBedFor';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllOtherEquipment: function(req, res, next){
        otherEquipmentModel.find({language: req.params.language}, function (err, otherEquipments) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllOtherEquipment';
                next(err);
            }else {
                res.status(200).json(otherEquipments);
            }
        });
    },
    createOtherEquipment: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        otherEquipmentModel.create(req.body, function (err, otherEquipment) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createOtherEquipment';
                next(err);
            }else {
                res.status(200).json(otherEquipment);
            }
        });
    },
    addLanguageOtherEquipment: function(req, res, next){
        req.body.reference = req.params.ref;
        otherEquipmentModel.create(req.body, function (err, otherEquipment) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageOtherEquipment';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllParkingOptions: function(req, res, next){
        parkingOptionsModel.find({language: req.params.language}, function (err, parkingOptions) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllParkingOptions';
                next(err);
            }else {
                res.status(200).json(parkingOptions);
            }
        });
    },
    createParkingOption: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        parkingOptionsModel.create(req.body, function (err, parkingOption) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createParkingOption';
                next(err);
            }else {
                res.status(200).json(parkingOption);
            }
        });
    },
    addLanguageParkingOption: function(req, res, next){
        req.body.reference = req.params.ref;
        parkingOptionsModel.create(req.body, function (err, parkingOption) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageParkingOption';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllPaymentTimes: function(req, res, next){
        paymentTimeModel.find({language: req.params.language}, function (err, paymentTimes) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllPaymentTimes';
                next(err);
            }else {
                res.status(200).json(paymentTimes);
            }
        });
    },
    createPaymentTime: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        paymentTimeModel.create(req.body, function (err, paymentTime) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createPaymentTime';
                next(err);
            }else {
                res.status(200).json(paymentTime);
            }
        });
    },
    addLanguagePaymentTime: function(req, res, next){
        req.body.reference = req.params.ref;
        paymentTimeModel.create(req.body, function (err, paymentTime) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguagePaymentTime';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllRoomCustomNames: function(req, res, next){
        roomCustomNameModel.find({language: req.params.language}, function (err, roomCustomNames) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllRoomCustomNames';
                next(err);
            }else {
                res.status(200).json(roomCustomNames);
            }
        });
    },
    createRoomCustomName: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        roomCustomNameModel.create(req.body, function (err, roomCustomName) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createRoomCustomName';
                next(err);
            }else {
                res.status(200).json(roomCustomName);
            }
        });
    },
    addLanguageRoomCustomName: function(req, res, next){
        req.body.reference = req.params.ref;
        roomCustomNameModel.create(req.body, function (err, roomCustomName) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageRoomCustomName';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllRoomNames: function(req, res, next){
        roomNameModel.find({language: req.params.language}, function (err, roomNames) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllRoomNames';
                next(err);
            }else {
                res.status(200).json(roomNames);
            }
        });
    },
    createRoomName: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        roomNameModel.create(req.body, function (err, roomName) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllRoomNames';
                next(err);
            }else {
                res.status(200).json(roomName);
            }
        });
    },
    addLanguageRoomName: function(req, res, next){
        req.body.reference = req.params.ref;
        roomNameModel.create(req.body, function (err, roomName) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageRoomName';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllRoomTypes: function(req, res, next){
        roomTypeModel.find({language: req.params.language}, function (err, roomTypes) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllRoomTypes';
                next(err);
            }else {
                res.status(200).json(roomTypes);
            }
        });
    },
    createRoomType: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        roomTypeModel.create(req.body, function (err, roomType) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createRoomType';
                next(err);
            }else {
                res.status(200).json(roomType);
            }
        });
    },
    addLanguageRoomType: function(req, res, next){
        req.body.reference = req.params.ref;
        roomTypeModel.create(req.body, function (err, roomCustomName) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageRoomType';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllServices: function(req, res, next){
        serviceModel.find({language: req.params.language}, function (err, services) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllServices';
                next(err);
            }else {
                res.status(200).json(services);
            }
        });
    },
    createService: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        serviceModel.create(req.body, function (err, service) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createService';
                next(err);
            }else {
                res.status(200).json(service);
            }
        });
    },
    addLanguageService: function(req, res, next){
        req.body.reference = req.params.ref;
        serviceModel.create(req.body, function (err, service) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageService';
                next(err);
            }else {
                next();
            }
        });
    },



    getAllSpeakingLanguages: function(req, res, next){
        speakingLanguageModel.find({language: req.params.language}, function (err, speakingLanguages) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllSpeakingLanguage';
                next(err);
            }else {
                res.status(200).json(speakingLanguages);
            }
        });
    },
    createSpeakingLanguage: function(req, res, next){
        req.body.reference = mongoose.Types.ObjectId();
        speakingLanguageModel.create(req.body, function (err, speakingLanguage) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createSpeakingLanguage';
                next(err);
            }else {
                res.status(200).json(speakingLanguage);
            }
        });
    },
    addLanguageSpeakingLanguage: function(req, res, next){
        req.body.reference = req.params.ref;
        speakingLanguageModel.create(req.body, function (err, speakingLanguage) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => addLanguageSpeakingLanguage';
                next(err);
            }else {
                next();
            }
        });
    },




    getAllCreditCards: function(req, res, next){
        creditCardModel.find({}, function (err, creditCards) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => getAllCreditCards';
                next(err);
            }else {
                res.status(200).json(creditCards);
            }
        });
    },
    createCreditCard: function(req, res, next){
        creditCardModel.create(req.body, function (err, creditCard) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'options => createCreditCard';
                next(err);
            }else {
                res.status(200).json(creditCard);
            }
        });
    },

    addTranslation: function(req, res, next){
        translationModel.create({name: req.body.reference, trans: req.body.name, language: req.body.language}, function (err, result) {
            res.status(200).json(result);
        });
    },

    initiate:function (req, res, next) {
        platformLanguageModel.create({_id:"5e09b0b9cbf27838d859dc3f", abbreviation:"EN"}, function (err, result) {if (err) console.log(err)});
        platformLanguageModel.create({_id:"5e09b0b9cbf27838d859dc2f", abbreviation:"FR"}, function (err, result) {if (err) console.log(err)});

        bedSizeModel.create({name:"Lit simple", language:"FR", height: 190, width: 80, reference:"Single bed"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        bedSizeModel.create({name:"Lit à deux", language:"FR", height: 190, width: 80, reference:"Double bed"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        breakfastOptionsModel.create({name:"OUI, inclus dans le prix", language: "FR", reference:"YES, included in the price"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        breakfastOptionsModel.create({name:"NON, n'est pas inclus dans le prix", language: "FR", reference:"NO, is not included in the price"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        breakfastOptionsModel.create({name:"N'est pas disponible", language: "FR", reference:"Is not available"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        extraBedForModel.create({name:"Enfant jusqu'à 2 ans dans des berceaux", language:  "FR", reference:"Child up to 2 years old in cradles"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        extraBedForModel.create({name:"Enfants", language:  "FR", reference:"Children"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        extraBedForModel.create({name:"Adults", language:  "FR", reference:"Adults"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        otherEquipmentModel.create({name: "Climatisation", language: "FR", reference:"Air conditioner"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Ecran TV Plat", language: "FR", reference:"Plasma TV"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Vue sur mer", language: "FR", reference:"Sea view"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Balcon", language: "FR", reference:"Balcony"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Terrasse", language: "FR", reference:"Terrace"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Lecteur DVD", language: "FR", reference:"DVD player"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        otherEquipmentModel.create({name: "Chaines satellites", language: "FR", reference:"Satellite channels"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        parkingOptionsModel.create({name: "Oui, gratuit", language: "FR", reference:"Yes, free"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        parkingOptionsModel.create({name: "Oui, (n'est pas gratuit)", language: "FR", reference:"Yes, (is not free)"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        parkingOptionsModel.create({name: "Non, n'est pas disponible", language: "FR", reference:"No, is not available"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        paymentTimeModel.create({name: "A l'arrivé", language: "FR", reference:"On arrival"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        paymentTimeModel.create({name: "Lors de la réservation", language: "FR", reference:"When booking"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        roomCustomNameModel.create({name: "Chambre moderne", language: "FR", reference:"Modern bedroom"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        roomCustomNameModel.create({name: "Chambre de luxe", language: "FR", reference:"Deluxe suite"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        roomNameModel.create({name: "Chambre à coucher", language: "FR", reference:"Bedroom"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        roomNameModel.create({name: "Suite d'hôtel", language: "FR", reference:"Hotel suite"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        roomTypeModel.create({name: "Simple", language: "FR", reference:"Simple"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        roomTypeModel.create({name: "Duplexe", language: "FR", reference:"Duplex"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        serviceModel.create({name: "Wifi gratuit", language: "FR", reference:"Free WIFI"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Restaurant", language: "FR", reference:"Restaurant"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Service de chambre", language: "FR", reference:"Room service"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Reception 24/24", language: "FR", reference:"Restaurant"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Sauna", language: "FR", reference:"Sauna"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Sale de sport", language: "FR", reference:"Gym"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Transport aéroport", language: "FR", reference:"Airport transportation"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Climatisation", language: "FR", reference:"Air conditioner"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Piscine", language: "FR", reference:"Swimming pool"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Chambre fumeurs", language: "FR", reference:"Smoking room"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        serviceModel.create({name: "Chambre non fumeurs", language: "FR", reference:"Non smoking room"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});

        speakingLanguageModel.create({name: "Arabe", language: "FR", reference:"Arabic"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        speakingLanguageModel.create({name: "Français", language: "FR", reference:"French"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});
        speakingLanguageModel.create({name: "Anglais", language: "FR", reference:"English"}, function (err, result) {if (err) console.log(err); else translationModel.create({name: result.reference, trans: result.name, language: result.language}, function (err, result) {});});



        bedSizeModel.create({name:"Single bed", language:"EN", height: 190, width: 80, reference:"Single bed"}, function (err, result) {if (err) console.log(err)});
        bedSizeModel.create({name:"Double bed", language:"EN", height: 190, width: 80, reference:"Double bed"}, function (err, result) {if (err) console.log(err)});

        breakfastOptionsModel.create({name:"YES, included in the price", language: "EN", reference:"YES, included in the price"}, function (err, result) {if (err) console.log(err)});
        breakfastOptionsModel.create({name:"NO, is not included in the price", language: "EN", reference:"NO, is not included in the price"}, function (err, result) {if (err) console.log(err)});
        breakfastOptionsModel.create({name:"Is not available", language: "EN", reference:"Is not available"}, function (err, result) {if (err) console.log(err)});

        extraBedForModel.create({name:"Child up to 2 years old in cradles", language:  "EN", reference:"Child up to 2 years old in cradles"}, function (err, result) {if (err) console.log(err)});
        extraBedForModel.create({name:"Children", language:  "EN", reference:"Children"}, function (err, result) {if (err) console.log(err)});
        extraBedForModel.create({name:"Adults", language:  "EN", reference:"Adults"}, function (err, result) {if (err) console.log(err)});

        otherEquipmentModel.create({name: "Air conditioner", language: "EN", reference:"Air conditioner"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "Plasma TV", language: "EN", reference:"Plasma TV"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "Sea view", language: "EN", reference:"Sea view"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "Balcony", language: "EN", reference:"Balcony"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "Terrace", language: "EN", reference:"Terrace"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "DVD player", language: "EN", reference:"DVD player"}, function (err, result) {if (err) console.log(err)});
        otherEquipmentModel.create({name: "Satellite channels", language: "EN", reference:"Satellite channels"}, function (err, result) {if (err) console.log(err)});

        parkingOptionsModel.create({name: "Yes, free", language: "EN", reference:"Yes, free"}, function (err, result) {if (err) console.log(err)});
        parkingOptionsModel.create({name: "Yes, (is not free)", language: "EN", reference:"Yes, (is not free)"}, function (err, result) {if (err) console.log(err)});
        parkingOptionsModel.create({name: "No, is not available", language: "EN", reference:"No, is not available"}, function (err, result) {if (err) console.log(err)});

        paymentTimeModel.create({name: "On arrival", language: "EN", reference:"On arrival"}, function (err, result) {if (err) console.log(err)});
        paymentTimeModel.create({name: "When booking", language: "EN", reference:"When booking"}, function (err, result) {if (err) console.log(err)});

        roomCustomNameModel.create({name: "Modern bedroom", language: "EN", reference:"Modern bedroom"}, function (err, result) {if (err) console.log(err)});
        roomCustomNameModel.create({name: "Deluxe suite", language: "EN", reference:"Deluxe suite"}, function (err, result) {if (err) console.log(err)});

        roomNameModel.create({name: "Bedroom", language: "EN", reference:"Bedroom"}, function (err, result) {if (err) console.log(err)});
        roomNameModel.create({name: "Hotel suite", language: "EN", reference:"Hotel suite"}, function (err, result) {if (err) console.log(err)});

        roomTypeModel.create({name: "Simple", language: "EN", reference:"Simple"}, function (err, result) {if (err) console.log(err)});
        roomTypeModel.create({name: "Duplex", language: "EN", reference:"Duplex"}, function (err, result) {if (err) console.log(err)});

        serviceModel.create({name: "Free WIFI", language: "EN", reference:"Free WIFI"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Restaurant", language: "EN", reference:"Restaurant"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Room service", language: "EN", reference:"Room service"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Reception 24/24", language: "EN", reference:"Reception 24/24"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Sauna", language: "EN", reference:"Sauna"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Gym", language: "EN", reference:"Gym"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Airport transportation", language: "EN", reference:"Airport transportation"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Air conditioner", language: "EN", reference:"Air conditioner"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Swimming pool", language: "EN", reference:"Swimming pool"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Smoking room", language: "EN", reference:"Smoking room"}, function (err, result) {if (err) console.log(err)});
        serviceModel.create({name: "Non smoking room", language: "EN", reference:"Non smoking room"}, function (err, result) {if (err) console.log(err)});

        speakingLanguageModel.create({name: "Arabic", language: "EN", reference:"Arabic"}, function (err, result) {if (err) console.log(err)});
        speakingLanguageModel.create({name: "French", language: "EN", reference:"French"}, function (err, result) {if (err) console.log(err)});
        speakingLanguageModel.create({name: "English", language: "EN", reference:"English"}, function (err, result) {if (err) console.log(err)});



        creditCardModel.create({name: "Visa Card"}, function (err, result) {if (err) console.log(err)});
        creditCardModel.create({name: "Master Card"}, function (err, result) {if (err) console.log(err)});
        creditCardModel.create({name: "Diners club"}, function (err, result) {if (err) console.log(err)});
        creditCardModel.create({name: "American express"}, function (err, result) {if (err) console.log(err)});



        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a600"), name:"Ibis", starsNumber:4, address:"Avenue De Canastel, Route Des Falaises", city:"Oran", province:"Oran", phone:"550505050", email:"contact@ibis.com", services:["Free WIFI", "Restaurant", "Sauna", "Gym", "Air conditioner", "Smoking room"], parking:"Yes, free", breakfast:"YES, included in the price", speakingLanguage:["Arabic", "French", "English"], extraBedCount:"1", extraBed:[{for:"Child up to 2 years old in cradles", price: 5000}], otherEquipment: ["Air conditioner", "Sea view", "Terrace", "Satellite channels"], images:["/images/5edfdea8b920270019e9a600/first.jpg", "/images/5edfdea8b920270019e9a600/20200115_045802.jpg", "/images/5edfdea8b920270019e9a600/20200115_045803.jpg", "/images/5edfdea8b920270019e9a600/20200115_045804.jpg", "/images/5edfdea8b920270019e9a600/20200115_045805.jpg", "/images/5edfdea8b920270019e9a600/20200115_045806.jpg", "/images/5edfdea8b920270019e9a600/20200115_045807.jpg", "/images/5edfdea8b920270019e9a600/20200115_045808.jpg", "/images/5edfdea8b920270019e9a600/20200115_045809.jpg", "/images/5edfdea8b920270019e9a600/20200115_045810.jpg", "/images/5edfdea8b920270019e9a600/20200115_045811.jpg", "/images/5edfdea8b920270019e9a600/20200115_045812.jpg", "/images/5edfdea8b920270019e9a600/20200115_045813.jpg", "/images/5edfdea8b920270019e9a600/20200115_045814.jpg", "/images/5edfdea8b920270019e9a600/20200115_045815.jpg", "/images/5edfdea8b920270019e9a600/20200115_045816.jpg", "/images/5edfdea8b920270019e9a600/20200115_045817.jpg", "/images/5edfdea8b920270019e9a600/20200115_045818.jpg", "/images/5edfdea8b920270019e9a600/20200115_045819.jpg"], policy: {cancelingDays: 5, paymentTime:"On arrival"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"Ibis", rooms:["5edfdea8b920270019e9a606", "5edfdea8b920270019e9a607"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a618"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"hamidi oussama", Date:Date.now(), text:"good hotel"}]}, function (err, result) {if (err) console.log(err)});
        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a601"), name:"sheraton", starsNumber:4, address:"Route des Falaises, Avenue Djellat Habib", city:"Oran", province:"Oran", phone:"550505050", email:"contact@sheraton.com", services:["Free WIFI", "Restaurant", "Airport transportation", "Gym", "Air conditioner", "Swimming pool"], parking:"Yes, (is not free)", breakfast:"NO, is not included in the price", speakingLanguage:["Arabic", "French"], extraBedCount:"1", extraBed:[{for:"Children", price: 0}], otherEquipment: ["Plasma TV", "Balcony", "DVD player"], images:["/images/5edfdea8b920270019e9a601/20200115_045801.jpg", "/images/5edfdea8b920270019e9a601/first.jpg", "/images/5edfdea8b920270019e9a601/20200115_045803.jpg", "/images/5edfdea8b920270019e9a601/20200115_045804.jpg", "/images/5edfdea8b920270019e9a601/20200115_045805.jpg", "/images/5edfdea8b920270019e9a601/20200115_045806.jpg", "/images/5edfdea8b920270019e9a601/20200115_045807.jpg", "/images/5edfdea8b920270019e9a601/20200115_045808.jpg", "/images/5edfdea8b920270019e9a601/20200115_045809.jpg", "/images/5edfdea8b920270019e9a601/20200115_045810.jpg", "/images/5edfdea8b920270019e9a601/20200115_045811.jpg", "/images/5edfdea8b920270019e9a601/20200115_045812.jpg", "/images/5edfdea8b920270019e9a601/20200115_045813.jpg", "/images/5edfdea8b920270019e9a601/20200115_045814.jpg", "/images/5edfdea8b920270019e9a601/20200115_045815.jpg", "/images/5edfdea8b920270019e9a601/20200115_045816.jpg", "/images/5edfdea8b920270019e9a601/20200115_045817.jpg", "/images/5edfdea8b920270019e9a601/20200115_045818.jpg", "/images/5edfdea8b920270019e9a601/20200115_045819.jpg"], policy: {cancelingDays: 6, paymentTime:"When booking"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"sheraton", rooms:["5edfdea8b920270019e9a608", "5edfdea8b920270019e9a609"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a619"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"daddi baba rabie", Date:Date.now(), text:"bad hotel"}]}, function (err, result) {if (err) console.log(err)});
        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a602"), name:"Dar El Ikram", starsNumber:3, address:"24 Rue Nezzar, Kbaili Aissa 16000", city:"Alger", province:"Alger", phone:"550505050", email:"contact@DarElIkram.com", services:["Free WIFI", "Restaurant", "Sauna", "Gym", "Air conditioner", "Smoking room"], parking:"No, is not available", breakfast:"Is not available", speakingLanguage:["Arabic", "French", "English"], extraBedCount:"1", extraBed:[{for:"Adults", price: 6000}], otherEquipment: ["Air conditioner", "Sea view", "Terrace", "Satellite channels"], images:["/images/5edfdea8b920270019e9a602/20200115_045801.jpg", "/images/5edfdea8b920270019e9a602/20200115_045802.jpg", "/images/5edfdea8b920270019e9a602/first.jpg", "/images/5edfdea8b920270019e9a602/20200115_045804.jpg", "/images/5edfdea8b920270019e9a602/20200115_045805.jpg", "/images/5edfdea8b920270019e9a602/20200115_045806.jpg", "/images/5edfdea8b920270019e9a602/20200115_045807.jpg", "/images/5edfdea8b920270019e9a602/20200115_045808.jpg", "/images/5edfdea8b920270019e9a602/20200115_045809.jpg", "/images/5edfdea8b920270019e9a602/20200115_045810.jpg", "/images/5edfdea8b920270019e9a602/20200115_045811.jpg", "/images/5edfdea8b920270019e9a602/20200115_045812.jpg", "/images/5edfdea8b920270019e9a602/20200115_045813.jpg", "/images/5edfdea8b920270019e9a602/20200115_045814.jpg", "/images/5edfdea8b920270019e9a602/20200115_045815.jpg", "/images/5edfdea8b920270019e9a602/20200115_045816.jpg", "/images/5edfdea8b920270019e9a602/20200115_045817.jpg", "/images/5edfdea8b920270019e9a602/20200115_045818.jpg", "/images/5edfdea8b920270019e9a602/20200115_045819.jpg"], policy: {cancelingDays: 10, paymentTime:"On arrival"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"Dar El Ikram", rooms:["5edfdea8b920270019e9a60a", "5edfdea8b920270019e9a60b"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a61a"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"hamidi oussama", Date:Date.now(), text:"good hotel"}]}, function (err, result) {if (err) console.log(err)});
        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a603"), name:"Radisson Blu Hotel", starsNumber:5, address:"Lotissement Moutchachou Lot BD 11", city:"Hydra", province:"Alger", phone:"550505050", email:"contact@RBH.com", services:["Free WIFI", "Restaurant", "Sauna", "Reception 24/24", "Air conditioner", "Smoking room"], parking:"Yes, free", breakfast:"YES, included in the price", speakingLanguage:["Arabic", "French", "English"], extraBedCount:"1", extraBed:[{for:"Child up to 2 years old in cradles", price: 3000}], otherEquipment: ["Plasma TV", "Balcony", "DVD player"], images:["/images/5edfdea8b920270019e9a603/20200115_045801.jpg", "/images/5edfdea8b920270019e9a603/20200115_045802.jpg", "/images/5edfdea8b920270019e9a603/20200115_045803.jpg", "/images/5edfdea8b920270019e9a603/first.jpg", "/images/5edfdea8b920270019e9a603/20200115_045805.jpg", "/images/5edfdea8b920270019e9a603/20200115_045806.jpg", "/images/5edfdea8b920270019e9a603/20200115_045807.jpg", "/images/5edfdea8b920270019e9a603/20200115_045808.jpg", "/images/5edfdea8b920270019e9a603/20200115_045809.jpg", "/images/5edfdea8b920270019e9a603/20200115_045810.jpg", "/images/5edfdea8b920270019e9a603/20200115_045811.jpg", "/images/5edfdea8b920270019e9a603/20200115_045812.jpg", "/images/5edfdea8b920270019e9a603/20200115_045813.jpg", "/images/5edfdea8b920270019e9a603/20200115_045814.jpg", "/images/5edfdea8b920270019e9a603/20200115_045815.jpg", "/images/5edfdea8b920270019e9a603/20200115_045816.jpg", "/images/5edfdea8b920270019e9a603/20200115_045817.jpg", "/images/5edfdea8b920270019e9a603/20200115_045818.jpg", "/images/5edfdea8b920270019e9a603/20200115_045819.jpg"], policy: {cancelingDays: 15, paymentTime:"When booking"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"Radisson Blu", rooms:["5edfdea8b920270019e9a60c", "5edfdea8b920270019e9a60d"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a6ab"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"daddi baba rabie", Date:Date.now(), text:"bad hotel"}]}, function (err, result) {if (err) console.log(err)});
        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a604"), name:"HOTEL SAMIR", starsNumber:2, address:"74 Rue Didouche Mourad", city:"Alger", province:"Alger", phone:"550505050", email:"contact@SamirHotel.com", services:["Free WIFI", "Restaurant", "Sauna", "Gym", "Reception 24/24", "Smoking room", "Swimming pool"], parking:"Yes, (is not free)", breakfast:"NO, is not included in the price", speakingLanguage:["Arabic", "French"], extraBedCount:"1", extraBed:[{for:"Children", price: 0}], otherEquipment: ["Air conditioner", "Sea view", "Terrace", "Satellite channels"], images:["/images/5edfdea8b920270019e9a604/20200115_045801.jpg", "/images/5edfdea8b920270019e9a604/20200115_045802.jpg", "/images/5edfdea8b920270019e9a604/20200115_045803.jpg", "/images/5edfdea8b920270019e9a604/20200115_045804.jpg", "/images/5edfdea8b920270019e9a604/first.jpg", "/images/5edfdea8b920270019e9a604/20200115_045806.jpg", "/images/5edfdea8b920270019e9a604/20200115_045807.jpg", "/images/5edfdea8b920270019e9a604/20200115_045808.jpg", "/images/5edfdea8b920270019e9a604/20200115_045809.jpg", "/images/5edfdea8b920270019e9a604/20200115_045810.jpg", "/images/5edfdea8b920270019e9a604/20200115_045811.jpg", "/images/5edfdea8b920270019e9a604/20200115_045812.jpg", "/images/5edfdea8b920270019e9a604/20200115_045813.jpg", "/images/5edfdea8b920270019e9a604/20200115_045814.jpg", "/images/5edfdea8b920270019e9a604/20200115_045815.jpg", "/images/5edfdea8b920270019e9a604/20200115_045816.jpg", "/images/5edfdea8b920270019e9a604/20200115_045817.jpg", "/images/5edfdea8b920270019e9a604/20200115_045818.jpg", "/images/5edfdea8b920270019e9a604/20200115_045819.jpg"], policy: {cancelingDays: 12, paymentTime:"On arrival"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"SAMIR", rooms:["5edfdea8b920270019e9a60e", "5edfdea8b920270019e9a60f"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a61c"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"hamidi oussama", Date:Date.now(), text:"good hotel"}]}, function (err, result) {if (err) console.log(err)});
        hotelModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a605"), name:"AZ Hotel Kouba", starsNumber:3, address:"Ave Rabia Mohamed", city:"Kouba", province:"Alger", phone:"550505050", email:"contact@AHK.com", services:["Free WIFI", "Restaurant", "Sauna", "Gym", "Air conditioner", "Reception 24/24", "Swimming pool"], parking:"No, is not available", breakfast:"Is not available", speakingLanguage:["Arabic", "French", "English"], extraBedCount:"1", extraBed:[{for:"Adults", price: 8000}], otherEquipment: ["Plasma TV", "Balcony", "DVD player"], images:["/images/5edfdea8b920270019e9a605/20200115_045801.jpg", "/images/5edfdea8b920270019e9a605/20200115_045802.jpg", "/images/5edfdea8b920270019e9a605/20200115_045803.jpg", "/images/5edfdea8b920270019e9a605/20200115_045804.jpg", "/images/5edfdea8b920270019e9a605/20200115_045805.jpg", "/images/5edfdea8b920270019e9a605/first.jpg", "/images/5edfdea8b920270019e9a605/20200115_045807.jpg", "/images/5edfdea8b920270019e9a605/20200115_045808.jpg", "/images/5edfdea8b920270019e9a605/20200115_045809.jpg", "/images/5edfdea8b920270019e9a605/20200115_045810.jpg", "/images/5edfdea8b920270019e9a605/20200115_045811.jpg", "/images/5edfdea8b920270019e9a605/20200115_045812.jpg", "/images/5edfdea8b920270019e9a605/20200115_045813.jpg", "/images/5edfdea8b920270019e9a605/20200115_045814.jpg", "/images/5edfdea8b920270019e9a605/20200115_045815.jpg", "/images/5edfdea8b920270019e9a605/20200115_045816.jpg", "/images/5edfdea8b920270019e9a605/20200115_045817.jpg", "/images/5edfdea8b920270019e9a605/20200115_045818.jpg", "/images/5edfdea8b920270019e9a605/20200115_045819.jpg"], policy: {cancelingDays: 10, paymentTime:"When booking"}, checkIn:{from:9, to: 15}, checkOut:{from:11, to: 13}, animals: false, creditCards: ["Visa Card", "Master Card"], invoiceName:"AZ Hotel Kouba", rooms:["5edfdea8b920270019e9a610", "5edfdea8b920270019e9a611"], userGroup_id: mongoose.Types.ObjectId("5edfdea8b920270019e9a61d"), creationStep: 7, phoneConfirmed:true, globalNote:9, serviceScore:{score:8, betterThen:80}, staffScore:{score:8, betterThen:80}, mailServiceScore:{score:8, betterThen:80}, locationScore:{score:8, betterThen:80}, lessExpensiveThan:80, offersNumber:0, roomsNumber:0, roomTypeNumber:0, comments:[{fullName:"daddi baba rabie", Date:Date.now(), text:"bad hotel"}]}, function (err, result) {if (err) console.log(err)});

        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a606"), roomType:"Simple", available:2, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a600")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a607"), roomType:"Duplex", available:3, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a600")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a608"), roomType:"Simple", available:7, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a601")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a609"), roomType:"Duplex", available:5, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a601")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60a"), roomType:"Simple", available:4, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a602")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60b"), roomType:"Duplex", available:3, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a602")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60c"), roomType:"Simple", available:3, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a603")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60d"), roomType:"Duplex", available:5, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a603")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60e"), roomType:"Simple", available:8, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a604")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a60f"), roomType:"Duplex", available:7, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a604")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a610"), roomType:"Simple", available:6, roomName:"Bedroom", roomCustomName:"Modern bedroom", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Single bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a605")}, function (err) {if (err) console.log(err)})
        roomModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a611"), roomType:"Duplex", available:7, roomName:"Hotel suite", roomCustomName:"Deluxe suite", smoking:true, area: 18, roomCount: 2, livingRoomCount: 1, bathRoomCount: 1, beds:[{bedSize:"Double bed", bedCount:3}], roomCapacity:5, price: 1500, hotel: mongoose.Types.ObjectId("5edfdea8b920270019e9a605")}, function (err) {if (err) console.log(err)})

        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a612"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a618")}, function (err) {if (err) console.log(err)})
        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a613"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a619")}, function (err) {if (err) console.log(err)})
        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a614"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a61a")}, function (err) {if (err) console.log(err)})
        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a615"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a61b")}, function (err) {if (err) console.log(err)})
        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a616"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a61c")}, function (err) {if (err) console.log(err)})
        userModel.create({_id:mongoose.Types.ObjectId("5edfdea8b920270019e9a617"), group:mongoose.Types.ObjectId("5edfdea8b920270019e9a61d")}, function (err) {if (err) console.log(err)})

        // fs.mkdirSync(__dirname, '../public');
        // fs.mkdirSync(__dirname, '../public/images');


        res.status(200).json({message: "success"});
    },




};
