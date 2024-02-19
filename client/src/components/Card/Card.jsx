import { Link } from 'react-router-dom'
import random from '../../assets/piloto_random.jpg'
import styles from './Card.module.css'
// eslint-disable-next-line react/prop-types
const Card = ({id, name, image, teams }) => {

  
  return (
    <div className={styles.card}>
      <Link
        to={`/detail/${id}`}
        className={styles.link}
      >
        <figure className={styles.card__figure}>
          <img 
            src={image ? image : random} 
            alt="Cargando Imagen" 
            className={styles.card__image}
          />
        </figure>
        <div className={styles.card__texts}>
          <h4 className={styles.card__title}>{name}</h4>
          <p className={styles.card__p}>
            { teams
                // eslint-disable-next-line react/prop-types
                .map((team, index) => (
                  <span key={team}>{ index === 2 ? team : team + ", "}</span>
                ))
            }
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Card
