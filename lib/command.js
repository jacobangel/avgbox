#!/usr/bin/env node

var program = require('commander');

program.version('0.0.0.1')
       .option('-s, --set [type]', 'Add sets')
       .option('-d, --download', 'Download data locally.');

module.exports = program;