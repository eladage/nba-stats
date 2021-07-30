import React from "react";
import Table from "react-bootstrap/Table";
import PlayerStats from "./PlayerStats";

const BoxScore = ({ stats }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Minutes</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>FGM</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>Assists</th>
          <th>Rebounds</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((player) => (
          <PlayerStats key={player.id} player={player} />
        ))}
      </tbody>
    </Table>
  );
};

export default BoxScore;
