var jsdom =  require("jsdom");

/**
 * Expects an object of arrays:
 *  {
 *    mythic: [
 *      {card objs .. }
 *    ],
 *
 *  }
 * @param  {[type]} cards [description]
 * @return {[type]}       [description]
 */
function avgPack (cards) {

  var averagePack = avg(cards.M)/8 +  7 * avg(cards.R)/8 +
    3 * avg(cards.U) + 50 * avg(cards.C)/6 + foilAvg(cards)/6;

  return averagePack;
}

function avg(cardList, foil) {
  if (!cardList) {
    return 0.1;
  }
  return cardList.reduce(function (agg, item, ind) {
    return agg + (foil? item.foilPrice : item.price);
  }, 0)/cardList.length;
}

function foilAvg(cards) {
  return avg(cards.M, true)/8 + 7* avg(cards.R, true)/8 + avg(cards.uncommons, true) + avg(cards.commons, true);
}

function test() {
  var cards = {
    M:[{
      price: 10,
      foilPrice: 100
    }, {
      price: 5,
      foilPrice: 20
    }
    ],
    R: [{
      price: 5,
      foilPrice: 10
    }, {
      price: 1,
      foilPrice: 3
    }],
    commons: [{
      price: 0.1,
      foilPrice: 0.35
    }],
    uncommons: [{
      price: 0.35,
      foilPrice: 1
    }]
  };
  console.log(avgPack(cards));


  jsdom.env({
    url: 'http://mtgbro.com/prices/block/ISD/isd',
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      var $ = window.$;
      var sets = [];
      $('.set-prices').each(function(i, set) {
        sets[i] = {};

        $(set).find('.card').each(function(j, card) {
          var cardData = {};
          cardData.price = parseFloat($(card).attr('p'));
          cardData.foilPrice = cardData.price * 1.75;
          cardData.rarity = $(card).find('i').attr('class');
          if (!sets[i][cardData.rarity]) {
            sets[i][cardData.rarity] = [];
          }
          sets[i][cardData.rarity].push(cardData);

        });
      });
      console.log(sets);

      sets.forEach(function( item) {
        console.log(avgPack(item));
      });
    }

    });
}

// test();