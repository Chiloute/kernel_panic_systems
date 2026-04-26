<script lang="ts">
  import type { Pole } from '../data/membres';
  import { poleConfig } from '../data/membres';

  interface Props {
    pseudo: string;
    avatar: string;
    role?: string;
    poles?: Pole[];
    variant?: 'bureau' | 'member';
  }

  let { pseudo, avatar, role, poles = [], variant = 'member' }: Props = $props();

  let imgError = $state(false);

  const isBureau = variant === 'bureau';
</script>

<div
  class="group flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200
    {isBureau
      ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/70'
      : 'bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900'}"
>
  <!-- Avatar -->
  <div class="relative shrink-0">
    {#if imgError}
      <div
        class="rounded-full bg-zinc-800 flex items-center justify-center transition-all border border-zinc-700
          {isBureau ? 'w-24 h-24' : 'w-16 h-16'}"
      >
        <span
          class="font-mono font-bold text-zinc-500 select-none"
          style="font-size: {isBureau ? '2rem' : '1.25rem'}"
        >
          {pseudo[0].toUpperCase()}
        </span>
      </div>
    {:else}
      <img
        src={avatar}
        alt={pseudo}
        class="rounded-full object-cover border border-zinc-700 transition-all
          {isBureau
            ? 'w-24 h-24 group-hover:border-zinc-500'
            : 'w-16 h-16 group-hover:border-zinc-600'}"
        onerror={() => (imgError = true)}
      />
    {/if}

    {#if isBureau}
      <!-- Glow rouge/bleu au hover pour les membres du bureau -->
      <div
        class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
          shadow-[0_0_24px_rgba(239,68,68,0.2)]"
      ></div>
    {/if}
  </div>

  <!-- Pseudo + rôle -->
  <div class="text-center min-w-0 w-full">
    <p class="font-mono font-bold text-zinc-100 truncate {isBureau ? 'text-base' : 'text-sm'}">
      {pseudo}
    </p>
    {#if role}
      <p
        class="text-xs font-mono mt-1 leading-tight
          bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent"
      >
        {role}
      </p>
    {/if}
  </div>

  <!-- Pôles -->
  {#if poles.length > 0}
    <div class="flex flex-wrap justify-center gap-1">
      {#each poles as pole}
        <span class="text-xs px-2 py-0.5 rounded-full font-mono border {poleConfig[pole].color}">
          {poleConfig[pole].label}
        </span>
      {/each}
    </div>
  {/if}
</div>
