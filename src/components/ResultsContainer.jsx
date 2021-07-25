import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResultsContainer.css";
import { headers } from "../common/constants";
import TeamList from "./TeamList";
import TeamDetailView from "./TeamDetailView";

const ResultsContainer = () => {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [season, setSeason] = useState("2020");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://free-nba.p.rapidapi.com/teams?page=0",
        { headers }
      );

      setTeams(response.data.data);
    } catch {
      console.log("wtf");
    }
  };

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

  useEffect(() => {
    fetchTeams();
  }, []);

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
      <TeamList teams={teams} onSelectTeam={handleTeamClick} />
      <TeamDetailView
        team={selectedTeam}
        games={games}
        season={season}
        onSelectSeason={handleSelectSeason}
      />
    </div>
  );
};
export default ResultsContainer;
