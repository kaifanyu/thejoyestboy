// @ts-nocheck
import type { PageLoad } from "./$types";
import { apiBaseUrl } from "$lib/stores/config";
import { get } from 'svelte/store'; // Import the get function

export const load = async ({params, fetch}: Parameters<PageLoad>[0]) => {
    const id = params.id;
    const response = await fetch(`${get(apiBaseUrl)}/api/content/audiobooks/${id}`);
    if (!response.ok){
        return {audiobook: null, error: 'Failed to load audiobook'};
    }

    const audiobook = await response.json();
    return {audiobook};
}
