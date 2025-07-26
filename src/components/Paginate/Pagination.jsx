import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

const Pagination = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;
