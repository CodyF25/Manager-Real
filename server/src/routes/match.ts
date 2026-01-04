import { Router } from "express";
import { world } from "../index";
import { simulateMatch } from "../services/matchEngine";

export const matchRouter = Router();

matchRouter.post("/simulate", (req, res) => {
  const managerClub = world.clubs.find(
    c => c.id === world.manager.currentClubId
  );
  if (!managerClub) {
    return res.status(500).json({ error: "Manager club missing" });
  }

  const homePlayers = world.players.filter(
    p => p.clubId === managerClub.id
  );

  const aiClub = {
    id: "ai-1",
    name: "County United",
    division: managerClub.division,
    budget: 400_000,
    facilities: managerClub.facilities,
    fanHappiness: 50
  };

  const awayPlayers = homePlayers.map(p => ({
    ...p,
    id: `ai-${p.id}`,
    clubId: aiClub.id
  }));

  const result = simulateMatch({
    homeClub: managerClub,
    awayClub: aiClub,
    homePlayers,
    awayPlayers
  });

  if (result.homeGoals > result.awayGoals) {
    managerClub.fanHappiness = Math.min(
      100,
      managerClub.fanHappiness + 3
    );
    world.manager.reputation = Math.min(
      100,
      world.manager.reputation + 1
    );
  } else if (result.homeGoals < result.awayGoals) {
    managerClub.fanHappiness = Math.max(
      0,
      managerClub.fanHappiness - 3
    );
  }

  res.json({
    result,
    managerClub,
    manager: world.manager
  });
});
