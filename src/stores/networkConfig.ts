import { writable } from 'svelte/store';
import { mainnetConfig } from '../constants/mainnetConfig';
import { testnetConfig } from '../constants/testnetConfig';

const network = writable(testnetConfig);

const setNetwork = (isMainnet: boolean) => {
  network.set(isMainnet ? mainnetConfig : testnetConfig);
};

const isMainnet = writable(false);

isMainnet.subscribe((value) => {
  setNetwork(value);
});

const networkConfig = { isMainnet, network };

export default networkConfig;
