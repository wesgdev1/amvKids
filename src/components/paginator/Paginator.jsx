import {
  PaginationStyle,
  PagPrevStyle,
  PagItemStyle,
  PagNextStyle,
} from "./StyledComponents";

export const Paginator = ({ byPage, currentPage, setCurrentPage, total }) => {
  const totalPages = Math.ceil(total / byPage);
  const remainingPages = totalPages - currentPage;

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center pb-3">
      <PaginationStyle className="justify-content-center">
        <PagPrevStyle
          className={currentPage === 1 ? "disabled" : ""}
          onClick={onPreviousPage}
        >
          <i className="bi bi-arrow-left p-1"></i>
          Anterior
        </PagPrevStyle>
        <PagItemStyle active>{currentPage}</PagItemStyle>
        <PagNextStyle
          className={currentPage >= totalPages ? "disabled" : ""}
          onClick={onNextPage}
        >
          Siguiente
          <i className="bi bi-arrow-right p-1"></i>
        </PagNextStyle>
      </PaginationStyle>
      {remainingPages > 0 && (
        <span className="ms-2">
          {remainingPages} página{remainingPages > 1 ? "s" : ""} más
        </span>
      )}
    </div>
  );
};
