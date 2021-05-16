import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import GridRow from "./GridRow";
import { onReturnKeyPress } from "./Pagination";

const Grid = ({
  matches,
  rowsPerPage,
  updateSearchText,
  setPageNumber,
  sortHeader,
  setSortHeader,
  setSortDirection,
}) => {
  const [searchText, setSearchText] = useState("");

  let emptyRows = [];

  if (rowsPerPage > matches.length) {
    for (let i = 0; i < rowsPerPage - matches.length; i++) {
      emptyRows.push(i);
    }
  }

  const onSearch = (text) => {
    setSearchText(text);
    updateSearchText(text);
    setPageNumber(1);
  };

  const onSort = (sortHeader, sortDirection) => {
    setSortHeader(sortHeader);
    setSortDirection(sortDirection);
    setPageNumber(1);
  };

  return (
    <>
      <div className="grid-search">
        <input
          type="text"
          placeholder="Type to search"
          value={searchText}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
      <table className="grid-container">
        <thead>
          <tr>
            <th>
              <div className="header">
                NO.
                <SortHandle
                  parameter={"gameNumber"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                DATE
                <SortHandle
                  parameter={"dateString"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                STAGE
                <SortHandle
                  parameter={"stage_name"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                STADIUM
                <SortHandle
                  parameter={"location"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                CITY
                <SortHandle
                  parameter={"venue"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                TEAM 1
                <SortHandle
                  parameter={"home_team_country"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                TEAM 2
                <SortHandle
                  parameter={"away_team_country"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                SCORE
                <SortHandle
                  parameter={"score"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
            <th>
              <div className="header">
                ATTENDANCE
                <SortHandle
                  parameter={"attendance"}
                  {...{
                    sortHeader,
                    onSort,
                  }}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="grid-body">
          {matches.map((match) => (
            <GridRow key={match.fifa_id} match={match} />
          ))}
          {rowsPerPage > matches.length &&
            emptyRows.map((emptyRow) => (
              <tr key={emptyRow} className="grid-row-empty"></tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const SortHandle = ({ parameter, sortHeader, onSort }) => {
  const [sortColumnOrder, setSortColumnOrder] = useState("");

  const changeSortOrder = () => {
    const sortDirection =
      parameter !== sortHeader
        ? "ASC"
        : sortColumnOrder === "ASC"
        ? "DESC"
        : sortColumnOrder === "DESC"
        ? "ASC"
        : "ASC";

    setSortColumnOrder(sortDirection);

    onSort(parameter, sortDirection);
  };

  return (
    <button
      className="grid-header-sort"
      onClick={changeSortOrder}
      onKeyDown={(event) => onReturnKeyPress(event, changeSortOrder)}
      aria-label={"sort by " + parameter}
    >
      <FontAwesomeIcon
        icon={
          parameter !== sortHeader
            ? faSort
            : sortColumnOrder === "ASC"
            ? faSortUp
            : sortColumnOrder === "DESC"
            ? faSortDown
            : faSort
        }
      />
    </button>
  );
};

export default Grid;
