'use strict';
const condense = require('no-whitespace');
const ccompare = require('cryptocompare');
global.fetch = require('node-fetch');

module.exports = (from, to) => {
	if (typeof from !== 'string' || typeof to !== 'string') {
		throw new TypeError(`ccoin expects two string parameters, got ${typeof from}, ${typeof to}`);
	}

	const arrify = str => {
		return str.split(',').map(x => condense(x.toUpperCase()));
	};

	const f = arrify(from);
	const t = arrify(to);

	return Promise.all(f.map(fromSymbol => {
		return ccompare.price(fromSymbol, t)
		.then(prices => {
			const results = {
				from: fromSymbol,
				to: []
			};

			Object.keys(prices).forEach(symbol => {
				if (symbol !== fromSymbol) {
					results.to.push(`${symbol}: ${prices[symbol]}`);
				}
			});
			return results;
		});
	}))
	.then(results => {
		// console.log('results', results);
		const final = {};
		results.forEach(obj => {
			final[obj.from] = obj.to;
		});
		return final;
	});
};
