const {Schema, model} = require('mongoose');

const bemorSchema = new Schema({
    ism: {type: String, required: true},
    familya: {type: String, required: true},
    ochistva: {type: String, required: true},
    yili: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = model('Bemor', bemorSchema);