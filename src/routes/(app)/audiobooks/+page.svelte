<script lang="ts">
    import { onMount } from 'svelte';
    import { apiBaseUrl } from '$lib/stores/config';

    interface ContentItem {
        id: number;
        title: string;
        description?: string;
        cover_image?: string;
        year?: number;
        author?: string;
    }

    let audiobooks: ContentItem[] = [];
    let isLoading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            isLoading = true;
            const response = await fetch(`${$apiBaseUrl}/api/content/audiobooks`);
            if (!response.ok) throw new Error("Failed to fetch audiobooks.");
            audiobooks = await response.json();
        } catch (err) {
            console.error("Error fetching audiobooks:", err);
            error = "Failed to load audiobooks. Please try again later.";
        } finally {
            isLoading = false;
        }
    });
</script>

<div class="library-container">
    {#if isLoading}
        <div class="status-message">Loading audiobooks...</div>
    {:else if error}
        <div class="status-message error">{error}</div>
    {:else}
        {#if audiobooks.length > 0}
            <div class="library-grid">
                {#each audiobooks as item}
                    <a href={`/audiobooks/${item.id}`} class="book-card">
                        <div class="book-cover">
                            <img src={item.cover_image || '/placeholder-cover.jpg'} alt={item.title} loading="lazy" />
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="status-message">No audiobooks found.</div>
        {/if}
    {/if}
</div>

<style>
    /* Container Styling */
    .library-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        text-align: center;
    }

    /* Status Messages */
    .status-message {
        font-size: 1.2rem;
        color: #555;
        margin-top: 20px;
    }

    .status-message.error {
        color: #e63946;
    }

    /* Grid Layout */
    .library-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 20px;
        justify-content: center;
        align-items: start;
    }

    /* Book Cards */
    .book-card {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        text-decoration: none;
    }

    .book-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    /* Book Cover */
    .book-cover {
        width: 100%;
        aspect-ratio: 2 / 3;
        background: #f3f3f3;
        overflow: hidden;
        position: relative;
    }

    .book-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
    }

    .book-card:hover .book-cover img {
        transform: scale(1.05);
    }


    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }
</style>
