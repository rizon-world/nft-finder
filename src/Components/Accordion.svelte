<style>
.accordion-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
import IconButton, { Icon } from '@smui/icon-button';
import networkConfig from '../stores/networkConfig';
import { requests, strings } from '../utils';
import { queries } from '../utils';
import CircularProgress from '@smui/circular-progress';

export let contractInfo;
let lastCalledNftId = 0;
let isLoading = false;
let nftList = [];

const contractInfos = Object.keys(contractInfo).map((key) => {
  return {
    key,
    value: contractInfo[key],
  };
});

let panels = [true, true];

const network = networkConfig.network;
const { rest } = $network;

if (strings.isValidContractAddress(contractInfo.address)) {
  if (contractInfo.totalSupply > lastCalledNftId) {
    isLoading = true;
    const promises = [];
    const end = lastCalledNftId + 10;
    while (
      contractInfo.totalSupply > lastCalledNftId &&
      lastCalledNftId < end
    ) {
      promises.push(
        queries.queryToContract({
          rest,
          contractAddress: contractInfo.address,
          inputQuery: {
            all_nft_info: {
              token_id: (++lastCalledNftId).toString(),
            },
          },
        }),
      );
    }
    Promise.all(promises)
      .then((data) => {
        return data.map(({ access, info }, i) => ({
          owner: access.owner,
          token_uri: info.token_uri,
          token_id: lastCalledNftId - promises.length + i + 1,
        }));
      })
      .then(async (data) => {
        return await Promise.all(
          data.map(async (nftInfo) => {
            const metadata = await requests.getMetadata(nftInfo.token_uri);
            return {
              ...nftInfo,
              metadata,
            };
          }),
        );
      })
      .then((data) => {
        nftList = [...nftList, ...data];
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading = false;
      });
  }
}
</script>

<div class="accordion-container">
  <Accordion multiple>
    <Panel bind:open="{panels[0]}">
      <Header>
        <p class="font-semibold">Overview</p>
        <IconButton slot="icon" toggle pressed="{panels[0]}">
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      <Content>
        <ul>
          {#each contractInfos as contractInfo}
            <li class="my-4 text-left align-middle md:flex">
              <p class="w-40 font-semibold md:mx-0 md:text-left">
                {contractInfo.key}
              </p>
              <p class="w-40">{contractInfo.value}</p>
            </li>
          {/each}
        </ul>
      </Content>
    </Panel>
    <Panel bind:open="{panels[1]}">
      <Header>
        <p class="font-semibold">NFTs</p>
        <IconButton
          slot="icon"
          toggle
          pressed="{(() => (isLoading ? false : panels[1]))()}">
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      {#if isLoading}
        <div>
          <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        </div>
      {:else}
        <div class="flex flex-wrap gap-y-5">
          {#each nftList as nftInfo}
            <div></div>
          {/each}
        </div>
      {/if}
    </Panel>
  </Accordion>
</div>
