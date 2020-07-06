import React from "react";

const GridRow = ({ match }) => {
  return (
    <div className="grid-row-main">
      <div className="grid-row-gamenumber">{match.gameNumber}</div>
      <div className="grid-row-datetime">{match.dateString}</div>
      <div className="grid-row-stage">{match.stage_name}</div>
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
