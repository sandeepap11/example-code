import React, { useEffect, useState } from "react";
import "./Grid.css";
import Grid from "./Grid";
import Pagination from "./Pagination";

const ROWS_PER_PAGE = 10;

const GridMain = () => {
  const [matches, setMatches] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("https://worldcup.sfg.io/matches")
      .then(response => response.json())
      .then(matches => {
        setMatches(matches);
      });
  }, []);

  let filteredMatches = matches.filter(
    match =>
      match.location.includes(searchText) ||
      match.venue.includes(searchText) ||
      match.weather.description.includes(searchText) ||
      match.home_team_country.includes(searchText) ||
      match.away_team_country.includes(searchText) ||
      match.attendance.includes(searchText)
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
            pageNumber={pageNumber}
            updateSearchText={setSearchText}
            setPageNumber={setPageNumber}
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
