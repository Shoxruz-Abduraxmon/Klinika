const {Schema, model} = require('mongoose');

const UserChema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true}
});

module.exports = model('User', UserChema);
    