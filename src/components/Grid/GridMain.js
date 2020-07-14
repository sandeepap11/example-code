import React, { useEffect, useState } from "react";
import "./Grid.css";
import Grid from "./Grid";
import Pagination from "./Pagination";

const ROWS_PER_PAGE = 10;

const GridMain = () => {
  const [matches, setMatches] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortHeader, setSortHeader] = useState("");
  const [sortDirection, setSortDirection] = useState("");
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

  if (filteredMatches && filteredMatches !== "")
    filteredMatches = filteredMatches.filter(
      match =>
        match.gameNumber.toString().includes(searchText) ||
        match.dateString.toLowerCase().includes(searchText.toLowerCase()) ||
        match.stage_name.toLowerCase().includes(searchText.toLowerCase()) ||
        match.location.toLowerCase().includes(searchText.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchText.toLowerCase()) ||
        match.home_team_country
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        match.away_team_country
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        match.score.toLowerCase().includes(searchText.toLowerCase()) ||
        match.attendance.toLowerCase().includes(searchText.toLowerCase())
    );

  if (
    sortHeader &&
    sortDirection &&
    sortHeader !== "" &&
    (sortDirection === "ASC" || sortDirection === "DESC")
  )
    filteredMatches = filteredMatches.sort((matchA, matchB) =>
      sortDirection === "ASC"
        ? matchA[sortHeader] > matchB[sortHeader]
          ? 1
          : -1
        : matchA[sortHeader] > matchB[sortHeader]
        ? -1
        : 1
    );

  const totalPages = parseFloat(
    (filteredMatches.length / ROWS_PER_PAGE).toString().split(".")[0]
  );

  const matchesToShow = filteredMatches.slice(
    (pageNumber - 1) * ROWS_PER_PAGE,
    pageNumber * ROWS_PER_PAGE
  );

  return (
    <div className="grid-main">
      <h1>All World Cup Matches 2019</h1>
      {matches.length > 0 && (
        <>
          <Grid
            matches={matchesToShow}
            rowsPerPage={ROWS_PER_PAGE}
            updateSearchText={setSearchText}
            setPageNumber={setPageNumber}
            sortHeader={sortHeader}
            setSortHeader={setSortHeader}
            setSortDirection={setSortDirection}
          />
          <Pagination
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            rowsPerPage={ROWS_PER_PAGE}
            rowsInCurrentPage={matchesToShow.length}
            totalRows={filteredMatches.length}
            totalPages={
              filteredMatches.length % ROWS_PER_PAGE === 0
                ? totalPages
                : totalPages + 1
            }
          />
        </>
      )}
    </div>
  );
};

export default GridMain;
