import React from "react";
import Table from "react-bootstrap/Table";

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
          <tr key={player.id}>
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
        ))}
      </tbody>
    </Table>
  );
};

export default BoxScore;
