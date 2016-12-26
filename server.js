const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const app = express();
const randomWordFR = require('random-word-fr');
const LePendu = require('./models/lependu');
const URL = 'mongodb://localhost:27017/lependu';

mongoose.connect(URL);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  var lependu = new LePendu();
          lependu.wordToFind = randomWordFR();
          lependu.word = "";

          // save and check for errors
          lependu.save(function(err) {
              if (err)
                  res.send(err);

              console.log('The word to find is created!');
          });
});

app.put('/', (req, res) => {
  console.log(req);
  let mot = lependu.word[0];
  let wordtofind = lependu.wordToFind[0];
  console.log(lependu.wordToFind[0]);
  for ( let letter in wordtofind ) {
    if ( wordtofind[letter] == req.body.chooseLetter) {
      mot.chartAt(letter).replace(req.body.chooseLetter);
    }
  }
  console.log(mot, wordtofind);
});

app.listen(3000, function() {
    console.log('listening on 3000');
});
