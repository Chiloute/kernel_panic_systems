<script lang="ts">
  interface EventData {
    id: string;
    titre: string;
    description: string;
    date: string;
    lieu?: string;
  }

  let { events }: { events: EventData[] } = $props();

  const todayRaw = new Date();
  todayRaw.setHours(0, 0, 0, 0);
  const today = todayRaw;

  let viewYear  = $state(today.getFullYear());
  let viewMonth = $state(today.getMonth()); // 0-indexed
  let selectedId  = $state<string | null>(null);
  let lastClickId = $state<string | null>(null); // pour détecter le double-clic

  const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const DAYS   = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

  const daysInMonth   = $derived(new Date(viewYear, viewMonth + 1, 0).getDate());
  const firstDayShift = $derived((new Date(viewYear, viewMonth, 1).getDay() + 6) % 7); // 0=Lun

  const eventsThisMonth = $derived(
    events.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    })
  );

  const byDay = $derived(
    eventsThisMonth.reduce((acc: Record<number, EventData[]>, e) => {
      const d = new Date(e.date).getDate();
      (acc[d] ??= []).push(e);
      return acc;
    }, {})
  );

  const selected = $derived(selectedId ? events.find(e => e.id === selectedId) ?? null : null);

  function prevMonth() {
    if (viewMonth === 0) { viewMonth = 11; viewYear--; } else viewMonth--;
    selectedId = null; lastClickId = null;
  }
  function nextMonth() {
    if (viewMonth === 11) { viewMonth = 0; viewYear++; } else viewMonth++;
    selectedId = null; lastClickId = null;
  }

  function clickDay(day: number) {
    const evs = byDay[day];
    if (!evs?.length) return;
    const ev = evs[0];
    if (lastClickId === ev.id) {
      window.location.href = `/evenements/${ev.id}`;
    } else {
      selectedId  = ev.id;
      lastClickId = ev.id;
    }
  }

  function isPast(dateStr: string) {
    return new Date(dateStr) < today;
  }

  function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  // Construit le tableau de cases (null = case vide, number = numéro du jour)
  const cells = $derived(
    Array.from({ length: firstDayShift + daysInMonth }, (_, i) =>
      i < firstDayShift ? null : i - firstDayShift + 1
    )
  );
</script>

<div class="flex flex-col lg:flex-row gap-6">

  <!-- ── Calendrier ─────────────────────────────────────────── -->
  <div class="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

    <!-- Navigation mois -->
    <div class="flex items-center justify-between mb-6">
      <button
        onclick={prevMonth}
        class="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        aria-label="Mois précédent"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <h2 class="font-mono font-bold text-zinc-100 text-lg">
        {MONTHS[viewMonth]} <span class="text-zinc-500">{viewYear}</span>
      </h2>

      <button
        onclick={nextMonth}
        class="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        aria-label="Mois suivant"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Noms des jours -->
    <div class="grid grid-cols-7 mb-2">
      {#each DAYS as d}
        <div class="text-center text-xs font-mono text-zinc-600 py-1">{d}</div>
      {/each}
    </div>

    <!-- Cases du calendrier -->
    <div class="grid grid-cols-7 gap-1">
      {#each cells as day}
        {#if day === null}
          <div></div>
        {:else}
          {@const evs     = byDay[day] ?? []}
          {@const hasEv   = evs.length > 0}
          {@const isToday = viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate()}
          {@const isSel   = hasEv && selectedId === evs[0].id}
          {@const past    = hasEv && isPast(evs[0].date)}

          <button
            onclick={() => clickDay(day)}
            title={hasEv ? evs[0].titre : undefined}
            class="relative flex flex-col items-center justify-center aspect-square rounded-lg text-sm font-mono
              transition-all duration-150
              {isToday   ? 'ring-1 ring-zinc-500' : ''}
              {isSel     ? 'bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/40' :
               hasEv     ? 'text-zinc-100 hover:bg-zinc-800 cursor-pointer' :
                           'text-zinc-600 cursor-default'}"
          >
            {day}
            {#if hasEv}
              <span
                class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full
                  {past ? 'bg-red-500/70' : 'bg-blue-400'}"
              ></span>
            {/if}
          </button>
        {/if}
      {/each}
    </div>

    <!-- Légende -->
    <div class="flex items-center gap-4 mt-5 pt-4 border-t border-zinc-800">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-blue-400"></span>
        <span class="text-xs font-mono text-zinc-500">À venir</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-red-500/70"></span>
        <span class="text-xs font-mono text-zinc-500">Passé</span>
      </div>
      <div class="flex items-center gap-1.5 ml-auto">
        <span class="text-xs font-mono text-zinc-600">Clic ×2 → page événement</span>
      </div>
    </div>
  </div>

  <!-- ── Panneau d'info ─────────────────────────────────────── -->
  <div class="lg:w-80 flex flex-col">
    {#if selected}
      <div class="bg-zinc-900 border border-zinc-700 rounded-xl p-6 flex flex-col gap-4 h-full">
        <!-- Badge passé / à venir -->
        <span class="self-start text-xs font-mono px-2.5 py-1 rounded border
          {isPast(selected.date)
            ? 'text-zinc-500 bg-zinc-800 border-zinc-700'
            : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}">
          {isPast(selected.date) ? 'Passé' : 'À venir'}
        </span>

        <div>
          <p class="font-mono text-xs text-zinc-500 mb-2 capitalize">{fmtDate(selected.date)}</p>
          <h3 class="font-bold text-zinc-100 text-xl leading-snug">{selected.titre}</h3>
        </div>

        {#if selected.lieu}
          <p class="flex items-center gap-2 text-sm text-zinc-500 font-mono">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {selected.lieu}
          </p>
        {/if}

        <p class="text-sm text-zinc-400 leading-relaxed line-clamp-4">{selected.description}</p>

        <a
          href={`/evenements/${selected.id}`}
          class="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5
            bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500
            text-zinc-100 font-mono text-sm rounded-lg transition-all"
        >
          Voir l'événement
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    {:else}
      <div class="bg-zinc-900/40 border border-zinc-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 h-full min-h-48 text-center">
        <svg class="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/>
        </svg>
        <p class="text-xs font-mono text-zinc-600 leading-relaxed">
          Clique sur un jour<br />marqué d'un point<br />pour voir l'événement
        </p>
      </div>
    {/if}
  </div>

</div>
