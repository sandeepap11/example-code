import React, { useEffect, useState } from "react";
import "./Grid.css";
import Grid from "./Grid";
import Pagination from "./Pagination";

const ROWS_PER_PAGE = 10;

const GridMain = () => {
  const [matches, setMatches] = useState([]);
  const [matchesToShow, setMatchesToShow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    fetch("https://worldcup.sfg.io/matches")
      .then(response => response.json())
      .then(matches => {
        setMatches(matches);
        setMatchesToShow(matches.slice(0, ROWS_PER_PAGE));
      });
  }, []);

  const getMatchesByPageNumber = pageNumber => {
    const totalPages = matches / ROWS_PER_PAGE;
    if (pageNumber > totalPages || pageNumber < 1) return;

    setMatchesToShow(
      matches.slice(
        (pageNumber - 1) * ROWS_PER_PAGE,
        pageNumber * ROWS_PER_PAGE
      )
    );
    setPageNumber(pageNumber);
  };

  const totalPages = parseFloat(
    (matches.length / ROWS_PER_PAGE).toString().split(".")[0]
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
          />
          <Pagination
            getMatchesByPageNumber={getMatchesByPageNumber}
            pageNumber={pageNumber}
            rowsPerPage={ROWS_PER_PAGE}
            rowsInCurrentPage={matchesToShow.length}
            totalRows={matches.length}
            totalPages={
              totalPages % ROWS_PER_PAGE === 0 ? totalPages : totalPages + 1
            }
          />
        </>
      )}
    </div>
  );
};

export default GridMain;
