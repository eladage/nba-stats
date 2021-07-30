import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { teams } from "../common/team-data";
import "./TeamDetailView.css";
import GameDetailView from "./GameDetailView";
import TeamLogo from "./TeamLogo";

const TeamDetailView = ({
  team,
  games,
  season,
  onSelectSeason,
  onSelectTeam,
}) => {
  const getRecord = () => {
    let wins = 0;
    let total = 0;
    games.forEach((game) => {
      if (!game.postseason && game.status === "Final") {
        total++;
        if (
          game.home_team.id === team.id &&
          game.home_team_score > game.visitor_team_score
        ) {
          wins++;
        } else if (
          game.visitor_team.id === team.id &&
          game.visitor_team_score > game.home_team_score
        ) {
          wins++;
        }
      }
    });

    return `${wins} - ${total - wins}`;
  };
  return (
    <div className="team-detail-view">
      <>
        <Navbar variant="dark" bg="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand>
              {team ? `${team.full_name} (${season})` : ""}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-teams"
                  title="Teams"
                  menuVariant="dark"
                >
                  {teams.map((team) => (
                    <NavDropdown.Item
                      key={team.id}
                      onClick={() => onSelectTeam(team)}
                    >
                      {team.full_name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-seasons"
                  title="Seasons"
                  menuVariant="dark"
                >
                  {[
                    "2020",
                    "2019",
                    "2018",
                    "2017",
                    "2016",
                    "2015",
                    "2014",
                    "2013",
                  ].map((season) => (
                    <NavDropdown.Item
                      key={season}
                      onClick={() => onSelectSeason(season)}
                    >
                      {season}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {team ? (
          <>
            <Card.Body
              className="team-location-info"
              style={{ backgroundColor: team.colors.color_1 }}
            >
              <TeamLogo team={team} />
              <div style={{ margin: "10px", color: "white" }}>
                <Card.Title>Record</Card.Title> <hr />
                <Card.Text>{getRecord()}</Card.Text>
              </div>{" "}
              <div style={{ margin: "10px", color: "white" }}>
                <Card.Title>Conference</Card.Title> <hr />
                <Card.Text>{team.conference}</Card.Text>
              </div>
              <div style={{ margin: "10px", color: "white" }}>
                <Card.Title>Division</Card.Title> <hr />
                <Card.Text>{team.division}</Card.Text>
              </div>
            </Card.Body>
            <Card.Header
              as="h4"
              style={{
                backgroundColor: team.colors.color_3
                  ? team.colors.color_3
                  : team.colors.color_2,
                color: team.colors.color_1,
              }}
            >
              Games
            </Card.Header>
            <ListGroup variant="flush">
              <Accordion defaultActiveKey="0">
                {games.length ? (
                  games.map((game) => (
                    <GameDetailView key={game.id} team={team} game={game} />
                  ))
                ) : (
                  <Spinner
                    className="loading-spinner"
                    animation="border"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Accordion>
            </ListGroup>
          </>
        ) : (
          <div className="team-placeholder">
            <p>
              <span>"pick a team, coward"</span>
              <br />
              <span>-Eric Ladage</span>
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default TeamDetailView;
