import React, { useEffect, useState } from "react";
import "./Grid.css";
import Grid from "./Grid";
import Pagination from "./Pagination";

const GridMain = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("https://worldcup.sfg.io/matches")
      .then(response => response.json())
      .then(matches => setMatches(matches));
  }, []);

  return (
    <div className="grid-main">
      <h1>All World Cup Matches 2019</h1>
      {matches.length > 0 && (
        <>
          <Grid matches={matches} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default GridMain;
