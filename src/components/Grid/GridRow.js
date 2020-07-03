import React from "react";

const GridRow = ({ match, gameNumber }) => {
  const matchDate = new Date(match.datetime);
  const dateString = matchDate.toDateString().replace("2019", "");
  const timeString = matchDate.toTimeString();

  const displayDate = `${dateString.slice(
    4,
    dateString.length
  )} ${timeString.slice(0, 5)}`;

  return (
    <div className="grid-row-main">
      <div className="grid-row-gamenumber">{gameNumber}</div>
      <div className="grid-row-datetime">{displayDate}</div>
      <div className="grid-row-stage">
        {gameNumber > 36
          ? match.stage_name === "Match for third place"
            ? "Third Place"
            : match.stage_name
          : "Group Stage"}
      </div>
      <div className="grid-row-location">{match.location}</div>
      <div className="grid-row-venue">{match.venue}</div>
      <div className="grid-row-weather">
        {match.weather.description.replace("Night", "")}
      </div>
      <div className="grid-row-home">{match.home_team_country}</div>
      <div className="grid-row-away">{match.away_team_country}</div>
      <div className="grid-row-score">
        {match.home_team.goals}-{match.away_team.goals}
      </div>
      <div className="grid-row-attendance">{match.attendance}</div>
    </div>
  );
};

export default GridRow;
