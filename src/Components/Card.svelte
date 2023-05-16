<style>
.bg-img {
  background-image: url(`${nftInfo.metadata.image}`);
}
</style>

<script lang="ts">
import Card, { Content, Media } from '@smui/card';

export let nftInfo;
export let classList;
</script>

<Card class="{classList}">
  <Media class="card-media-square bg-img" aspectRatio="square">
    <img
      class="absolute top-0"
      src="{nftInfo.metadata.image}"
      alt="{`NFT Card, ${nftInfo.token_id} of ${nftInfo.metadata.name}`}" />
  </Media>
  <Content class="mdc-typography--body2">
    <h2 class="mdc-typography--headline6 font-bold" style="margin: 0;">
      {nftInfo.metadata.name.slice(0, 10)} #{nftInfo.token_id.toString().slice(0, 5)}
    </h2>
    <h3
      class="mdc-typography--subtitle2 mx-0 mb-0"
      style="color: #888;">
      token id: {nftInfo.token_id}
    </h3>
    <h3
      class="mdc-typography--subtitle2 mx-0 mb-2"
      style="color: #888;">
      owner: {nftInfo.owner.slice(0, 10)}...{nftInfo.owner.slice(-5)}
    </h3>
    {nftInfo.metadata.description.length > 125
      ? nftInfo.metadata.description.slice(0, 125) + '...'
      : nftInfo.metadata.description}
  </Content>
</Card>
