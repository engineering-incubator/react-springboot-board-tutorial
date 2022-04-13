import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount, onPageChange, currentPage }) {
  return (
    <ReactPaginate
      className="color"
      activeClassName="active"
      previousClassName="li"
      nextClassName="li"
      pageClassName="li"
      pageCount={pageCount}
      previousLabel="‹ 이전"
      nextLabel="다음 ›"
      onPageChange={onPageChange}
      page={currentPage - 1}
    />
  );
}
