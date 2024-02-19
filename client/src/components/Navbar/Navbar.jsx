import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers, getTeams } from '../../redux/actions';
import Logo from '../Logo/Logo'
import Searchbar from '../Searchbar/Searchbar'

import styles from './Navbar.module.css';

const Navbar = ({reset, setReset}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(getDrivers());
  }

  const createDriver = () => {
    navigate('/newDriver');
  }

  const getBack = () => {
    navigate('/');
  }

  return (
    <div className={styles.navbar}>
      <Logo/>
      <Searchbar/>
      <div className={styles.navbar__buttons}>
      <button 
          className={styles.navbar__btn}
          onClick={(event) => {
            handleReset(event);
          }}
        >Reset</button>
        <button 
          className={styles.navbar__btn}
          onClick={ createDriver }
        >New Driver</button>
        <button 
          className={styles.navbar__btn}
          onClick={ getBack }
        >Get back!</button>
      </div>
    </div>
  )
}

export default Navbar
