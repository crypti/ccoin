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

test('fetches price data', async t => {
	const prices = await fn('btc', 'eth,usd,ltc');
	t.is(typeof prices, 'object');
	t.is(Object.keys(prices).length, 3);
});
