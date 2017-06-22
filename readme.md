# ccoin [![Build Status](https://travis-ci.org/crypti/ccoin.svg?branch=master)](https://travis-ci.org/crypti/ccoin) [![Coverage Status](https://coveralls.io/repos/github/crypti/ccoin/badge.svg?branch=master)](https://coveralls.io/github/crypti/ccoin?branch=master)

> Convert and fetch the cost of cryptocurrencies within your terminal

Currently in development.

## Install

```
$ npm install --save ccoin
```


## Usage

```js
const ccoin = require('ccoin');

ccoin('btc', 'eth,usd,ltc');
//=> [ 'ETH: 8.4', 'USD: 2667.43', 'LTC: 58.11' ]
```

## API

### ccoin(from, to)

Returns an array with price conversion data.

#### from

Type: `string`<br />

The 3-letter currency symbol you want to *convert from*.

#### to

Type: `string`<br />

A comma-delimited list of the currencies you want to *convert to*.

## Related

[eth-price](https://github.com/crypti/eth-price) - A CLI app to grab the current ETH price from your terminal in USD and/or other cryptocurrency symbols

## License

MIT © [Crypti Team](https://github.com/crypti/ccoin)
