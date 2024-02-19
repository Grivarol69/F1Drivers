/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import styles from './Main.module.css'
import Pagination from '../Pagination/Pagination'


// eslint-disable-next-line react/prop-types
const Main = ({drivers, currentPage, setCurrentPage}) => {

    
    
  //* drivers es el que contiene la totalidad de items
  //* por lo tanto acá deben llegar los filtrados y ordenamientos

  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  // eslint-disable-next-line react/prop-types
  for (let i = 1; i < Math.ceil(drivers.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const currentItems = drivers.slice(indexOfFirstItem, indexOfLastItem);
 
  
  return (
    <>
      <div className={styles.container}>
        <section className={styles.main}>
          {
            // eslint-disable-next-line react/prop-types
            currentItems.map((driver) => (
              <Card
                key={driver.id}
                id={driver.id}
                name={driver.name}
                image={driver.image}
                teams={driver.teams}
              />
            ))
          }
        </section>
        
        <Pagination
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageNumberLimit={pageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
          setMaxPageNumberLimit={setMaxPageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          setMinPageNumberLimit={setMinPageNumberLimit}
        />
      </div>
    </>  
  )
}

export default Main
