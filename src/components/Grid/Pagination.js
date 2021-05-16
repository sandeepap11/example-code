import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faBackward,
  faForward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

const RETURN_KEY_CODE = 13;
export const onReturnKeyPress = (event, actionMethod) => {
  if (event.keyCode === RETURN_KEY_CODE) actionMethod();
};

const Pagination = ({
  setPageNumber,
  pageNumber,
  rowsPerPage,
  rowsInCurrentPage,
  totalRows,
  totalPages,
}) => {
  const [currentPageNumber, setNewCurrentPageNumber] = useState(pageNumber);

  useEffect(() => setNewCurrentPageNumber(pageNumber), [pageNumber]);

  const updatePageNumber = (currentPageNumberValue) => {
    if (
      isNaN(currentPageNumberValue) ||
      Number(currentPageNumberValue) > totalPages ||
      Number(currentPageNumberValue) < 1
    ) {
      setNewCurrentPageNumber(pageNumber);
    } else {
      setNewCurrentPageNumber(Number(currentPageNumberValue));
      setPageNumber(Number(currentPageNumberValue));
    }
  };

  return (
    <div className="pagination-main">
      <div className="pagination-control">
        <PaginationControl
          icon={faStepBackward}
          onClick={() => updatePageNumber(1)}
          isDisabled={pageNumber === 1}
          label={"Go to First Page"}
        />
        <PaginationControl
          icon={faBackward}
          onClick={() => updatePageNumber(pageNumber - 1)}
          isDisabled={pageNumber === 1}
          label={"Go to Previous Page"}
        />
        <div className="pagination-page-input-control">
          <div className="pagination-page-control">
            <input
              type="text"
              className="pagination-page-input"
              onChange={(event) => setNewCurrentPageNumber(event.target.value)}
              onBlur={() => updatePageNumber(currentPageNumber)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  event.target.blur();
                }
              }}
              value={currentPageNumber}
              aria-label="Go to Page Number"
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
          label={"Go to Next Page"}
        />
        <PaginationControl
          icon={faStepForward}
          onClick={() => updatePageNumber(totalPages)}
          isDisabled={pageNumber === totalPages}
          label={"Go to Last Page"}
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

const PaginationControl = ({ icon, onClick, isDisabled, label }) => {
  return (
    <button
      className={
        isDisabled
          ? "pagination-page-control-disabled"
          : "pagination-page-control"
      }
      onClick={() => {
        if (!isDisabled) onClick();
      }}
      onKeyDown={(event) =>
        onReturnKeyPress(event, () => {
          if (!isDisabled) onClick();
        })
      }
      aria-disabled={isDisabled}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Pagination;
