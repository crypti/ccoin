import test from 'ava';
import fn from '../';

test('expects string parameters', t => {
	t.plan(2);

	t.throws(() => {
		fn({}, ['usd', 'eur']);
	}, 'ccoin expects two string parameters, got object, object');

	t.throws(() => {
		fn('btc');
	}, 'ccoin expects two string parameters, got string, undefined');
});

test('allows more than one from', async t => {
	const prices = await fn('btc,eth', 'eth,usd,ltc');
	// const expected = {
	// 	BTC: [
	// 		'ETH: 8.22',
	// 		'USD: 2733.23',
	// 		'LTC: 58.62'
	// 	],
	// 	ETH: [
	// 		'USD: 327.94',
	// 		'LTC: 7.12'
	// 	]
	// };
	t.is(typeof prices, 'object');
	t.is(Object.keys(prices).length, 2);
	t.is(Array.isArray(prices.BTC), true);
	t.is(prices.BTC.length, 3);
	t.is(Array.isArray(prices.ETH), true);
	t.is(prices.ETH.length, 2);
});

test('forgives whitespace in currency list', async t => {
	const prices = await fn('btc', 'eth,   usd,     ltc');
	t.is(typeof prices, 'object');
	t.is(Object.keys(prices).length, 1);
	t.is(Array.isArray(prices.BTC), true);
	t.is(prices.BTC.length, 3);
});
