import { useNavigate } from "react-router-dom"
import './LandingPage.css';


const LandingPage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/drivers');
  }

  return (
    <div className="landing__container">
      <div className="landing__content">
        <h1>Welcome to the F1 Drivers World</h1>
        <p className="landing__texts">Revolutionize your racing experience with our F1 pilot software – precision, speed, and data-driven excellence in one.</p>
        <div className="landing__intro">
          <button
            onClick={handleClick}
            className="landing__cta"
          >
            <span className="landing__span">START</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
