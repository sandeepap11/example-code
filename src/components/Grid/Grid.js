import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown
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
  setSortDirection
}) => {
  const [searchText, setSearchText] = useState("");

  let emptyRows = [];

  if (rowsPerPage > matches.length) {
    for (let i = 0; i < rowsPerPage - matches.length; i++) {
      emptyRows.push(i);
    }
  }

  const onSearch = text => {
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
    <div className="grid-container">
      <div>
        <div className="grid-header">
          <div className="grid-row-gamenumber">
            NO.
            <SortHandle
              parameter={"gameNumber"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-datetime">
            DATE
            <SortHandle
              parameter={"dateString"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-stage">
            STAGE
            <SortHandle
              parameter={"stage_name"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-location">
            STADIUM
            <SortHandle
              parameter={"location"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-venue">
            CITY
            <SortHandle
              parameter={"venue"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-home">
            TEAM 1
            <SortHandle
              parameter={"home_team_country"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-away">
            TEAM 2
            <SortHandle
              parameter={"away_team_country"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-score">
            SCORE
            <SortHandle
              parameter={"score"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
          <div className="grid-row-attendance">
            ATTENDANCE
            <SortHandle
              parameter={"attendance"}
              {...{
                sortHeader,
                onSort
              }}
            />
          </div>
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
    <div
      className="grid-geader-sort"
      onClick={changeSortOrder}
      onKeyDown={event => onReturnKeyPress(event, changeSortOrder)}
      tabIndex={0}
      role="button"
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
    </div>
  );
};

export default Grid;
