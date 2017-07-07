# ccoin [![Build Status](https://travis-ci.org/crypti/ccoin.svg?branch=master)](https://travis-ci.org/crypti/ccoin) [![Coverage Status](https://coveralls.io/repos/github/crypti/ccoin/badge.svg?branch=master)](https://coveralls.io/github/crypti/ccoin?branch=master)

> Convert and fetch the price conversions of cryptocurrencies within your terminal

![demo](media/demo2.gif)

## Install

```
$ npm install --global @crypti/ccoin
```

## Usage

```
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
```

**Tip:** For a list of 3-letter symbols you can use with this module see [cryptocurrencies](https://github.com/crypti/cryptocurrencies).

## Profiles

Profiles are a handy way to save `--from` and `--to` options without having to type
them manually everytime.

### To Save a Profile

Use the `--save` option or `-s` flag to save a profile by name (both examples are equivalent):

```
$ ccoin -f=BTC,ETH -t=USD,JPY --save=yen
$ ccoin -f=BTC,ETH -t=USD,JPY -s=yen
```

### To Load a Profile

Once you have a profile saved, you can just call it by name:

```
$ ccoin yen
```

### To List All Available Profiles

Use the `ls` command to list all your available Profiles:

```
$ ccoin ls
Available Profiles:
  yen: -f=BTC,ETH -t=USD,JPY
```

### To Set a Default Profile

You can set a default profile with the `--set-default` option or the `-d` flag (both examples are equivalent):

```
$ ccoin -f=BTC,ETH -t=USD,JPY -d
$ ccoin -f=BTC,ETH -t=USD,JPY --set-default
```

### To Load the Default Profile

If you have a default profile set, then you don't have to do anything, you can just type
`ccoin` at the terminal and your default profile will be loaded. However, you can also
load the default profile by name, so both of these examples will load the default profile
(if one has been supplied):

```
$ ccoin
$ ccoin default
```

### To Remove a Profile

Use the `--remove` option or `-r` flag to remove a named Profile (both examples are equivalent):

```
$ ccoin -r=yen
$ ccoin --remove=yen
```

___

:bulb: **Pro Tip:** The profiles are saved in your computer's home directory with
the filename `.ccoin-profiles.json`, so you can edit your profiles manually, just
remember that the file needs to be [valid JSON](https://jsonlint.com/).

## Related

[eth-price](https://github.com/crypti/eth-price) - Fetch and compare current ETH price to other currencies/cryptocurrencies in your terminal.

## License

MIT © [Crypti Team](https://github.com/crypti/ccoin)
