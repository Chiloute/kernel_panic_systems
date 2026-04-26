export type Pole = 'tech' | 'cyber' | 'ctf' | 'communication';

export interface BureauMember {
  pseudo: string;
  role: string;
  /** Chemin /public/avatars/ ou URL Discord CDN */
  avatar: string;
  poles?: Pole[];
}

export interface Member {
  pseudo: string;
  avatar: string;
  poles: Pole[];
}

export const poleConfig: Record<Pole, { label: string; color: string; dot: string }> = {
  tech:          { label: 'Tech',          color: 'text-blue-400  bg-blue-400/10  border-blue-400/20',  dot: 'bg-blue-400'  },
  cyber:         { label: 'Cyber',         color: 'text-red-400   bg-red-400/10   border-red-400/20',   dot: 'bg-red-400'   },
  ctf:           { label: 'CTF',           color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', dot: 'bg-purple-400' },
  communication: { label: 'Communication', color: 'text-sky-400   bg-sky-400/10   border-sky-400/20',   dot: 'bg-sky-400'   },
};

// ─── Bureau ────────────────────────────────────────────────────────────────────
// Remplace `avatar` par l'URL Discord CDN :
// https://cdn.discordapp.com/avatars/{user_id}/{hash}.png?size=256
export const bureau: BureauMember[] = [
  { pseudo: 'PseudoPrésident',   role: 'Président',               avatar: '/avatars/default.svg', poles: ['tech', 'ctf'] },
  { pseudo: 'PseudoVP',          role: 'Vice-Président',           avatar: '/avatars/default.svg', poles: ['cyber'] },
  { pseudo: 'PseudoTrésorier',   role: 'Trésorier',               avatar: '/avatars/default.svg', poles: ['communication'] },
  { pseudo: 'PseudoSecrétaire',  role: 'Secrétaire Général',      avatar: '/avatars/default.svg', poles: ['tech'] },
  { pseudo: 'PseudoViceSec',     role: 'Vice-Secrétaire Générale',avatar: '/avatars/default.svg', poles: ['communication'] },
];

// ─── Membres ───────────────────────────────────────────────────────────────────
export const membres: Member[] = [
  { pseudo: 'Membre1', avatar: '/avatars/default.svg', poles: ['tech', 'ctf'] },
  { pseudo: 'Membre2', avatar: '/avatars/default.svg', poles: ['cyber'] },
  { pseudo: 'Membre3', avatar: '/avatars/default.svg', poles: ['tech'] },
  { pseudo: 'Membre4', avatar: '/avatars/default.svg', poles: ['communication'] },
  { pseudo: 'Membre5', avatar: '/avatars/default.svg', poles: ['ctf', 'cyber'] },
  { pseudo: 'Membre6', avatar: '/avatars/default.svg', poles: ['tech', 'cyber'] },
];
