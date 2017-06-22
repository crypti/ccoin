'use strict';
const condense = require('no-whitespace');
const ccompare = require('cryptocompare');
global.fetch = require('node-fetch');

module.exports = (from, to) => {
	if (typeof from !== 'string' || typeof to !== 'string') {
		throw new TypeError(`ccoin expects two string parameters, got ${typeof from}, ${typeof to}`);
	}

	const f = from.toUpperCase();
	const t = to.split(',').map(x => condense(x.toUpperCase()));

	return ccompare.price(f, t)
	.then(prices => {
		return Object.keys(prices).map(symbol => `${symbol}: ${prices[symbol]}`);
	});
};
