import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faBackward,
  faForward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  getMatchesByPageNumber,
  pageNumber,
  rowsPerPage,
  rowsInCurrentPage,
  totalRows,
  totalPages
}) => {
  const [currentPageNumber, setNewCurrentPageNumber] = useState(pageNumber);

  const updatePageNumber = currentPageNumberValue => {
    if (
      isNaN(currentPageNumberValue) ||
      Number(currentPageNumberValue) > totalPages ||
      Number(currentPageNumberValue) < 1
    ) {
      setNewCurrentPageNumber(pageNumber);
    } else {
      setNewCurrentPageNumber(Number(currentPageNumberValue));
      getMatchesByPageNumber(Number(currentPageNumberValue));
    }
  };

  return (
    <div className="pagination-main">
      <div className="pagination-control">
        <PaginationControl
          icon={faStepBackward}
          onClick={() => updatePageNumber(1)}
          isDisabled={pageNumber === 1}
        />
        <PaginationControl
          icon={faBackward}
          onClick={() => updatePageNumber(pageNumber - 1)}
          isDisabled={pageNumber === 1}
        />
        <div className="pagination-page-input-control">
          <div className="pagination-page-control">
            <input
              type="text"
              className="pagination-page-input"
              onChange={event => setNewCurrentPageNumber(event.target.value)}
              onBlur={() => updatePageNumber(currentPageNumber)}
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  event.target.blur();
                }
              }}
              value={currentPageNumber}
            />
          </div>
          <div className="pagination-page-control pagination-page-input">
            {" "}
            / {totalPages}
          </div>
        </div>
        <PaginationControl
          icon={faForward}
          onClick={() => updatePageNumber(pageNumber + 1)}
          isDisabled={pageNumber === totalPages}
        />
        <PaginationControl
          icon={faStepForward}
          onClick={() => updatePageNumber(totalPages)}
          isDisabled={pageNumber === totalPages}
        />
      </div>
      <div className="pagination-info">
        {" "}
        {(pageNumber - 1) * rowsPerPage + 1} -{" "}
        {(pageNumber - 1) * rowsPerPage + rowsInCurrentPage} rows of {totalRows}
      </div>
    </div>
  );
};

const PaginationControl = ({ icon, onClick, isDisabled }) => {
  return (
    <div
      className={
        isDisabled
          ? "pagination-page-control-disabled"
          : "pagination-page-control"
      }
      onClick={() => {
        console.log("clicketh", isDisabled);

        if (!isDisabled) onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default Pagination;
