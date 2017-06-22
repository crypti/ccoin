#!/usr/bin/env node
'use strict';
const meow = require('meow');
const ora = require('ora');
const chalk = require('chalk');
const ccoin = require('.');

const spinner = ora('Fetching prices');
spinner.color = 'magenta';

const cli = meow(`
	Usage
	  $ ccoin [fromSymbol] [toSymbols]

	Examples
      $ ccoin BTC ETH,USD,LTC
`);

let values = cli.input;

if (!values || values.length === 0) {
	cli.showHelp();
}

spinner.start();
const from = values.shift().toUpperCase();
const to = values.join(',');

ccoin(from, to)
	.then(prices => {
		spinner.stop();
		console.log(`\n${chalk.cyan(from)} ⇒`);

		prices.forEach((price, index) => {
			const parts = price.split(':');
			const left = index === prices.length - 1 ? '└─' : '├─';
			console.log(`${chalk.gray(left)} ${chalk.yellow(parts[0])}${parts[1]}`);
		});
	});
