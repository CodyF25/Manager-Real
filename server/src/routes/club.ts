import { Router } from "express";
import { world } from "../index";

export const clubRouter = Router();

clubRouter.get("/:id", (req, res) => {
  const club = world.clubs.find(c => c.id === req.params.id);
  if (!club) {
    return res.status(404).json({ error: "Club not found" });
  }

  const players = world.players.filter(p => p.clubId === club.id);
  res.json({ club, players });
});
