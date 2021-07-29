import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { teams } from "../common/team-data";
import "./TeamDetailView.css";
import GameDetailView from "./GameDetailView";
import TeamLogo from "./TeamLogo";
import * as logo from "../logos/team-logos/index";

const TeamDetailView = ({
  team,
  games,
  season,
  onSelectSeason,
  onSelectTeam,
}) => {
  return (
    <div className="team-detail-view">
      <>
        <Navbar variant="dark" bg="dark" expand="lg">
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
            </Navbar.Collapse>
            <Navbar.Collapse id="navbar-dark-example">
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
            <Card.Body className="team-location-info">
              <TeamLogo team={team} />
              <div style={{ margin: "10px" }}>
                <Card.Title>Conference</Card.Title>
                <Card.Text>{team.conference}</Card.Text>
              </div>
              <div style={{ margin: "10px" }}>
                <Card.Title>Division</Card.Title>
                <Card.Text>{team.division}</Card.Text>
              </div>
            </Card.Body>
            <Card.Header>Games</Card.Header>
            <ListGroup variant="flush">
              <Accordion defaultActiveKey="0">
                {games.length
                  ? games.map((game) => (
                      <GameDetailView key={game.id} team={team} game={game} />
                    ))
                  : "Loading..."}
              </Accordion>
            </ListGroup>
          </>
        ) : (
          <div>"pick a team, coward"</div>
        )}
      </>
    </div>
  );
};

export default TeamDetailView;
