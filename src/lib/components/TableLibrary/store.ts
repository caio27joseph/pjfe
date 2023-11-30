import { writable, type Writable } from 'svelte/store';

export const selectedDirectories: Writable<string[]> = writable([]);
