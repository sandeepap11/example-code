import React from "react";
import GridRow from "./GridRow";

const Grid = ({ matches }) => {
  const matchesToShow = matches.slice(0, 10);

  return (
    <div className="grid-container">
      <div className="grid-header">
        <div className="grid-row-gamenumber">NO.</div>
        <div className="grid-row-datetime">DATE</div>
        <div className="grid-row-stage">STAGE</div>
        <div className="grid-row-location">STADIUM</div>
        <div className="grid-row-venue">CITY</div>
        <div className="grid-row-weather">WEATHER</div>
        <div className="grid-row-home">TEAM 1</div>
        <div className="grid-row-away">TEAM 2</div>
        <div className="grid-row-score">SCORE</div>
        <div className="grid-row-attendance">ATTENDANCE</div>
      </div>
      <div className="grid-body">
        {matchesToShow.map((match, index) => (
          <GridRow key={match.fifa_id} match={match} gameNumber={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
