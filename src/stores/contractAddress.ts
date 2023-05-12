import { writable } from 'svelte/store';

const contractAddress = () => {
  const addr = localStorage.getItem('contractAddress') || '';
  const contractAddress = writable(addr);

  const clearContractAddress = () => {
    contractAddress.set('');
  };

  const set = (address: string) => {
    contractAddress.set(address);
    localStorage.setItem('contractAddress', address);
  };

  return {
    set: set,
    subscribe: contractAddress.subscribe,
    update: contractAddress.update,
    clear: clearContractAddress,
  };
};

export default contractAddress();
