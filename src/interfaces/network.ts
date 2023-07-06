export interface NetworkConfig {
  chainId: string;
  chainName: string;
  chainSymbolImageUrl: string;
  rpc: string;
  rest: string;
  nodeProvider: NodeProvider;
  bip44: BIP44;
  bech32Config: Bech32Config;
  currencies: Currencies[];
  feeCurrencies: FeeCurrencies[];
  stakeCurrency: StakeCurrency;
  features: string[];
}

interface NodeProvider {
  name: string;
  email: string;
  website: string;
}

interface BIP44 {
  coinType: number;
}

interface Bech32Config {
  bech32PrefixAccAddr: string;
  bech32PrefixAccPub: string;
  bech32PrefixValAddr: string;
  bech32PrefixValPub: string;
  bech32PrefixConsAddr: string;
  bech32PrefixConsPub: string;
}

interface Currencies {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
  coinGeckoId: string;
}

interface FeeCurrencies {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
  coinGeckoId: string;
  gasPriceStep: GasPriceStep;
}

interface GasPriceStep {
  low: number;
  average: number;
  high: number;
}

interface StakeCurrency {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
  coinGeckoId: string;
}
