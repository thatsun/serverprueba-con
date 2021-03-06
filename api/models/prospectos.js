const mongoose = require('mongoose');


const prospectoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    name: { type: String , require: true },
    lastname: { type: String , require: true },
    lastlastname: { type: String , require: false },
    adress_street:{type: String , require: true },
    adress_number:{type: String , require: true },
    adress_colony:{type: String , require: true },
    adress_cp:{type: String , require: true },
    phonenumber:{type: String , require: true },
    rfc:{type: String , require: true },
    documentsnames:{ type: [String] },
    documentsrequest:{ type: [String] },
    status:{ type: String , require: true },
    reject_details:{type: String , require: true }
});

module.exports= mongoose.model('Prospecto', prospectoSchema);