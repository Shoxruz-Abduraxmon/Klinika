const {Schema, model} = require('mongoose');

const uzeydSchema = new Schema({
    ism: {type: String, required: true},
    familya: {type: String, required: true},
    ochistva: {type: String, required: true},
    yili: {type: String, required: true},
    tashhisi: {type: String, required: true},
    tavsiya: {type: String, required: true},
    qaytaKoruv: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = model('Uzey', uzeydSchema);

