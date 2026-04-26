<script lang="ts">
  import type { Member, Pole } from "../data/membres";
  import { poleConfig } from "../data/membres";
  import MemberCard from "./MemberCard.svelte";

  interface Props {
    membres: Member[];
  }

  let { membres }: Props = $props();

  type Tab = "tous" | Pole;
  let active = $state<Tab>("tous");

  const tabs: { id: Tab; label: string }[] = [
    { id: "tous", label: "Tous" },
    { id: "tech", label: poleConfig.tech.label },
    { id: "cyber", label: poleConfig.cyber.label },
    { id: "ctf", label: poleConfig.ctf.label },
    { id: "communication", label: poleConfig.communication.label },
  ];

  const filtered = $derived(
    active === "tous"
      ? membres
      : membres.filter((m) => m.poles.includes(active as Pole)),
  );

  const dotColor: Record<Tab, string> = {
    tous: "bg-zinc-500",
    tech: poleConfig.tech.dot,
    cyber: poleConfig.cyber.dot,
    ctf: poleConfig.ctf.dot,
    communication: poleConfig.communication.dot,
  };
</script>

<!-- Tabs -->
<div class="flex flex-wrap gap-2 mb-8">
  {#each tabs as tab}
    <button
      onclick={() => (active = tab.id)}
      class="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm border transition-all {active ===
      tab.id
        ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
        : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}"
    >
      <span class="w-1.5 h-1.5 rounded-full {dotColor[tab.id]}"></span>
      {tab.label}
      <span class="text-xs text-zinc-600">
        ({tab.id === "tous"
          ? membres.length
          : membres.filter((m) => m.poles.includes(tab.id as Pole)).length})
      </span>
    </button>
  {/each}
</div>

<!-- Grille -->
{#if filtered.length > 0}
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
  >
    {#each filtered as membre (membre.pseudo)}
      <MemberCard
        pseudo={membre.pseudo}
        avatar={membre.avatar}
        poles={membre.poles}
        variant="member"
      />
    {/each}
  </div>
{:else}
  <p class="text-zinc-700 font-mono text-sm">// Aucun membre dans ce pôle</p>
{/if}
