const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);
