import styled from "@emotion/styled";
import { Pagination } from "react-bootstrap";

export const PaginationStyle = styled(Pagination)(({ theme }) => ({
  justifyContent: "center",
}));

export const PagPrevStyle = styled(Pagination.Prev)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "5px",
  },
}));
export const PagItemStyle = styled(Pagination.Item)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "50%",
  },
  "&.active .page-link": {
    backgroundColor: theme.colors.mainColor,
    color: "white",
  },
}));

export const PagEllipsisStyle = styled(Pagination.Ellipsis)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "50%",
  },
}));

export const PagNextStyle = styled(Pagination.Next)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "5px",
  },
}));
