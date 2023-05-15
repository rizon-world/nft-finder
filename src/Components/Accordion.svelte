<style>
.accordion-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}
</style>

<script>
import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
import IconButton, { Icon } from '@smui/icon-button';
export let contractInfo;
const contractInfos = Object.keys(contractInfo).map((key) => {
  return {
    key,
    value: contractInfo[key],
  };
});

let panels = [true, true];
console.log(contractInfo);
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
        <IconButton slot="icon" toggle pressed="{panels[1]}">
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      <Content>The content for panel 2.</Content>
    </Panel>
  </Accordion>
</div>
