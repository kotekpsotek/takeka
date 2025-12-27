import { writable } from "svelte/store"

export const isLeftStripeToggled = writable<boolean>(false);
export const isSearchOpen = writable<boolean>(false);
