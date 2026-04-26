<script>
  let { currentPath = '/' } = $props();
  let menuOpen = $state(false);

  const navLinks = [
    { href: '/',           label: 'Accueil' },
    { href: '/projets',    label: 'Projets' },
    { href: '/evenements', label: 'Événements' },
    { href: '/writeups',   label: 'Writeups' },
    { href: '/bureau',     label: 'Bureau' },
  ];

  function isActive(href) {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
  <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

    <a href="/" class="flex items-center gap-2.5 select-none group" aria-label="Kernel Panic Systems — Accueil">
      <img
        src="/logo.svg"
        alt="KPS"
        class="h-9 w-auto transition-opacity group-hover:opacity-80"
      />
      <span class="font-mono text-sm font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors hidden sm:block tracking-wide">
        Kernel Panic Systems
      </span>
    </a>

    <ul class="hidden md:flex items-center gap-1">
      {#each navLinks as link}
        <li>
          <a
            href={link.href}
            class="px-3 py-1.5 rounded font-mono text-sm transition-colors {isActive(link.href)
              ? 'text-red-400 bg-red-500/10'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'}"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <button
      onclick={() => (menuOpen = !menuOpen)}
      class="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
      aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={menuOpen}
    >
      {#if menuOpen}
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>
  </nav>

  {#if menuOpen}
    <div class="md:hidden border-t border-zinc-800 bg-zinc-950">
      <nav class="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            onclick={() => (menuOpen = false)}
            class="px-3 py-3 font-mono text-sm rounded transition-colors {isActive(link.href)
              ? 'text-red-400'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'}"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>
