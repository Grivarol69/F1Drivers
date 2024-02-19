import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { getTeams, postDriver } from "../../redux/actions";
import styles from './Form.module.css';


const validate = (input) => {
  let error = {}
  let allowedImages = ['jpeg', 'jpg', 'gif', 'png']

  const fileValidation = (data, extensions) => {
    let extension = data.split('.').pop().toLowerCase();
    if (!extensions.includes(extension)) {
      return false
    } else {
      return true
    }
  }

  //? Name

  if (!input.name) {
    error.name = "Please enter a Name";
  } else if (!/[A-Z\s]+$/i.test(input.name)) {
    error.name = "Letters only";
  } else if (input.name.length > 20) {
    error.name = "Max. 20 characters";
  }

  //? Surname

  if (!input.surname) {
    error.surname = "Please enter a Surname";
  } else if (!/[A-Z\s]+$/i.test(input.surname)) {
    error.surname = "Letters only";
  } else if (input.surname.length > 20) {
    error.surname = "Max. 20 characters";
  }

  //? Description

  if (!input.description) {
    error.description = "Please enter a description";
  }

  //? Image

  if (!input.image) {
    error.image = "Please enter an Image";
  } else if (!fileValidation(input.image, allowedImages)) {
    error.image = "Image Format Invalid!";
  } 

  //? Nationality

  if (!input.nationality) {
    error.nationality = "Please enter a nationality";
  }

  //? Date of Born

  if (!input.born) {
    error.born = "Please enter a date of born";
  }

  if (!input.teams) {
    error.teams = "Please enter two teams at least"
  } else if (input.teams.length < 2) {
    error.teams = "Please enter Min. 2 teams"
  } else if (input.teams.length > 6) {
    error.teams = "Please enter Max. 6 teams"
  } 

  return error;
}

const Form = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const teams = useSelector(state => state.teams);

  const options = teams
    ? teams.map((team) => {
        return { label: team.name, value: team.name }
      })
    : []

    
  const [errors, setErrors] = useState({
    name: "Please enter a Name",
    surname: "Please enter a Surname",
    description: "Please enter a Description",
    image: "Please enter a Image",
    nationality: "Please enter a Nacionality",
    born: "Please enter a DOB",
    teams: "Please enter 2 teams at least!"
  });
  
  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
      
  }, []);

  //*establecemos el estado del formulario

  const [input, setInput] = useState({
    name: "",
    surname: "",
    description: "",
    image: "/assets/piloto_random.jpg",
    nationality: "",
    born: "",
    teams: []
  });

    
  //* creamos la función Submit para enviar los datos
  const handleSubmit = (event) => {
    console.log(input);
    event.preventDefault();
    

    if(!errors.name && !errors.surname && !errors.image && !errors.nationality && !errors.born && !errors.teams) {
      try {
        dispatch(postDriver(input));
        setInput({
          name: "",
          surname: "",
          description: "",
          image: "/assets/piloto_random.jpg",
          nationality: "",
          born: "",
          teams: []
        });
        alert("Driver created!");
      } catch (error) {
        console.log(error);
      }
    }
  }

  //*creamos el manejador de cambios en cada Input
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });

    setErrors(validate({
      ...input,
      [event.target.name]: event.target.value
    }));
    
  }


  const handleSelectChange = (event) => {

    setInput({
      ...input,
      teams: [ ...input.teams, event.target.value ]
    });

    setErrors(validate({
      ...input,
      teams: [ ...input.teams, event.target.value ]
    }));
  }


  const handleDeleteTeam = (name) => {
		setInput((state) => ({
			...state,
			teams: state.teams.filter((t) => t !== name),
		}));

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
  
      if (input.teams.length < 2) {
        updatedErrors.teams = "Please enter at least two teams";
      } 
  
      return updatedErrors;
    });
	}

  
  const disabledFunction = (errors) => {
    
    return !(JSON.stringify(errors) === "{}");
      
  };

  console.log('errors: ', errors);

  
  return (
    <div>
      <div className={styles.card__container}>
        <div className={styles.card__figure}>
          <img className={styles.card__img} src={input.image} alt='Load ...' />
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__text}>
            <h1 className={styles.card__title}>Create New Driver</h1>
            <form
              onSubmit={handleSubmit}
              noValidate
              className={styles.card__form}
            >

              {/* Input Name */}
              <div className={styles.input__container}>
                <input 
                  type="text" 
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  required
                  className={styles.input__field}
                />
                <label 
                  htmlFor="name"
                  className={styles.input__label}
                >Name: </label>
                <label className={styles.input__error}>
                  {errors.name && errors.name}
                </label>
              </div>

              {/* Input Surname */}
              <div className={styles.input__container}>
                <input 
                  type="text" 
                  name="surname"
                  value={input.surname}
                  onChange={handleChange}
                  required
                  className={styles.input__field}
                />
                <label 
                  htmlFor="surname"
                  className={styles.input__label}
                >Surname: </label>
                <label className={styles.input__error}>
                  {errors.surname && errors.surname}
                </label>
              </div>
              
              {/* Input Description */}
              <div className={styles.input__container}>
                <input 
                  type="text" 
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  required
                  className={styles.input__field}
                />
                <label 
                  htmlFor="description"
                  className={styles.input__label}
                >Description: </label>
                <label className={styles.input__error}>
                  {errors.description && errors.description}
                </label>
              </div>

              {/* Input Image */}
              <div className={styles.input__container}>
                <input 
                  type="text"
                  name="image"
                  value={input.image}
                  onChange={handleChange}
                  placeholder=""
                  className={styles.input__field}
                />
                <label 
                  htmlFor="image"
                  className={styles.input__label}
                >Image: </label>
                <label className={styles.input__error}>
                  {errors.image && errors.image}
                </label>
              </div>

              {/* Input Nationality */}
              <div className={styles.input__container}>
                <input 
                  type="text" 
                  name="nationality"
                  value={input.nationality}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className={styles.input__field}
                />
                <label 
                  htmlFor="nationality"
                  className={styles.input__label}
                >Nationality: </label>
                <label className={styles.input__error}>
                  {errors.nationality && errors.nationality}
                </label>
              </div>

              {/* Input Born */}
              <div className={styles.input__container}>
                <input 
                  type="date" 
                  name="born"
                  value={input.born}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className={styles.input__field}
                />
                <label 
                  htmlFor="born"
                  className={styles.input__label}
                >Date of Born: </label>
                <label className={styles.input__error}>
                  {errors.born && errors.born }
                </label>
              </div>

              <div className={styles.input__container} height='90px'>
								<div className={styles.input_select}>
									<select
										name='selectTeam'
										onChange={handleSelectChange}
                    className={styles.select_change}
									>
										<option key='0' value='0'>
											Select Teams...
										</option>
										{options.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									<label className={styles.input_error_select}>
										{errors.team && errors.team}
									</label>
								</div>

								<div>
									{
										input.teams.map((t) => (
											<span className={styles.team__tag} key={t}>
												{t}
												<span
													className={styles.remove}
													onClick={() => handleDeleteTeam(t)}
												>
													x
												</span>
											</span>
										))
                  }
								</div>
							</div>

              <div className={styles.card__btn}>
								<button
									className={styles.cancel}
									type='button'
									onClick={() => navigate("/drivers")}
								>
									Cancel
								</button>

								<button
									className={styles.success}
									type='submit'
                  disabled={disabledFunction(errors)}
                  
								>
									Save
								</button>
							</div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
