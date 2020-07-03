import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faBackward,
  faForward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";

const Pagination = () => {
  return (
    <div className="pagination-main">
      <div className="pagination-control">
        <PaginationControl icon={faStepBackward} />
        <PaginationControl icon={faBackward} />
        <div className="pagination-page-control"></div>
        <PaginationControl icon={faForward} />
        <PaginationControl icon={faStepForward} />
      </div>
      <div className="pagination-info"> 10 rows of 123</div>
    </div>
  );
};

const PaginationControl = ({ icon }) => {
  return (
    <div className="pagination-page-control">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default Pagination;
