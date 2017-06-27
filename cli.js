#!/usr/bin/env node
/* eslint brace-style:0 */
'use strict';
const fs = require('fs');
const meow = require('meow');
const ora = require('ora');
const chalk = require('chalk');
const empty = require('is-empty');

const saveProfile = require('./bin/save-profile');
const removeProfile = require('./bin/remove-profile');
const profilePath = require('./bin/profile-path');
const ccoin = require('.');

const spinner = ora('Fetching prices');
spinner.color = 'magenta';

const cli = meow(`
	Usage
    $ ccoin [Commands]
    $ ccoin -f=[fromSymbols] -t=[toSymbols] [options]

	Commands
    ls                 List all saved profiles
    [profile name]     Load the given profile by name

	Options
    -f, --from         A comma-delimited list of symbols to convert from
    -t, --to           A comma-delimited list of symbols to convert to
    -s, --save         Save this as a named profile
    -d, --set-default  Set this as the default profile
    -r, --remove       Remove a named profile

	Examples
    $ ccoin -f=BTC -t=ETH,USD,LTC
    $ ccoin --from=BTC,ETH --to=USD,LTC,EUR
`, {
	alias: {
		f: 'from',
		t: 'to',
		s: 'save',
		d: 'set-default',
		r: 'remove'
	}
});

const input = cli.input;
const flags = cli.flags;
const profiles = JSON.parse(fs.readFileSync(profilePath()).toString());
const profileNames = Object.keys(profiles);

// User has supplied a valid profile name, so let's load the profile.
if (input && profileNames.indexOf(input.toString()) > -1) {
	load(profiles[input].from, profiles[input].to);
}

// Remove a named profile
else if (flags.remove && profileNames.indexOf(flags.remove) > -1) {
	removeProfile(flags.remove).then(() => {
		console.log(chalk.magenta('Removed profile:'), flags.remove);
	});
}

// Show an error when atempting to remove a profile that doesn't exist
else if (flags.remove && profileNames.indexOf(flags.remove) === -1) {
	console.log(chalk.magenta('Error:'), `There is no profile named ${chalk.yellow(flags.remove)}.`);
	list();
	process.exit(1);
}

// List the profiles
else if (input && input[0] === 'ls') {
	list();
}

// You cannot set a profile name using reserved command names
else if (flags.save && flags.save === 'ls') {
	console.log(chalk.magenta('Error:'), `${chalk.yellow('ls')} is a reserved command, you cannot create a profile with that name.`);
	process.exit(1);
}

// Set the default profile with the `--set-default` option
else if (flags.to && flags.from && flags.d) {
	const {from, to} = flags;
	const save = 'default';

	const spinner = ora('Saving profile');
	spinner.start();

	saveProfile(save, from, to).then(() => {
		spinner.succeed(`Saved profile ${chalk.yellow(save)}`);
		load(from, to);
	});
}

// Show an error when not enough information for the `--set-default` option
else if ((!flags.to || !flags.from) && flags.d) {
	console.log(chalk.magenta('Error:'), `You must supply ${chalk.yellow('--from')} and ${chalk.yellow('--to')} flags in order to set a default.`);
	process.exit(1);
}

// If no options or inputs are supplied, but there is
// a `default` profile, then load the default profile
else if (empty(input) && empty(flags) && profileNames.indexOf('default') > -1) {
	load(profiles.default.from, profiles.default.to);
}

// Show an error and quit when attempting to save a
// profile without --from and --to flags supplied
else if (flags.save && (!flags.to || !flags.from)) {
	console.log(chalk.magenta('Error:'), `You must supply ${chalk.yellow('--from')} and ${chalk.yellow('--to')} flags in order to save a profile.`);
	process.exit(1);
}

// Save the profile when `--save-as` is called, then run ccoin
else if (flags.save && flags.to && flags.from) {
	const {save, from, to} = flags;
	const spinner = ora('Saving profile');
	spinner.start();

	saveProfile(save, from, to).then(() => {
		spinner.succeed(`Saved profile ${chalk.yellow(save)}`);
		load(from, to);
	});
}

// Default API
else if (flags.from && flags.to && empty(input)) {
	load(flags.from, flags.to);
}

// If no flags or input has been supplied, show the help
else if (empty(flags) && empty(input)) {
	cli.showHelp();
}

/**
 * Run ccoin with the given from and to parameters.
 * @param  {string} from comma-delimited list to convert from
 * @param  {string} to   comma-delimited list to convert to
 */
function load(from, to) {
	spinner.start();

	ccoin(from, to)
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
}

/**
 * List off all the named profiles
 */
function list() {
	console.log(chalk.magenta('Available Profiles:'));
	if (empty(profileNames)) {
		console.log(`  ${chalk.gray('None')}`);
	}
	profileNames.forEach(name => {
		const profile = profiles[name];
		const line = `-f=${profile.from} -t=${profile.to}`;
		console.log(`  ${chalk.cyan(name)}: ${chalk.gray(line)}`);
	});
}
