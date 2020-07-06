import React, { useState } from "react";
import GridRow from "./GridRow";

const Grid = ({
  matches,
  rowsPerPage,
  pageNumber,
  updateSearchText,
  setPageNumber
}) => {
  let emptyRows = [];

  if (rowsPerPage > matches.length) {
    for (let i = 0; i < rowsPerPage - matches.length; i++) {
      emptyRows.push(i);
    }
  }

  const [searchText, setSearchText] = useState("");

  const onSearch = text => {
    setSearchText(text);
    updateSearchText(text);
    setPageNumber(1);
  };

  return (
    <div className="grid-container">
      <div>
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
        <div className="grid-search">
          <input
            type="text"
            placeholder="Type to search"
            value={searchText}
            onChange={event => onSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="grid-body">
        {matches.map(match => (
          <GridRow key={match.fifa_id} match={match} />
        ))}
        {rowsPerPage > matches.length &&
          emptyRows.map(emptyRow => (
            <div key={emptyRow} className="grid-row-empty"></div>
          ))}
      </div>
    </div>
  );
};

export default Grid;
