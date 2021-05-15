import React from "react";

const GridRow = ({ match }) => {
  return (
    <tr>
      <td>{match.gameNumber}</td>
      <td>{match.dateString}</td>
      <td>{match.stage_name}</td>
      <td>{match.location}</td>
      <td>{match.venue}</td>
      <td>{match.home_team_country}</td>
      <td>{match.away_team_country}</td>
      <td>{match.score}</td>
      <td>{match.attendance}</td>
    </tr>
  );
};

export default GridRow;
