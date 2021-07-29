import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { headers } from "../common/constants";
import BoxScore from "./BoxScore";

const GameDetailView = ({ game, team }) => {
  const [isOpen, setOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState(null);

  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(
        `https://free-nba.p.rapidapi.com/stats?game_ids[]=${game.id}`,
        { headers }
      );

      setPlayerStats(response.data.data);
    } catch {
      console.log("wtf");
    }
  };

  const getGameDisplay = () => {
    const didHomeTeamWin = game.home_team_score > game.visitor_team_score;
    const isHomeTeam = game.home_team.id === team.id;
    const dubText = <div style={{ color: "green", paddingLeft: "5px" }}>W</div>;
    const loserText = <div style={{ color: "red", paddingLeft: "5px" }}>L</div>;

    const gameDisplay = isHomeTeam
      ? `${game.visitor_team.full_name} (${game.visitor_team_score} - ${game.home_team_score})`
      : `@ ${game.visitor_team.full_name} (${game.visitor_team_score} - ${game.home_team_score})`;

    if ((isHomeTeam && didHomeTeamWin) || (!isHomeTeam && !didHomeTeamWin)) {
      return (
        <>
          <div>{gameDisplay}</div>
          <div></div>
          {dubText}
        </>
      );
    } else
      return (
        <>
          <div>{gameDisplay}</div>
          {loserText}
        </>
      );
  };

  const handleGameDetailsClick = () => {
    if (!playerStats) {
      fetchPlayerStats();
    }

    setOpen(!isOpen);
  };

  return (
    <Accordion.Item eventKey={game.id} onClick={handleGameDetailsClick}>
      <Accordion.Header>{getGameDisplay()}</Accordion.Header>
      <Accordion.Body>
        {game.date.split("T")[0]}
        {playerStats ? (
          <BoxScore stats={playerStats} />
        ) : (
          <div id="loading-player-stats">Loading...</div>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default GameDetailView;
