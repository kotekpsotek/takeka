import { writable } from 'svelte/store';
import HomePage from './pages/HomePage.svelte';
import WorkspaceMembers from './pages/WorkspaceMembers.svelte';
import ProfilePage from './pages/ProfilePage.svelte';
import LoginPage from './pages/LoginPage.svelte';
import RegisterPage from './pages/RegisterPage.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';
import PromptsPage from "./pages/PromptsPage.svelte";
import LensPage from "./pages/LensPage.svelte";
import ApiPage from "./pages/ApiPage.svelte";
import HelpPage from "./pages/HelpPage.svelte";
import RepoSettingsPage from "./pages/RepoSettingsPage.svelte"

// Create stores for routing
const currentRoute = writable(window.location.pathname);
const navigationHistory = writable([]);

// Define routes
const routes = {
  '/': HomePage,
  '/workspacemembers': WorkspaceMembers,
  '/prompts': PromptsPage,
  '/lens': LensPage,
  '/api': ApiPage,
  '/help': HelpPage,
  '/repo-settings': RepoSettingsPage,
  '/profile': ProfilePage,
  '/auth/login': LoginPage,
  '/auth/register': RegisterPage,
  '*': NotFoundPage
};

// Helper function to get the route path
function getPath() {
  return window.location.pathname;
}

// Navigation function
function navigate(path) {
  if (path === getPath()) return;
  router.navigate(path);
  
  // Update navigation history
  navigationHistory.update(history => [...history, path]);
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  router.navigate(window.location.pathname, false);
});

// Handle initial load
window.addEventListener('load', () => {
  router.navigate(window.location.pathname, false);
});

// Router class
class Router {
  constructor() {
    this.routes = new Map();
    this.currentComponent = null;
    
    // Initialize all routes
    Object.entries(routes).forEach(([path, component]) => {
      this.add(path, component);
    });
    
    // Listen for browser navigation
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });
    
    // Initialize with current path
    this.navigate(window.location.pathname, false);
  }
  
  // Add a route
  add(path, component) {
    this.routes.set(path, component);
  }
  
  // Navigate to a route
  navigate(path, updateHistory = true) {
    if (updateHistory) {
      window.history.pushState({}, '', path);
    }
    
    currentRoute.set(path);
    
    // Find the matching route
    let component = this.routes.get(path);
    
    // If no exact match, try to find a catch-all route
    if (!component) {
      component = this.routes.get('*');
    }
    
    this.currentComponent = component;
  }
  
  // Get current component
  getCurrentComponent() {
    return this.currentComponent;
  }
}

// Create router instance
const router = new Router();

// Export everything needed
export {
  router,
  routes,
  currentRoute,
  navigationHistory,
  navigate
}; 