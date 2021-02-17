<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<Router {routes} />

<style>
  :global(body) {
    @apply font-sans bg-gray-100 text-gray-800;
  }
</style>
