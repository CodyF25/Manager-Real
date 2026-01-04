import { MatchResult, Player, Club } from "../types";

interface MatchInput {
  homeClub: Club;
  awayClub: Club;
  homePlayers: Player[];
  awayPlayers: Player[];
}

const avg = (nums: number[]) =>
  nums.reduce((a, b) => a + b, 0) / (nums.length || 1);

export function simulateMatch(input: MatchInput): MatchResult {
  const { homeClub, awayClub, homePlayers, awayPlayers } = input;

  const homeAttack = avg(
    homePlayers.map(
      p => p.attributes.attack + p.attributes.passing + p.morale / 2
    )
  );
  const awayAttack = avg(
    awayPlayers.map(
      p => p.attributes.attack + p.attributes.passing + p.morale / 2
    )
  );

  const homeDefense = avg(
    homePlayers.map(p => p.attributes.defense + p.fitness / 2)
  );
  const awayDefense = avg(
    awayPlayers.map(p => p.attributes.defense + p.fitness / 2)
  );

  const homeRating = homeAttack * 0.6 + homeDefense * 0.4 + 5; // home bonus
  const awayRating = awayAttack * 0.6 + awayDefense * 0.4;

  const ratingToGoals = (rating: number) => {
    const base = Math.max(0, (rating - 40) / 20);
    const goals = Math.round(base + Math.random() * 2);
    return Math.max(0, goals);
  };

  const homeGoals = ratingToGoals(homeRating);
  const awayGoals = ratingToGoals(awayRating);

  const events: string[] = [
    `${homeClub.name} ${homeGoals} - ${awayGoals} ${awayClub.name}`
  ];

  if (homeGoals > awayGoals) {
    events.push(`${homeClub.name} delight fans with a win.`);
  } else if (awayGoals > homeGoals) {
    events.push(`${awayClub.name} silence the home crowd.`);
  } else {
    events.push("A tight match ends in a draw.");
  }

  return { homeGoals, awayGoals, events };
}
