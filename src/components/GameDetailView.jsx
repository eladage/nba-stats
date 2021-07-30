import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import { headers } from "../common/constants";
import BoxScore from "./BoxScore";

const GameDetailView = ({ game, team }) => {
  const [playerStats, setPlayerStats] = useState(null);

  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(
        `https://free-nba.p.rapidapi.com/stats?game_ids[]=${game.id}`,
        { headers }
      );

      const sortedPlayerStats = response.data.data.sort((a, b) => {
        return Number(a.min.split(":")[0]) > Number(b.min.split(":")[0])
          ? -1
          : 1;
      });

      setPlayerStats(sortedPlayerStats);
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
      ? `${game.visitor_team.full_name} (${game.visitor_team_score} - ${
          game.home_team_score
        })${game.postseason ? " *" : ""}`
      : `@ ${game.home_team.full_name} (${game.visitor_team_score} - ${
          game.home_team_score
        })${game.postseason ? " *" : ""}`;

    if ((isHomeTeam && didHomeTeamWin) || (!isHomeTeam && !didHomeTeamWin)) {
      return (
        <>
          <div>{gameDisplay}</div>
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
  };

  return (
    <Accordion.Item eventKey={game.id} onClick={handleGameDetailsClick}>
      <Accordion.Header>{getGameDisplay()}</Accordion.Header>
      <Accordion.Body>
        <h4 style={{ textAlign: "center" }}>
          {new Date(game.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>
        {playerStats ? (
          <BoxScore stats={playerStats} />
        ) : (
          <Spinner className="loading-spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default GameDetailView;
