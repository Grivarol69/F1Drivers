import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'

import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import NotFound from '../notFound/NotFound';

import { getDrivers, getTeams } from '../../redux/actions'

import styles from './Home.module.css';


const Home = () => {

  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
    
  const [currentPage, setCurrentPage ] = useState(1);
  const [reset, setReset] = useState(false);
  
  useEffect(() => {
    if (!allDrivers.length) {
      dispatch(getDrivers());
      dispatch(getTeams());
    }
  },[]);

  useEffect(() => {
    // console.log(reset);
    if(reset) {
      dispatch(getDrivers());
    }
  },[reset]);

    
  return (
    <>
      <section className={styles.layout}>
        <div className={`${styles.navbar} ${styles.centered}`}>
          <Navbar 
            reset={reset}
            setReset={setReset}
          />
        </div>
        <div className={`${styles.main} ${styles.centered}`}>
          {allDrivers.length ? 
            <Main  
              drivers={allDrivers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            : <NotFound/>
          }
        </div>
        <div className={styles.sidebar}>
          <Sidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={`${styles.footer} ${styles.centered}`}>
          <Footer/>
        </div>
      </section>
    </>
  )
}

export default Home
