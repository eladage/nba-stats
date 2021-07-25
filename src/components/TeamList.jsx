import React from "react";
import PropTypes from "prop-types";
import "./TeamList.css";
import TeamShape from "../propTypes/TeamShape";
import Button from "react-bootstrap/Button";

const propTypes = {
  teams: TeamShape.isRequired,
  onSelectTeam: PropTypes.func.isRequired,
};
const TeamList = ({ teams, onSelectTeam }) => {
  return (
    <div className="TeamList">
      {teams.map((team) => (
        <Button key={team.id} onClick={() => onSelectTeam(team)} size="sm">
          {team.full_name}
        </Button>
      ))}
    </div>
  );
};

TeamList.propTypes = propTypes;
export default TeamList;
