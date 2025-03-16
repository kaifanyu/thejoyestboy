// src/lib/stores/config.ts
import { readable, type Readable } from 'svelte/store';

// export const apiBaseUrl: Readable<string> = readable('https://localhost:8080');
export const apiBaseUrl: Readable<string> = readable('https://api.thejoyestboy.com');