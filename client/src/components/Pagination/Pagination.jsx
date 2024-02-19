/* eslint-disable react/prop-types */
import './pagination.css'


const Pagination = ({
  pages,
  setCurrentPage,
  currentPage,
  pageNumberLimit,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit
}) => {

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={ currentPage === number ? 'active' : null }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1)%pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > pageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>
  }

  return (
    <div className="pagination__container">
      <ul
        className="pageNumbers"
      >
        <li>
          <button
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >Prev</button>
        </li>

        {/* { pageDecrementBtn } */}

        {renderPageNumbers}

        {/* { pageIncrementBtn } */}

        <li>
          <button
            onClick={handleNextBtn}
            // eslint-disable-next-line react/prop-types
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >Next</button>
        </li>
      </ul>
    </div>
  )
}



export default Pagination
