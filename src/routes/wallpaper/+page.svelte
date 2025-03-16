<script lang="ts">
    import { onMount } from "svelte";
  
    onMount(() => {
      document.documentElement.style.overflow = "hidden"; // Prevent scrolling
    });
  </script>
  
  <style>
    body {
      margin: 0px;
      padding: 0px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black; /* Prevent empty space with a solid background */
    }
  
    img {
      max-width: 100vw;
      max-height: 100vh;
      width: auto;
      height: auto;
    }
  </style>


<body>
    <img src="/wallpaper.jpg" alt="Wallpaper" />
</body>