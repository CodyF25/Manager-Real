export type Position = "GK" | "DEF" | "MID" | "FWD";

export interface PlayerAttributes {
  attack: number;
  defense: number;
  passing: number;
  stamina: number;
  potential: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  position: Position;
  attributes: PlayerAttributes;
  morale: number; // 0–100
  fitness: number; // 0–100
  clubId: string;
}

export interface Facilities {
  training: number; // 1–5
  youth: number;
  medical: number;
  stadium: number;
}

export interface Club {
  id: string;
  name: string;
  division: number;
  budget: number;
  facilities: Facilities;
  fanHappiness: number; // 0–100
}

export interface Manager {
  id: string;
  name: string;
  reputation: number; // 0–100
  currentClubId: string;
}

export interface MatchResult {
  homeGoals: number;
  awayGoals: number;
  events: string[];
}
