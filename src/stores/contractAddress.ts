import { writable } from 'svelte/store';

const contractAddress = () => {
  const contractAddress = writable('');

  const clearContractAddress = () => {
    contractAddress.set('');
  };

  return {
    set: contractAddress.set,
    subscribe: contractAddress.subscribe,
    update: contractAddress.update,
    clear: clearContractAddress,
  };
};

export default contractAddress();
