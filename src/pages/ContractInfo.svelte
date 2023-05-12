<script>
  import { isValidContractAddress } from "../utils";
    import { replace } from "svelte-spa-router";
    import contractAddress from "../stores/contractAddress";
    import networkConfig from "../stores/networkConfig";
  import { queryToContract } from "../utils/queries";

    let isLoading = false;
    let contractInfo = {};

    const network = networkConfig.network;
    const { rest } = $network;

    contractAddress.subscribe((value) => {
        if (value) {
            if (isValidContractAddress(value)) {
                isLoading = true;
                Promise.all([
                    queryToContract({
                        rest,
                        contractAddress: value,
                        inputQuery: "contractInfo"
                    }),
                    queryToContract({
                        rest,
                        contractAddress: value,
                        inputQuery: "numTokens"
                    })
                ]).then(data => {
                    contractInfo = data[0];
                    contractInfo.totalSupply = data[1].count;
                }).catch(err => {
                    replace("/404");
                }).finally(() => {
                    isLoading = false;
                });
                
            } else {
                replace("/404");
            }
        } else {
            replace("/");
        }
    });
</script>

<div>
    Contract Address: {$contractAddress}
    {#if isLoading}
    <div>Loading...</div>
    {:else}
    <div>
        <div>Contract Name: {contractInfo.name}</div>
        <div>Contract Symbol: {contractInfo.symbol}</div>
        <div>Contract Symbol: {contractInfo.totalSupply}</div>
    </div>
    {/if}
</div>