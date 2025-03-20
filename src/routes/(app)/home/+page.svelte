<script lang="ts">
  import { onMount } from 'svelte';
  import { apiBaseUrl } from '$lib/stores/config';
  
  interface ContentItem {
      id: number;
      type: string;
      title: string;
      description?: string;
      cover_image?: string;
      year?: number;
      author?: string;
  }

  let manga: ContentItem[] = [];
  let audiobooks: ContentItem[] = [];
  let anime: ContentItem[] = [];
  let movies: ContentItem[] = [];
  let featuredContent: ContentItem | null = null;
  let isLoading = true;
  let error: string | null = null;

  function enableDragScroll(elementId: string): void {
    const carousel = document.getElementById(elementId);
      if (!carousel) {
          console.warn(`Element with id ${elementId} not found`);
          return;
      }

      let isDown = false;
      let startX: number;
      let scrollLeft: number;
      let isDragging = false;
      let velocity = 0;
      let momentumId: number | null = null;
      let isCursorInside = false;

      const easeOut = (val: number) => Math.sign(val) * Math.pow(Math.abs(val), 0.9);

      const handlePointerDown = (e: PointerEvent) => {
          if (!isCursorInside) return;

          if ((e.target as HTMLElement).tagName === "IMG") {
              e.preventDefault();
          }

          isDown = true;
          isDragging = false;
          carousel.classList.add("active");
          document.body.classList.add("dragging");
          startX = e.pageX - carousel.offsetLeft;
          scrollLeft = carousel.scrollLeft;

          if (momentumId) {
              cancelAnimationFrame(momentumId);
          }
      };

      const handlePointerMove = (e: PointerEvent) => {
          if (!isDown || !isCursorInside) return;
          e.preventDefault();
          isDragging = true;

          const x = e.pageX - carousel.offsetLeft;
          const walk = (x - startX) * 2;
          velocity = easeOut((scrollLeft - (scrollLeft - walk)) * 0.2);

          carousel.scrollLeft = scrollLeft - walk;
      };

      const handlePointerUp = () => {
          isDown = false;
          carousel.classList.remove("active");
      };

      const handlePointerEnter = () => {
          isCursorInside = true;
      };

      const handlePointerLeave = () => {
          isCursorInside = false;
          isDown = false;
          carousel.classList.remove("active");
      };

      const handleClick = (e: MouseEvent) => {
          if (isDragging) {
              e.preventDefault();
          }
          document.body.classList.remove("dragging");
      };

      const handleWheel = (e: WheelEvent) => {
          if (isCursorInside) {
              e.preventDefault(); // Prevent vertical scrolling
              carousel.scrollLeft += e.deltaY * 1; // Adjust speed of scroll
          }
      };

      carousel.addEventListener("pointerdown", handlePointerDown);
      carousel.addEventListener("pointermove", handlePointerMove);
      carousel.addEventListener("pointerup", handlePointerUp);
      carousel.addEventListener("click", handleClick, true);
      carousel.addEventListener("pointerenter", handlePointerEnter);
      carousel.addEventListener("pointerleave", handlePointerLeave);
      carousel.addEventListener("wheel", handleWheel, { passive: false });

      carousel.querySelectorAll("img").forEach(img => {
          img.addEventListener("dragstart", (e) => e.preventDefault());
      });
  }




  onMount(async () => {
      try {
          isLoading = true;
          console.log(`${$apiBaseUrl}/api/content/mangas`);
          const [mangaRes, audiobooksRes, animeRes, moviesRes] = await Promise.all([
              fetch(`${$apiBaseUrl}/api/content/mangas`),
              fetch(`${$apiBaseUrl}/api/content/audiobooks`),
              fetch(`${$apiBaseUrl}/api/content/anime`),
              fetch(`${$apiBaseUrl}/api/content/movies`)
          ]);
          
          if (animeRes.ok) anime = await animeRes.json();
          if (audiobooksRes.ok) audiobooks = await audiobooksRes.json();
          if (mangaRes.ok) manga = await mangaRes.json();
          if (moviesRes.ok) movies = await moviesRes.json();
          
          const allContent = [...anime, ...audiobooks, ...manga, ...movies];
          if (allContent.length > 0) {
              featuredContent = allContent[Math.floor(Math.random() * allContent.length)];
          }
          console.log("allcontent: ", allContent);
          
      } catch (err) {
          console.error("Error fetching content:", err);
          error = "Failed to load content. Please try again later.";
      } finally {
          isLoading = false;
          
          // Use a tick to ensure DOM is updated before trying to access elements
          setTimeout(() => {
              const carousels = [
                  "manga-carousel",
                  "audiobooks-carousel",
                  "anime-carousel",
                  "movies-carousel"
              ];
              
              // Only enable drag scroll for carousels that exist in the DOM
              carousels.forEach(id => {
                  if (document.getElementById(id)) {
                      enableDragScroll(id);
                  }
              });
          }, 0);
      }
  });
</script>

<div class="container mx-auto px-4 py-8 space-y-12">
  {#if isLoading}
      <div class="text-center py-10">Loading content...</div>
  {:else if error}
      <div class="text-center py-10 text-red-500">{error}</div>
  {:else}
      {#if audiobooks.length > 0}
      <section>
        <a href="/audiobooks"
            class="text-xl font-bold mb-4 inline-block transition-colors duration-200 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Audiobooks</a>
          <div id="audiobooks-carousel" class="scroll-container flex space-x-4 pb-4">
            {#each audiobooks as item}
                <a href={`/audiobooks/${item.id}`} class="scroll-item w-32 sm:w-40 md:w-48 transition transform hover:scale-105">
                    <div class="relative aspect-[2/3] rounded overflow-hidden">
                        <img src={item.cover_image || '/placeholder-cover.jpg'} alt={item.title}
                             class="w-full h-full object-cover" loading="lazy" draggable="false"/>
                    </div>
                    <h3 class="mt-2 text-sm truncate">{item.title}</h3>
                </a>
            {/each}
        </div>
      </section>
      {/if}
      
      {#if manga.length > 0}
      <section>
          <h2 class="text-xl font-bold mb-4">Manga</h2>
          <div id="manga-carousel" class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide  scroll-padding-left: 20px;">
              {#each manga as item}
                  <a href={`/manga/${item.id}`} class="snap-start flex-none w-32 sm:w-40 md:w-48 transition transform hover:scale-105">
                      <div class="relative aspect-[2/3] rounded overflow-hidden">
                          <img src={item.cover_image || '/placeholder-cover.jpg'} alt={item.title} class="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <h3 class="mt-2 text-sm truncate">{item.title}</h3>
                  </a>
              {/each}
          </div>
      </section>
      {/if}
      
      {#if anime.length > 0}
      <section>
          <h2 class="text-xl font-bold mb-4">Anime</h2>
          <div id="anime-carousel" class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
              {#each anime as item}
                  <a href={`/anime/${item.id}`} class="snap-start flex-none w-32 sm:w-40 md:w-48 transition transform hover:scale-105">
                      <div class="relative aspect-[2/3] rounded overflow-hidden">
                          <img src={item.cover_image || '/placeholder-cover.jpg'} alt={item.title} class="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <h3 class="mt-2 text-sm truncate">{item.title}</h3>
                  </a>
              {/each}
          </div>
      </section>
      {/if}
      
      {#if movies.length > 0}
      <section>
          <h2 class="text-xl font-bold mb-4">Movies</h2>
          <div id="movies-carousel" class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
              {#each movies as item}
                  <a href={`/movies/${item.id}`} class="snap-start flex-none w-32 sm:w-40 md:w-48 transition transform hover:scale-105">
                      <div class="relative aspect-[2/3] rounded overflow-hidden">
                          <img src={item.cover_image || '/placeholder-cover.jpg'} alt={item.title} class="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <h3 class="mt-2 text-sm truncate">{item.title}</h3>
                  </a>
              {/each}
          </div>
      </section>
      {/if}
  {/if}
</div>
  
<style>
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
      cursor: grab;
  }
  .scrollbar-hide:active {
      cursor: grabbing;
  }
  .scroll-container {
    scroll-padding-left: 1rem; /* Adds space so the first item isn't hard-snapped */
    overflow-x: auto;
    scrollbar-width: none; /* Hide scrollbar for Firefox */
    -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
}

.scroll-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome/Safari */
}

.scroll-item {
    scroll-snap-align: center; /* Centers the item, allowing partial visibility */
    flex: 0 0 auto; /* Prevents unwanted resizing */
    transition: transform 0.3s ease-in-out; /* Smooth hover effect */
}

</style>