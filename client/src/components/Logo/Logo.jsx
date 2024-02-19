import './Logo.css';
import logo from '../../assets/F1.svg';

const Logo = () => {
  return (
    <>
      <div className="logo">
        <figure className="logo__figure">
          <img src={logo} alt="Cargando Imagen" className="logo__image" />
        </figure>
        <h1 className="logo__title">F1<span>Drivers</span></h1>
      </div>
    </>
  )
}

export default Logo
