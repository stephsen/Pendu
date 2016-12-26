const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lePenduSchema = new Schema({
    wordToFind: String,
    word: String
});

module.exports = mongoose.model('lependu', lePenduSchema);
