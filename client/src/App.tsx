import React, { useEffect, useState } from "react";

interface Manager {
  id: string;
  name: string;
  reputation: number;
  currentClubId: string;
}

interface Facilities {
  training: number;
  youth: number;
  medical: number;
  stadium: number;
}

interface Club {
  id: string;
  name: string;
  division: number;
  budget: number;
  facilities: Facilities;
  fanHappiness: number;
}

interface PlayerAttributes {
  attack: number;
  defense: number;
  passing: number;
  stamina: number;
  potential: number;
}

interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  attributes: PlayerAttributes;
  morale: number;
  fitness: number;
}

interface MatchResult {
  homeGoals: number;
  awayGoals: number;
  events: string[];
}

function App() {
  const [manager, setManager] = useState<Manager | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [lastResult, setLastResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/manager")
      .then(r => r.json())
      .then((m: Manager) => {
        setManager(m);
        return fetch(`/api/club/${m.currentClubId}`);
      })
      .then(r => r.json())
      .then(({ club, players }) => {
        setClub(club);
        setPlayers(players);
      })
      .catch(err => console.error(err));
  }, []);

  const playMatch = () => {
    setLoading(true);
    fetch("/api/match/simulate", { method: "POST" })
      .then(r => r.json())
      .then(data => {
        setLastResult(data.result);
        setClub(data.managerClub);
        setManager(data.manager);
      })
      .finally(() => setLoading(false));
  };

  if (!manager || !club) return <div>Loading career...</div>;

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Grassroots to Glory (Prototype)</h1>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Manager</h2>
        <p>
          {manager.name} • Reputation: {manager.reputation}
        </p>
        <p>
          Club: {club.name} (Division {club.division}) • Fans:{" "}
          {club.fanHappiness}/100
        </p>
        <p>Budget: €{club.budget.toLocaleString()}</p>
      </section>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Squad (first 11)</h2>
        <ul>
          {players.slice(0, 11).map(p => (
            <li key={p.id}>
              {p.name} ({p.position}) – Att {p.attributes.attack}, Def{" "}
              {p.attributes.defense}, Morale {p.morale}, Fit {p.fitness}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Next Match</h2>
        <button onClick={playMatch} disabled={loading}>
          {loading ? "Simulating..." : "Play Friendly"}
        </button>
        {lastResult && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Result</h3>
            <p>
              Score: {lastResult.homeGoals} - {lastResult.awayGoals}
            </p>
            <ul>
              {lastResult.events.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
