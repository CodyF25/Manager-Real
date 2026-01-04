import { Club, Manager, Player, PlayerAttributes, Position } from "./types";

export interface World {
  clubs: Club[];
  players: Player[];
  manager: Manager;
}

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = <T>(arr: T[]): T => arr[randomBetween(0, arr.length - 1)];

const POSITIONS: Position[] = ["GK", "DEF", "MID", "FWD"];

function generatePlayer(idSuffix: number, clubId: string): Player {
  const position = randomFrom(POSITIONS);
  const base = randomBetween(30, 60);

  const attrs: PlayerAttributes = {
    attack: base + randomBetween(-10, 10),
    defense: base + randomBetween(-10, 10),
    passing: base + randomBetween(-10, 10),
    stamina: base + randomBetween(-10, 10),
    potential: base + randomBetween(0, 20)
  };

  return {
    id: `p-${idSuffix}`,
    name: `Player ${idSuffix}`,
    age: randomBetween(18, 33),
    position,
    attributes: attrs,
    morale: randomBetween(40, 80),
    fitness: randomBetween(60, 100),
    clubId
  };
}

export function initWorld(): World {
  const club: Club = {
    id: "club-1",
    name: "Westport Town",
    division: 4,
    budget: 500_000,
    facilities: {
      training: 1,
      youth: 1,
      medical: 1,
      stadium: 1
    },
    fanHappiness: 60
  };

  const players: Player[] = [];
  for (let i = 1; i <= 22; i += 1) {
    players.push(generatePlayer(i, club.id));
  }

  const manager: Manager = {
    id: "m-1",
    name: "New Manager",
    reputation: 10,
    currentClubId: club.id
  };

  return {
    clubs: [club],
    players,
    manager
  };
}
