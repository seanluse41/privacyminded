import { writable } from 'svelte/store'

export const cart = writable({})

export const currentCategory = writable("all");
