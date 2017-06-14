#!/usr/bin/env node
'use strict';
const meow = require('meow');
const ccoin = require('.');

const cli = meow(`
	Usage
	  $ ccoin [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ ccoin
	  unicorns & rainbows
	  $ ccoin ponies
	  ponies & rainbows
`);

console.log(ccoin(cli.input[0] || 'unicorns'));
