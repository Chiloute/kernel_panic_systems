export type Pole = "tech" | "cyber" | "ctf" | "communication";

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

export const poleConfig: Record<
  Pole,
  { label: string; color: string; dot: string }
> = {
  tech: {
    label: "Tech",
    color: "text-blue-400  bg-blue-400/10  border-blue-400/20",
    dot: "bg-blue-400",
  },
  cyber: {
    label: "Cyber",
    color: "text-red-400   bg-red-400/10   border-red-400/20",
    dot: "bg-red-400",
  },
  ctf: {
    label: "CTF",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    dot: "bg-purple-400",
  },
  communication: {
    label: "Communication",
    color: "text-sky-400   bg-sky-400/10   border-sky-400/20",
    dot: "bg-sky-400",
  },
};

// ─── Bureau ────────────────────────────────────────────────────────────────────
// Remplace `avatar` par l'URL Discord CDN :
// https://cdn.discordapp.com/avatars/{user_id}/{hash}.png?size=256
export const bureau: BureauMember[] = [
  {
    pseudo: "Jérémie",
    role: "Président",
    avatar:
      "https://cdn.discordapp.com/avatars/353558927423569920/77fd63e1354e0db923b13cb41b439762.png?size=1024",
  },
  {
    pseudo: "Paul",
    role: "Conseiller",
    avatar:
      "https://cdn.discordapp.com/avatars/298036635847622656/9e29c5354618fa4a10d4e97629501f5b.png?size=1024",
  },
  {
    pseudo: "Pas Cam",
    role: "Trésorier",
    avatar:
      "https://cdn.discordapp.com/avatars/695281784908283914/4e604b7714106b8b5cb9a0fa97b35447.png?size=1024",
  },
  {
    pseudo: "Louise",
    role: "Secrétaire Général",
    avatar:
      "https://cdn.discordapp.com/avatars/486891012258660358/27ef3f9e9e33405c09484dbb85816d78.png?size=1024",
  },
  {
    pseudo: "Aymeric",
    role: "Vice-Trésorier",
    avatar:
      "https://cdn.discordapp.com/avatars/652837359146237957/1d662242c1be751a20ca22873136ac48.png?size=1024",
  },
  {
    pseudo: "Damien",
    role: "Vice-Secrétaire Général",
    avatar:
      "https://cdn.discordapp.com/avatars/595233106340872192/9b93d53e1d7b8b11b55f7b9b43a7c33d.png?size=1024",
  },
];

// ─── Membres ───────────────────────────────────────────────────────────────────
export const membres: Member[] = [
  { pseudo: "Membre1", avatar: "/avatars/default.svg", poles: ["tech", "ctf"] },
  { pseudo: "Membre2", avatar: "/avatars/default.svg", poles: ["cyber"] },
  { pseudo: "Membre3", avatar: "/avatars/default.svg", poles: ["tech"] },
  {
    pseudo: "Membre4",
    avatar: "/avatars/default.svg",
    poles: ["communication"],
  },
  {
    pseudo: "Membre5",
    avatar: "/avatars/default.svg",
    poles: ["ctf", "cyber"],
  },
  {
    pseudo: "Membre6",
    avatar: "/avatars/default.svg",
    poles: ["tech", "cyber"],
  },
];
