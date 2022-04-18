import React from 'react';
import styled from '@emotion/styled';
import ReactPaginate from 'react-paginate';
import { colors } from '../../styles/variables';

interface Pagination {
  pageCount: number;
  onClickPagination: (idx: number) => void;
  currentPage: number;
  pageRange?: number;
}

const Pagination = ({ pageCount, onClickPagination, currentPage, pageRange = 5 }: Pagination) => (
  <StyledPaginate
    pageCount={pageCount}
    pageRangeDisplayed={pageRange}
    onPageChange={({ selected }) => onClickPagination(selected + 1)}
    initialPage={currentPage - 1}
    previousLabel="<"
    nextLabel=">"
  />
);

const StyledPaginate = styled(ReactPaginate)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 12px auto;

  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 30px;
    padding: 0 4px;
    box-sizing: border-box;
    color: ${colors.whiteGray};

    &.selected {
      font-weight: bold;
      color: ${colors.blue};
    }

    &.previous,
    &.next {
      position: absolute;
      top: 0px;
      color: ${colors.gray1};

      &.disabled {
        color: ${colors.whiteGray};
      }
    }

    &.previous {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }
`;
export default Pagination;
