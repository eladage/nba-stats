import React, { useState } from "react";

import Collapse from "react-bootstrap/Collapse";

const PlayerStats = ({ player }) => {
  const [isPlayerDetailExpanded, setPlayerDetailExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setPlayerDetailExpanded(!isPlayerDetailExpanded)}>
        <td>{player.min}</td>
        <td>{player.player.first_name}</td>
        <td>{player.player.last_name}</td>
        <td>{player.fgm}</td>
        <td>{player.fga}</td>
        <td>
          {player.fga ? Math.floor((player.fgm / player.fga) * 100) : "--"}
        </td>
        <td>{player.ast}</td>
        <td>{player.reb}</td>
        <td>{player.pts}</td>
      </tr>
      <Collapse in={isPlayerDetailExpanded}>
        <h3 id="example-collapse-text">
          {player.player.last_name}, {player.player.first_name}
        </h3>
      </Collapse>
    </>
  );
};

export default PlayerStats;
