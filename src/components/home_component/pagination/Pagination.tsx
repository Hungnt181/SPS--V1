import {
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@fluentui/react-icons";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Chuyển trang bằng nút
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="pagination">
      <div className="indexOfPage">
        <span>
          Hiển thị {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, totalItems)} / Tổng {totalItems} bản ghi
        </span>
      </div>
      <div className="paginationBtn">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ChevronLeft20Regular />
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ChevronRight20Regular />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
