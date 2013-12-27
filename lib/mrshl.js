var tutor = require('tutor');


function getSet(name) {

  tutor.set(name, function (err, set) {
    console.log(JSON.stringify(set));
  });
}

function getCard(name) {
  tutor.card(name, function (err, res) {
    console.log(JSON.stringify(res));
  });
}

function test() {
  getCard('Demonic Tutor');
  getSet('Homelands');
}

module.exports = {
  getCard: getCard,
  getSet: getSet,
  test: test
};