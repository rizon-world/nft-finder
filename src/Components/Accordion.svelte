<style>
.accordion-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}
.focus-none {
  outline: none;
  background-color: transparent;
  border-color: transparent;
}
.focus-on {
  border-color: rgba(98, 0, 238, 0.87);
}
form > button:hover {
  background-color: gray;
}
</style>

<script lang="ts">
import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
import IconButton, { Icon } from '@smui/icon-button';
import networkConfig from '../stores/networkConfig';
import { requests, strings } from '../utils';
import { queries } from '../utils';
import CircularProgress from '@smui/circular-progress';
import Card from './Card.svelte';
import { afterUpdate, onMount } from 'svelte';
import { isValidWalletAddress } from '../utils/strings';
import { throttle } from '../utils';

const limit = 8;
const _throttle = throttle();

export let contractInfo;
let lastCalledNftId = 0;
let isLoading = false;
let nftList = [];
let walletAddress= '';
let isHolder = false;
let start_after = 0;
let focused = false;
let scrollTop = 0;
let isShowBackToTopButton = false;
let isClicked = false;

function reset() {
  isLoading = false;
  focused = false;
  nftList = [];
  start_after = 0;
  lastCalledNftId = 0;
}

function handleFocus() {
  focused = !focused;
}

const contractInfos = Object.keys(contractInfo).map((key) => {
  return {
    key,
    value: contractInfo[key],
  };
});

let panels = [true, true];

$: isShowBackToTopButton = scrollTop > 100 && panels[1];

const network = networkConfig.network;
const { rest } = $network;

function getData(_validWalletAddress?: string) {
  if (strings.isValidContractAddress(contractInfo.address)) {
    if (isHolder) {
      isLoading = true;
      const promises = [];
      queries.queryToContract({
            rest,
            contractAddress: contractInfo.address,
            inputQuery: {
              tokens: {
                owner: _validWalletAddress,
                start_after: (start_after++).toString(),
                limit: 100,
              },
            },
          }).then(({ tokens }) => {
            tokens.forEach((tokenId) => {
              promises.push(
                queries.queryToContract({
                  rest,
                  contractAddress: contractInfo.address,
                  inputQuery: {
                    all_nft_info: {
                      token_id: tokenId,
                    },
                  },
                }),
              );
            });
            return tokens;
          }).then((tokenIds) => {
            if (tokenIds.length === 0) {
              isLoading = false;
              return;
            }
            Promise.all(promises)
              .then((data) => {
                return data.map(({ access, info }, i) => ({
                  owner: access.owner,
                  token_uri: info.token_uri,
                  token_id: Number(tokenIds[i]),
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
                nftList = [...new Map([...nftList, ...data].map(item => [item["token_id"], item])).values()];
                nftList = nftList.filter(nft => nft.owner === _validWalletAddress);
                nftList = nftList.sort((a, b) => (Number(a.token_id) > Number(b.token_id)) ? 1 : -1)
                isLoading = false;
              })
              .catch((err) => {
                console.log(err);
                isLoading = false;
              })
          })
    } else if (contractInfo.totalSupply > lastCalledNftId) {
      isLoading = true;
      const promises = [];
      const end =
        lastCalledNftId + limit <= contractInfo.totalSupply
          ? lastCalledNftId + limit
          : contractInfo.totalSupply;
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
          nftList = [...new Map([...nftList, ...data].map(item => [item["token_id"], item])).values()];
          isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          isLoading = false;
        })
    }
  }
}

function handleSubmit() {
  if(isValidWalletAddress(walletAddress)) {
    isHolder = true;
    getData(walletAddress);
  } else {
    isHolder = false;
    if(walletAddress === '' && nftList.length === 0) {
      getData();
    }
  }
}

function handleClick() {
  isClicked = true;
  const doc = document.querySelector('html');
  scrollTop = doc.scrollTop;
  if(isValidWalletAddress(walletAddress)) {
    isHolder = true;
    getData(walletAddress);
  } else {
    isHolder = false;
    if(walletAddress === '') {
      getData();
    }
  }
}

function handleChange(e) {
  e.stopPropagation();
  walletAddress = e.target.value;
  if(isValidWalletAddress(walletAddress)) {
    isHolder = true;
  } else {
    isHolder = false;
    reset();
  }
}


function handleScroll() {
  _throttle(() => {
    const doc = document.querySelector('html');
    const window = document.defaultView;
    if (!isClicked) {
      if(doc.scrollHeight - 150 >= window.scrollY + window.innerHeight) {
        scrollTop = doc.scrollTop;
      }
    }
  });
}

onMount(() => {
  getData();
  document.onscroll = handleScroll;
});

afterUpdate(() => {
  const doc = document.querySelector('html');
  if (isClicked) {
    doc.scrollTo({ top: scrollTop })
    doc.scrollTop = scrollTop;
    setTimeout(() => {
    isClicked = false;
    }, 1000);
  }
});
</script>

<div class="accordion-container">
  <Accordion>
    <Panel bind:open="{panels[0]}">
      <Header class="mt-5">
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
  </Accordion>
  <div class="border-b-2 border-gray-200 md:px-10 px-4">
    <form
      class="flex transition-all flex-row mx-auto my-2 md:w-1/2 w-full flex-shrink justify-between rounded-md  border-2 border-solid border-gray-600 p-2 bg-slate-100 {focused ? 'focus-on' : ''} {panels[1] ? 'opacity-1': 'opacity-0'}"
      on:submit="{panels[1] ? handleSubmit : null}"
      on:change="{handleChange}">
      {#if panels[1]}
      <input type="text" placeholder="Enter the owner address" class="focus-none mx-auto w-full" on:focusin="{handleFocus}"
      on:focusout="{handleFocus}"/>
      <button class="my-auto px-1"
        ><i class="fa-solid fa-magnifying-glass"></i></button>
        {/if}
    </form>
  </div>
  <Accordion>
    <Panel bind:open="{panels[1]}">
      <Header>
        <p class="font-semibold">NFTs</p>
        <IconButton slot="icon" toggle pressed="{panels[1]}">
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      <Content class="mb-5">
        {#if isLoading}
          <div>
            <CircularProgress
              style="height: 32px; width: 32px;"
              indeterminate />
          </div>
        {:else if walletAddress === '' || isHolder}
          <div class="flex flex-wrap gap-y-5">
            {#each nftList as nftInfo}
              <Card
                classList="{nftList.length < 2
                  ? `w-${nftList.length}/2`
                  : 'w-1/2'} md:w-1/4 px-1"
                nftInfo="{nftInfo}" />
            {/each}
          </div>
        {:else if walletAddress.length > 0 && !isHolder}
        <p>Invalid wallet address</p>
        {/if}
        {#if nftList.length < contractInfo.totalSupply && !isHolder && walletAddress.length === 0}
          <button
            class="mx-auto my-5 rounded-full bg-gray-100 hover:bg-gray-50 pt-2 px-2"
            on:click="{handleClick}">
            <Icon class="material-icons">expand_more</Icon>
          </button>
        {:else if isHolder}
          <p>You can check only 100 NFTs here</p>
        {/if}
      </Content>
    </Panel>
  </Accordion>
  <button class="btn bg-white border-blcak sticky btn-circle bottom-5 left-full mb-5 mr-5 {isShowBackToTopButton ? 'opacity-1' : 'opacity-0'}" on:click="{(e) => {
    e.stopPropagation();
    const doc = document.querySelector('html');
    doc.scrollTop = 0;
  }}">
    <i class="fa-solid fa-arrow-up fa-xl" style="color: #000000;"></i>
  </button>
</div>