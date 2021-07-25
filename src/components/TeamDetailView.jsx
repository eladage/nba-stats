import React from "react";
import moment from "moment";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./TeamDetailView.css";

const TeamDetailView = ({ team, games, season, onSelectSeason }) => {
  const checkForWinner = (game) => {
    const didHomeTeamWin = game.home_team_score > game.visitor_team_score;
    const dubText = <p style={{ color: "green" }}>W</p>;
    const loserText = <p style={{ color: "red" }}>L</p>;

    if (
      (game.home_team.id === team.id && didHomeTeamWin) ||
      (game.visitor_team.id === team.id && !didHomeTeamWin)
    ) {
      return dubText;
    } else return loserText;
  };

  return (
    <div className="TeamDetailView">
      {team ? (
        <>
          <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
              <Navbar.Brand>
                {team.full_name} ({season})
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-dark-example" />
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
          <Card.Body className="TeamLocationInfo">
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
            {games.length
              ? games.map((game) => (
                  <ListGroup.Item key={game.id}>
                    {checkForWinner(game)}
                    <p style={{}}>{game.date.split("T")[0]}</p>
                    <p>
                      {game.home_team.full_name} - {game.visitor_team.full_name}
                    </p>
                    <p>
                      {game.home_team_score} - {game.visitor_team_score}
                    </p>
                  </ListGroup.Item>
                ))
              : "Loading..."}
          </ListGroup>
        </>
      ) : (
        "pick a team, coward"
      )}
    </div>
  );
};

export default TeamDetailView;
