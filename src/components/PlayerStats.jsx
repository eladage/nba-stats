import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import PlayerDetailView from "./PlayerDetailView";
import { headers } from "../common/constants";

const PlayerStats = ({ player }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState([]);

  const getPlayerStats = async () => {
    try {
      const response = await axios.get(
        `https://free-nba.p.rapidapi.com/stats?player_ids[]=${player.player.id}&seasons[]=${player.game.season}`,
        {
          params: { per_page: "100", page: "0" },
          headers,
        }
      );

      const sortedStats = response.data.data.sort((a, b) => {
        return a.game.date > b.game.date ? -1 : 1;
      });

      setPlayerStats(sortedStats);
    } catch {
      console.log("player not found");
    }
  };

  const handlePlayerClick = () => {
    getPlayerStats();
    setModalOpen(true);
  };
  return (
    <>
      <tr onClick={handlePlayerClick} style={{ cursor: "pointer" }}>
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
      <Modal
        show={isModalOpen}
        onHide={() => setModalOpen(false)}
        size="fullscreen"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {player.player.last_name}, {player.player.first_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{`${player.game.season} Season`}</h4>
          <PlayerDetailView playerStats={playerStats} />
        </Modal.Body>
        <Modal.Footer>
          <div>Test</div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlayerStats;
