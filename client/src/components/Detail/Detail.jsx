import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDriverDetail, driverCleanDetail } from '../../redux/actions';
import styles from './Detail.module.css';

const Detail = () => {

  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getDriverDetail(id));
    return () => {
      dispatch(driverCleanDetail())
    }
  },[id, dispatch]);
  
  const driver = useSelector(state => state.driverDetail);

  console.log("Driver: ", driver);
  
  return (
    <>
      {
        driver ? (
          <div className={styles.overlay}>
            <div className={styles.cardDetail}>
              <figure className={styles.cardFigure}>
                {
                  driver.image ?  
                    <img 
                      src={driver.image}
                      alt="Cargando Imagen" 
                      className={styles.cardImage}
                    /> : ""
                }
              </figure>
              <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                  <h1>{driver.name}</h1>
                  <h2>
                    <span>{driver.nationality}</span>
                  </h2>
                  <div className={styles.cardAditional}>
                    <div className={styles.cardData}>
                      <div>
                        <h3>Born: </h3> {driver.born}
                      </div>
                    </div>
                    <div className={styles.cardTeams}>
                      <h2>
                        <span>Teams: </span>
                      </h2>
                      {
                        driver.teams && driver.teams.map((team) => (
                          <span
                            key={team}
                            className={styles.team__tag}
                          >
                            {team}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className={styles.cardButton}>
                  <button 
                    type='button' 
                    onClick={() => navigate('/drivers')}
                    className={styles.cardBtn}
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : ""
      }
    </>
  )
}

export default Detail
