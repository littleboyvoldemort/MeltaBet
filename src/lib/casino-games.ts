export type CasinoGame = {
  id: string;
  name: string;
  provider: string;
  category: "roulette" | "blackjack" | "baccarat" | "game-show" | "poker";
  players: number;
  minBet: number;
  featured?: boolean;
};

export const LIVE_CASINO_GAMES: CasinoGame[] = [
  {
    id: "live-roulette",
    name: "Live Roulette",
    provider: "Evolution",
    category: "roulette",
    players: 842,
    minBet: 1,
    featured: true,
  },
  {
    id: "lightning-roulette",
    name: "Lightning Roulette",
    provider: "Evolution",
    category: "roulette",
    players: 1204,
    minBet: 1,
    featured: true,
  },
  {
    id: "live-blackjack",
    name: "Live Blackjack",
    provider: "Pragmatic Play",
    category: "blackjack",
    players: 567,
    minBet: 5,
    featured: true,
  },
  {
    id: "speed-baccarat",
    name: "Speed Baccarat",
    provider: "Evolution",
    category: "baccarat",
    players: 391,
    minBet: 1,
  },
  {
    id: "crazy-time",
    name: "Crazy Time",
    provider: "Evolution",
    category: "game-show",
    players: 2103,
    minBet: 0.5,
    featured: true,
  },
  {
    id: "mega-ball",
    name: "Mega Ball",
    provider: "Evolution",
    category: "game-show",
    players: 678,
    minBet: 0.5,
  },
  {
    id: "dragon-tiger",
    name: "Dragon Tiger",
    provider: "Pragmatic Play",
    category: "baccarat",
    players: 445,
    minBet: 1,
  },
  {
    id: "casino-holdem",
    name: "Casino Hold'em",
    provider: "Evolution",
    category: "poker",
    players: 289,
    minBet: 2,
  },
];

export const CATEGORY_LABELS: Record<CasinoGame["category"], string> = {
  roulette: "Roulette",
  blackjack: "Blackjack",
  baccarat: "Baccarat",
  "game-show": "Game Shows",
  poker: "Poker",
};
