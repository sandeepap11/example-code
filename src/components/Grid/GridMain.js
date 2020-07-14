import React, { useEffect, useState } from "react";
import "./Grid.css";
import Grid from "./Grid";

const GridMain = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    fetch("https://worldcup.sfg.io/matches")
      .then(response => response.json())
      .then(matches => {
        setMatches(matches);
      });
  }, []);

  let filteredMatches = matches.map((match, index) => {
    const matchDate = new Date(match.datetime);
    const dateValue = matchDate.toDateString().replace("2019", "");
    const timeString = matchDate.toTimeString();
    const dateString = `${dateValue.slice(
      4,
      dateValue.length
    )} ${timeString.slice(0, 5)}`;

    const gameNumber = index + 1;

    const stage_name =
      gameNumber > 36
        ? match.stage_name === "Match for third place"
          ? "Third Place"
          : match.stage_name
        : "Group Stage";

    return {
      ...match,
      gameNumber,
      dateString,
      stage_name,
      score: `${match.home_team.goals}-${match.away_team.goals}`
    };
  });

  return (
    <div className="grid-main">
      <h1>All World Cup Matches 2019</h1>
      {matches.length > 0 && (
        <>
          <Grid matches={filteredMatches} />
        </>
      )}
    </div>
  );
};

export default GridMain;
