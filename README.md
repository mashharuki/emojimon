# Emojimon

> Create a Pokémon-inspired on-chain game with [MUD](https://mud.dev/)

### [Read the tutorial on mud.dev &rarr;](https://mud.dev/tutorials/emojimon/)

[![emojimon demo](https://github.com/latticexyz/mud/blob/3fdaa9880639a9546f80fbffdcc4a713178328c1/tutorials/emojimon/images/emojimon-intro.gif?raw=true)](https://mud.dev/tutorials/emojimon/)


### テストネットへのデプロイ

```bash
pnpm run deploy:testnet
```

実行結果

```bash
==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0.040567128094656632 ETH (13522376 gas * avg 3.000000007 gwei)

Transactions saved to: /Users/harukikondo/git/emojimon/packages/contracts/broadcast/PostDeploy.s.sol/4242/run-latest.json

Deployment completed in 69.518 seconds

 Deployment result (written to ./worlds.json and deploys/4242): 

{
  worldAddress: '0x21179691c26519d04746770582c102567cFe5591',
  blockNumber: 16433816
}
```

### デプロイ済みのアドレス情報

```json
{
  "4242": {
    "address": "0x21179691c26519d04746770582c102567cFe5591",
    "blockNumber": 16433816
  },
  "31337": {
    "address": "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE"
  }
}
```

### うまく動かないとき

```bash
foundryup -C 87bc53f
```

### ファウセット

```bash
pnpm mud faucet --address 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Explorer

[https://explorer.testnet-chain.linfra.xyz/](https://explorer.testnet-chain.linfra.xyz/)

### Testnet faucet

[Faucet](https://rpc.guildofchains.com/faucet)