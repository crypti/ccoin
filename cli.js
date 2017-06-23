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
    $ ccoin -f=[fromSymbols] -t=[toSymbols]

	Options
    -f, --from     A comma-delimited list of symbols to convert from
    -t, --to       A comma-delimited list of symbols to convert to

	Examples
    $ ccoin -f=BTC -t=ETH,USD,LTC
    $ ccoin --from=BTC,ETH --to=USD,LTC,EUR
`, {
	alias: {
		f: 'from',
		t: 'to'
	}
});

const input = cli.input;
const flags = cli.flags;

if (input.length > 0 && Object.keys(flags).length > 0) {
	console.log(chalk.magenta('Error:'), 'Remove all spaces in your comma-delimited lists.');
	process.exit(1);
}

if (!flags || Object.keys(flags).length === 0 || !flags.from || !flags.to) {
	cli.showHelp();
}

spinner.start();

ccoin(flags.from, flags.to)
	.then(prices => {
		spinner.stop();

		Object.keys(prices).forEach(from => {
			console.log(`${chalk.cyan(from)} ⇒`);
			prices[from].forEach((price, index) => {
				const parts = price.split(':');
				const left = index === prices[from].length - 1 ? '└─' : '├─';
				console.log(`${chalk.gray(left)} ${chalk.yellow(parts[0])}${parts[1]}`);
			});
		});
	});
