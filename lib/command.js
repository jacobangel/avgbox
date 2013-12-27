var Command = function(arg) {

  this.parse = function (arg) {
    console.log(JSON.stringify(arg));
  };

};


module.exports = new Command();