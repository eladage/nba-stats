import React from "react";
import Table from "react-bootstrap/Table";

const PlayerDetailView = ({ playerStats }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Minutes</th>
          <th>FGM</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>Assists</th>
          <th>Rebounds</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {playerStats.map((stat) => (
          <tr>
            <td>
              {new Date(stat.game.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </td>
            <td>{stat.min}</td>
            <td>{stat.fgm}</td>
            <td>{stat.fga}</td>
            <td>{stat.fga ? Math.floor((stat.fgm / stat.fga) * 100) : "--"}</td>
            <td>{stat.ast}</td>
            <td>{stat.reb}</td>
            <td>{stat.pts}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayerDetailView;
