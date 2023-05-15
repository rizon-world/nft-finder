<script>
import notFoundImage from '../assets/404_not_found.jpg';
import contractAddress from '../stores/contractAddress';
let val = '';

contractAddress.subscribe((value) => {
  val = value;
});
</script>

<div class="w-full text-center">
  <h2 class="font- mx-auto my-4 font-bold">404 Page Not Found</h2>
  <p>Sorry, we couldn't find any results for {val}</p>
  <p>Please input the correct NFT contract address.</p>
  <img
    src="{notFoundImage}"
    alt="404 Not Found"
    class="mx-auto w-2/3 min-w-full md:w-1/2 md:min-w-0" />
</div>
