<script lang="ts">
  interface Writeup {
    id: string;
    titre: string;
    ctf: string;
    date: string;
    categorie: string;
    difficulte: 'easy' | 'medium' | 'hard' | 'insane';
    tags: string[];
    points?: number;
  }

  let { writeups }: { writeups: Writeup[] } = $props();

  const allCtfs = $derived([...new Set(writeups.map(w => w.ctf))].sort());
  const allCats = $derived([...new Set(writeups.map(w => w.categorie))].sort());

  let activeCtf  = $state<string | null>(null);
  let activeCat  = $state<string | null>(null);
  let activeDiff = $state<string | null>(null);

  const filtered = $derived(
    writeups.filter(w =>
      (!activeCtf  || w.ctf === activeCtf) &&
      (!activeCat  || w.categorie === activeCat) &&
      (!activeDiff || w.difficulte === activeDiff)
    )
  );

  const diffColors: Record<string, string> = {
    easy:   'text-green-400  bg-green-400/10  border-green-400/20',
    medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    hard:   'text-orange-400 bg-orange-400/10 border-orange-400/20',
    insane: 'text-red-400    bg-red-400/10    border-red-400/20',
  };

  function toggle<T>(current: T | null, val: T): T | null {
    return current === val ? null : val;
  }
</script>

<!-- Filtres -->
<div class="flex flex-wrap gap-6 mb-8">

  <!-- Par CTF -->
  <div>
    <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">CTF</p>
    <div class="flex flex-wrap gap-1.5">
      {#each allCtfs as ctf}
        <button
          onclick={() => (activeCtf = toggle(activeCtf, ctf))}
          class="px-3 py-1 rounded font-mono text-xs border transition-all {activeCtf === ctf
            ? 'bg-red-500/15 border-red-500/40 text-red-300'
            : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}"
        >
          {ctf}
        </button>
      {/each}
    </div>
  </div>

  <!-- Par catégorie -->
  <div>
    <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">Catégorie</p>
    <div class="flex flex-wrap gap-1.5">
      {#each allCats as cat}
        <button
          onclick={() => (activeCat = toggle(activeCat, cat))}
          class="px-3 py-1 rounded font-mono text-xs border transition-all {activeCat === cat
            ? 'bg-zinc-700 border-zinc-500 text-zinc-100'
            : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}"
        >
          {cat}
        </button>
      {/each}
    </div>
  </div>

  <!-- Par difficulté -->
  <div>
    <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">Difficulté</p>
    <div class="flex flex-wrap gap-1.5">
      {#each ['easy', 'medium', 'hard', 'insane'] as diff}
        <button
          onclick={() => (activeDiff = toggle(activeDiff, diff))}
          class="px-3 py-1 rounded font-mono text-xs border transition-all {activeDiff === diff
            ? diffColors[diff]
            : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}"
        >
          {diff}
        </button>
      {/each}
    </div>
  </div>

  <!-- Reset -->
  {#if activeCtf || activeCat || activeDiff}
    <div class="flex items-end">
      <button
        onclick={() => { activeCtf = null; activeCat = null; activeDiff = null; }}
        class="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-2"
      >
        Réinitialiser
      </button>
    </div>
  {/if}
</div>

<!-- Compteur -->
<p class="font-mono text-xs text-zinc-600 mb-6">
  {filtered.length} writeup{filtered.length > 1 ? 's' : ''}
  {#if activeCtf || activeCat || activeDiff}
    <span class="text-zinc-700"> (filtré{filtered.length > 1 ? 's' : ''})</span>
  {/if}
</p>

<!-- Grille -->
{#if filtered.length > 0}
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each filtered as writeup (writeup.id)}
      <a
        href={`/writeups/${writeup.id}`}
        class="group block p-5 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-red-500/30 transition-all"
      >
        <div class="flex items-center gap-2 mb-3">
          <span class={`text-xs px-2 py-0.5 rounded font-mono border ${diffColors[writeup.difficulte]}`}>
            {writeup.difficulte}
          </span>
          <span class="text-xs text-zinc-500 font-mono">{writeup.categorie}</span>
          {#if writeup.points}
            <span class="text-xs text-zinc-600 font-mono ml-auto">{writeup.points} pts</span>
          {/if}
        </div>

        <h3 class="font-bold text-zinc-100 group-hover:text-red-400 transition-colors mb-1 line-clamp-2">
          {writeup.titre}
        </h3>

        <p class="text-xs text-zinc-500 font-mono mb-3">{writeup.ctf}</p>

        <div class="flex flex-wrap gap-1">
          {#each writeup.tags.slice(0, 3) as tag}
            <span class="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded font-mono">
              {tag}
            </span>
          {/each}
        </div>
      </a>
    {/each}
  </div>
{:else}
  <p class="text-zinc-700 font-mono text-sm">// Aucun writeup pour ces critères</p>
{/if}
