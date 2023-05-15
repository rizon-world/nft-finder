<script>
import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
export let contractInfo;
const contractInfos = Object.keys(contractInfo).map((key) => {
  return {
    key,
    value: contractInfo[key],
  };
});

const items = new Array(contractInfos.length).fill(false);

const open_all = () => items.forEach((_, i) => (items[i] = true));
const close_all = () => items.forEach((_, i) => (items[i] = false));
console.log(contractInfo);
</script>

<div class="accordion-container">
  <Accordion>
    <Panel>
      <Header>Panel 1</Header>
      <Content>
        <Panel color="secondary">
          <Header>Panel 1.1</Header>
          <Content>The content for panel 1.1.</Content>
        </Panel>
        <Panel color="secondary">
          <Header>Panel 1.2</Header>
          <Content>The content for panel 1.2.</Content>
        </Panel>
      </Content>
    </Panel>
    <Panel>
      <Header>Panel 2</Header>
      <Content>
        <Accordion>
          <Panel color="secondary">
            <Header>Panel 2.1</Header>
            <Content>The content for panel 2.1.</Content>
          </Panel>
          <Panel color="secondary">
            <Header>Panel 2.2</Header>
            <Content>The content for panel 2.2.</Content>
          </Panel>
        </Accordion>
      </Content>
    </Panel>
  </Accordion>
</div>
