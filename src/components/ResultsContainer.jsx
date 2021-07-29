import React, { useState } from "react";
import axios from "axios";
import "./ResultsContainer.css";
import { headers } from "../common/constants";
import TeamDetailView from "./TeamDetailView";

const ResultsContainer = () => {
  const [games, setGames] = useState([]);
  const [season, setSeason] = useState("2020");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeamGames = async (team, season) => {
    try {
      setGames([]);
      const response = await axios.get(
        `https://free-nba.p.rapidapi.com/games?seasons[]=${season}&team_ids[]=${team.id}&per_page=82&page=0"`,
        { headers }
      );

      const sortedGames = response.data.data.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });

      setGames(sortedGames);
    } catch {
      console.error("error fetching team details");
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    fetchTeamGames(team, season);
  };

  const handleSelectSeason = (season) => {
    setSeason(season);
    fetchTeamGames(selectedTeam, season);
  };

  return (
    <div className="ResultsContainer">
      <TeamDetailView
        team={selectedTeam}
        games={games}
        season={season}
        onSelectTeam={handleTeamClick}
        onSelectSeason={handleSelectSeason}
      />
    </div>
  );
};
export default ResultsContainer;
