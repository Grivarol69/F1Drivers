
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions';
import styles from './NotFound.module.css';

import f1 from './F1.svg';


const NotFound = () => {
  
  const dispatch = useDispatch();

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(getDrivers());
  }
  
  
  return (
    <div className={styles.container}>
      <h2>Ups! something go wrong!</h2>
      <button 
          className={styles.notFoundButton}
          onClick={(event) => {
            handleReset(event);
          }}
        >Back to Home</button>
      <img alt='loading ...' src={f1} className={styles.image}/>
    </div>
  )
}

export default NotFound
