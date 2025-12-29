<script lang=ts>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { _, isLoading } from 'svelte-i18n';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import { users, menuItems } from '../data/dashboard.js';
  import { navigate, currentRoute } from '../router.js';
  import { motionInView, staggerAnimate } from '../utils/motion.js';
  import ThemeLogo from './ThemeLogo.svelte';
  import { theme, THEMES } from '../stores/theme.js';
  import { isSearchOpen, isLeftStripeToggled } from "../stores/state.js";
  
  export let isOpen = false;
  
  let menuItemsElements = [];
  // Track expanded submenus
  let expandedMenus = {
    auth: false
  };
  
  interface MenuItem {
    path: string
    icon: string
    name: string
  }
  
  // Create translated menu items with fallbacks
  const translatedMenuItems: MenuItem[] = [
    { path: '/', icon: 'heroicons:home', name: $isLoading ? 'Home' : $_('navigation.home') },
    { path: '/workspacemembers', icon: 'heroicons:users', name: $isLoading ? 'Workspace Members' : $_('navigation.workspaceMembers') },
    { path: '/prompts', icon: 'material-symbols:text-ad-outline-rounded', name: $isLoading ? 'Prompts' : $_('navigation.prompts') },
    { path: "/lens", icon: "material-symbols:labs-outline-rounded", name: $isLoading ? "Lens" : $_("navigation.lens") },
    { path: "/api", icon: "material-symbols:api-rounded", name: $isLoading ? "API" : $_("navigation.api") }
  ];
  
  //
  const secondCattegoryMenu: MenuItem[] = [
    { path: "/help", icon: "material-symbols:help-outline-rounded", name: $isLoading ? "Help" : $_("second_cattegory.help") },
    { path: "/repo-settings", icon: "material-symbols:settings-outline-rounded", name: $isLoading ? "Repo Settings" : $_("second_cattegory.workspace_settings") }
  ]
  
  function closeSidebar() {
    // Optionally close sidebar on mobile
    isOpen = false;
  }
  
  // Check if a menu item is active based on current route
  function isActive(itemPath) {
    return $currentRoute === itemPath;
  }
  
  // Handle menu item click with animation
  function handleMenuClick(path) {
    navigate(path);
    closeSidebar();
  }
  
  // Toggle submenu expansion
  function toggleSubmenu(key) {
    expandedMenus[key] = !expandedMenus[key];
  }
  
  // Check if a submenu is active
  function isSubmenuActive(submenu) {
    if (!submenu) return false;
    return submenu.some(item => item.path === $currentRoute);
  }

  function onDirectToProfile() {
    navigate("/profile")
  }

  function onSearchToggle() {
    $isSearchOpen = !isSearchOpen;
  }

  function onStripeToggle() {
    $isLeftStripeToggled = !$isLeftStripeToggled;
  }
  
  // Add logout function
  function handleLogout() {
    // Close sidebar first
    closeSidebar();
    
    // Small delay to allow sidebar animation to complete
    setTimeout(() => {
      // Navigate to random login page
      navigate('/auth/login');
    }, 150);
  }

  onMount(() => {
    // Animate menu items on mount
    if (menuItemsElements.length > 0) {
      staggerAnimate(menuItemsElements, 'fadeInLeft', { delay: 0.1 });
    }
    
    // Auto-expand authentication submenu if we're on an auth page
    if ($currentRoute.startsWith('/auth/')) {
      expandedMenus.auth = true;
    }
  });
</script>

<!-- Mobile backdrop -->
{#if isOpen}
  <div 
    class="fixed inset-0 z-40 bg-neutral bg-opacity-75 lg:hidden transition-opacity duration-300"
    on:click={closeSidebar}
  ></div>
{/if}

<!-- Sidebar -->
<div 
  class="fixed inset-y-0 left-0 z-50 {!$isLeftStripeToggled ? "w-64" : "w-fit"} bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col h-full"
>
  <!-- Logo section -->
  <div 
    class="upper-section w-full flex justify-between items-center border-b border-base-300 px-1"
  >
    <div class="flex items-center justify-center h-16 {!$isLeftStripeToggled ? "px-6" : ""} flex-shrink-0">
      {#if !$isLeftStripeToggled}
        <ThemeLogo width="w-[140px]" height="h-fit" alt="Takeka Logo" />
      {/if}
    </div>
      

    <div 
      class="interaction-side flex gap-2"
    >
      <button 
        class="p-0.5 hover:text-os2-200"
        on:click={onStripeToggle}
      >
        <Icon 
          icon="material-symbols:dock-to-right-outline"
          class="w-5 h-5"
        />
      </button>

      <button 
        class="p-0.5 hover:text-os2-200"
        on:click={onSearchToggle}
      >
        <Icon 
          icon="material-symbols:search"
          class="w-5 h-5 {$isSearchOpen ? "text-os2-100" : ""}"
        />
      </button>  
    </div>
  </div>

  <div 
    id="stripe-content"
    class="px-2 h-full w-fit flex flex-col items-center justify-between"
  >
    <div
      id="workspace-and-selection"
      class="{!$isLeftStripeToggled ? "w-full" : "w-fit"} border border-base-300 mt-3 p-1.5 rounded-lg flex gap-2 border-base-300 { $theme === THEMES.DARK ? 'bg-gray-200/5' : 'bg-gray-200/40' } flex justify-center items-center text-gray-400"
    >
      <img 
        class="w-[30px] h-[30px] rounded-lg"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.sT8k3iBCnoa8rztWqNbtfAHaHa%3Fpid%3DApi&f=1&ipt=59e0abd9357c91461b0de4046d921a82c90ea28b6d7e27a679689659dffdeb6a&ipo=images" 
        alt=""
      />

      {#if !$isLeftStripeToggled}
        <div 
          class="textual w-full"
        >
          <p id="workspace-name" class="text-sm font-semibold">ca</p>
          <p id="workspace-role" class="text-xs text-gray-500">Admin</p>
        </div>

        <div
          class="p-1 border border-base-300 rounded-lg bg-gray-200/7"
        >
          <Icon 
            icon="material-symbols:double-arrow-rounded"
          />
        </div>
      {/if}
    </div>
    
    <div
      class="w-full pt-6 pb-3 flex flex-col justify-between h-full"
    >
      <!-- Navigation section - takes up remaining space -->
      <nav class="w-full flex-1 space-y-2 overflow-y-auto">
        {#each translatedMenuItems as item, index}
          <a
            bind:this={menuItemsElements[index]}
            href={item.path}
            class="w-full flex gap-3 items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 {$currentRoute === item.path ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
            on:click|preventDefault={() => handleMenuClick(item.path)}
            use:motionInView={{ animation: 'fadeInLeft', delay: index * 0.1 }}
          >
            <Icon icon={item.icon} class="w-5 h-5"/>
            {#if !$isLeftStripeToggled}
              {item.name}

              {#if $currentRoute === item.path}
                <div class="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              {/if}
            {/if}
          </a>
        {/each}
      </nav>
  
      <!-- For selected repo  -->
      <nav class="w-full flex flex-col gap-1.5 space-y-0.5 overflow-y-auto pt-2 border-t border-base-300">
        {#each secondCattegoryMenu as secondCattegoryItem, i}
          <a
            bind:this={menuItemsElements[i]}
            href={secondCattegoryItem.path}
            class="w-full flex gap-3 items-center p-2 px-4 text-xs font-medium rounded-lg transition-colors duration-200 {$currentRoute === secondCattegoryItem.path ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/50 hover:bg-base-200 hover:text-base-content'}"
            on:click|preventDefault={() => handleMenuClick(secondCattegoryItem.path)}
            use:motionInView={{ animation: 'fadeInLeft', delay: i * 0.1 }}
          >
            <Icon icon={secondCattegoryItem.icon} class="w-5 h-5"/>

            {#if !$isLeftStripeToggled}
              {secondCattegoryItem.name}

              {#if $currentRoute === secondCattegoryItem.path}
                <div class="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              {/if}
            {/if}
          </a>
        {/each}
      </nav>
    </div>
    
    <!-- User section - always at bottom -->
    <button 
      class="w-fit mb-3 border border-base-300 {!$isLeftStripeToggled ? "p-2.5" : "p-1.5"} rounded-lg flex-shrink-0 mt-auto {$theme === THEMES.LIGHT ? "bg-gray-200/40" : ""}"
      
      on:click={onDirectToProfile}
    >
      <div class="flex items-center">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
          alt="User avatar"
          class="w-10 h-10 rounded-full object-cover bg-base-200"
        >
        {#if !$isLeftStripeToggled}
          <div class="ml-3 flex-1 min-w-0 text-start">
            <p class="text-sm font-medium text-base-content truncate">John Doe</p>
            <p class="text-xs text-base-content/60 truncate">john.doe@example.com</p>
          </div>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div class="flex items-center gap-1">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
              class="p-1.5 rounded-md text-base-content/60 hover:text-red-600 hover:bg-base-200 transition-colors"
              on:click|stopPropagation={handleLogout}
              title={$_('common.logout')}
            >
              <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
            </div>

            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
              class="p-1.5 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200"
              on:click|stopPropagation={onDirectToProfile}
            >
              <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
            </div>
          </div>
        {/if}
      </div>
    </button>
  </div>
</div> 

<style>
  @reference "../../app.css";
</style>
