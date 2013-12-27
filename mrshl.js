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

// downloadSetLocally if there is no local set
// need a few a
// mergeSet with pricing information
// pass card data in to avaerager

function test() {
  getCard('Demonic Tutor');
  // getSet('Homelands');
}
test();