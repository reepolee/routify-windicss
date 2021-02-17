<script>
  import { url, isActive, layout } from "@roxi/routify";
  $: getClass = (path) => ($isActive(path) ? "active" : "");
</script>

<h3 class="text-3xl text-red-500 font-bold">Fragments</h3>
<nav class="fragments">
  {#each $layout.children as { path, title }}
    <a href={$url(path)} class={getClass(path)}> {title}</a>
  {/each}
</nav>
