<script>
  import Icon from '@iconify/svelte';
  import { navigate } from '../router.js';
</script>

<div class="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="text-center">
      <Icon icon="heroicons:exclamation-triangle" class="mx-auto h-12 w-12 text-gray-400" />
      <h2 class="mt-6 text-3xl font-extrabold text-prime-100">
        Page Not Found
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="mt-6">
        <a
          href="/"
          class="inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium rounded-md shadow-sm text-prime-100 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          on:click|preventDefault={() => navigate('/')}
        >
          <Icon icon="heroicons:home" class="w-4 h-4 mr-2" />
          Go back home
        </a>
      </div>
    </div>
  </div>
</div> 