<script>
  import { onMount } from 'svelte';
  import DashboardLayout from './lib/components/DashboardLayout.svelte';
  import { currentRoute } from './lib/router.js';
  import { pageTransitions } from './lib/utils/motion.js';
  import { themeActions } from './lib/stores/theme.js';
  import { isLoading } from 'svelte-i18n';
  import { i18nReadyPromise } from './lib/i18n/index.js';
  import LoadingSpinner from './lib/components/LoadingSpinner.svelte';

  //
  import HomePage from './lib/pages/HomePage.svelte';
  import WorkspaceMembers from './lib/pages/WorkspaceMembers.svelte';
  import ProfilePage from './lib/pages/ProfilePage.svelte';
  import NotFoundPage from './lib/pages/NotFoundPage.svelte';
  import LoginPage from './lib/pages/LoginPage.svelte';
  import RegisterPage from './lib/pages/RegisterPage.svelte';
  import PromptsPage from "./lib/pages/PromptsPage.svelte";
  import LensPage from "./lib/pages/LensPage.svelte";
  import ApiPage from "./lib/pages/ApiPage.svelte";
  import HelpPage from "./lib/pages/HelpPage.svelte";
  import RepoSettingsPage from "./lib/pages/RepoSettingsPage.svelte"

  //
  let current;
  let pageElement;
  let previousRoute = '';
  let appReady = false;
  let showFullPage = false;
  let loading = true;

  $: {
    // Determine if we should show a full page (without dashboard layout)
    showFullPage = $currentRoute.startsWith('/auth/');
    
    // Update current component based on route
    current = 
      $currentRoute === '/' ? HomePage
      : $currentRoute === '/workspacemembers' ? WorkspaceMembers
      : $currentRoute === '/prompts' ? PromptsPage
      : $currentRoute === '/lens' ? LensPage
      : $currentRoute === '/api' ? ApiPage
      : $currentRoute === "/help" ? HelpPage
      : $currentRoute === '/repo-settings' ? RepoSettingsPage
      : $currentRoute === '/profile' ? ProfilePage
      : $currentRoute === '/auth/login' ? LoginPage
      : $currentRoute === '/auth/register' ? RegisterPage
      : NotFoundPage;
  }

  // Handle page transitions
  $: if ($currentRoute !== previousRoute && pageElement && appReady) {
    // Exit animation for previous page
    if (previousRoute) {
      pageTransitions.exit(pageElement);
    }
    
    // Enter animation for new page
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);
    
    previousRoute = $currentRoute;
  }
  
  // Async logic for app readiness
  onMount(async () => {
    // Initialize theme system
    themeActions.init();
    
    // Wait for i18n to be ready
    await i18nReadyPromise;
    
    // Mark app as ready
    appReady = true;
    
    // Initial page animation
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);
  });

  // Timer for loading spinner (separate, not async)
  onMount(() => {
    loading = false;
  });
</script>

{#if loading}
  <LoadingSpinner />
{/if}

{#if !appReady || $isLoading}
  <div class="flex items-center justify-center min-h-screen bg-base-100">
    <div class="text-center">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <p class="mt-4 text-base-content/60">Loading...</p>
    </div>
  </div>
{:else}
  {#if showFullPage}
    <div bind:this={pageElement}>
      <svelte:component this={current} />
    </div>
  {:else}
    <DashboardLayout>
      <div bind:this={pageElement} class="page-container scrollable-container">
        <svelte:component this={current} />
      </div>
    </DashboardLayout>
  {/if}
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  
  .page-container {
    min-height: 100%;
    overflow-x: hidden;
  }
</style>
