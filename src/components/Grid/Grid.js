import React from "react";
import GridRow from "./GridRow";

const Grid = ({ matches, rowsPerPage }) => {
  let emptyRows = [];

  if (rowsPerPage > matches.length) {
    for (let i = 0; i < rowsPerPage - matches.length; i++) {
      emptyRows.push(i);
    }
  }

  return (
    <table className="grid-container">
      <thead>
        <tr>
          <th>NO.</th>
          <th>DATE</th>
          <th>STAGE</th>
          <th>STADIUM</th>
          <th>CITY</th>
          <th>TEAM 1</th>
          <th>TEAM 2</th>
          <th>SCORE</th>
          <th>ATTENDANCE</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => (
          <GridRow key={match.fifa_id} match={match} />
        ))}
        {rowsPerPage > matches.length &&
          emptyRows.map((emptyRow) => (
            <div key={emptyRow} className="grid-row-empty"></div>
          ))}
      </tbody>
    </table>
  );
};

export default Grid;
