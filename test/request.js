import test from 'ava';
import nock from 'nock';
import fn from '../';

const apiMock = nock('https://min-api.cryptocompare.com/data')
	.persist()
	.defaultReplyHeaders({
		'Content-Type': 'application/json'
	})
	.get('/price');

apiMock
	.query({
		fsym: 'BTC',
		tsyms: 'USD,EUR'
	})
  .reply(200, '{"USD": 200.01, "EUR": 200.02}');

test('Get prices in format', async t => {
	t.plan(2);

	const prices = await fn('btc', 'usd,eur');
	t.is(prices.BTC[0], 'USD: 200.01');
	t.is(prices.BTC[1], 'EUR: 200.02');
});
