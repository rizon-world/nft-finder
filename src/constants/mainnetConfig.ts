import { NetworkConfig } from 'src/interfaces/network';

export const mainnetConfig: NetworkConfig = {
  chainId: 'titan-1',
  chainName: 'RIZON',
  chainSymbolImageUrl: '../assets/rizon_logo.png',
  rpc: 'https://rpcapi.rizon.world',
  rest: 'https://restapi.rizon.world',
  nodeProvider: {
    name: 'Rizon',
    email: '',
    website: 'https://rizon.world',
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'rizon',
    bech32PrefixAccPub: 'rizonpub',
    bech32PrefixValAddr: 'rizonvaloper',
    bech32PrefixValPub: 'rizonvaloperpub',
    bech32PrefixConsAddr: 'rizonvalcons',
    bech32PrefixConsPub: 'rizonvalconspub',
  },
  currencies: [
    {
      coinDenom: 'ATOLO',
      coinMinimalDenom: 'uatolo',
      coinDecimals: 6,
      coinGeckoId: 'rizon',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'ATOLO',
      coinMinimalDenom: 'uatolo',
      coinDecimals: 6,
      coinGeckoId: 'rizon',
      gasPriceStep: {
        low: 0.00033,
        average: 0.000825,
        high: 0.00132,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'ATOLO',
    coinMinimalDenom: 'uatolo',
    coinDecimals: 6,
    coinGeckoId: 'rizon',
  },
  features: ['cosmwasm', 'stargate', 'ibc-transfer'],
};
