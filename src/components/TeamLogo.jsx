import React from "react";

const TeamLogo = ({ team }) => {
  return (
    <img
      src={`images/${team.name.toLowerCase().replace(" ", "-")}.png`}
      alt={team.full_name}
      style={{ height: "80px", paddingRight: "40px" }}
    />
  );
};

export default TeamLogo;
