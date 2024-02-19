import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { getTeams, postDriver } from "../../redux/actions";

//import styled from "styled-components"
import Create, { Input } from "./Form.styled"
// import { Clock, Camera, CheckOK } from "../Svg/SvgIcons"


//* creamos la funcion de validación de datos

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
  } else if (input.teams.length >= 7) {
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

    
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (JSON.stringify(errors) === "{}") {
    setErrors(errors.teams = "Must be enter two teams at least");
    
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

    if(!errors.name && !errors.surname && !errors.image && !errors.nationality && !errors.born) {
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

    if (input.teams.includes(event.target.value)) {
      window.alert("Team already selected!");
      errors.teams = "Team already selected!";
    } 

    setInput({
      ...input,
      teams: [ ...input.teams, event.target.value ]
    });

    setErrors(validate({
      ...input,
      teams: event.target.value
    }));
  }


  const handleDeleteTeam = (name) => {
		setInput((state) => ({
			...state,
			teams: state.teams.filter((t) => t !== name),
		}))
	}

  
  const disabledFunction = (objectName) => {
    
    return !(JSON.stringify(objectName) === "{}");
  };

  console.log(disabledFunction(errors));

  
  return (
    <div>
      <Create>
        <div className="card-img">
          <img src={input.image} alt='Load ...' />
        </div>
        <div className="card-info">
          <div className="card-text">
            <h1>Create New Driver</h1>
            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* Input Name */}
              <Input>
                <input 
                  type="text" 
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  required
                  className='input_field'
                />
                <label 
                  htmlFor="name"
                  className='input_label'
                >Name: </label>
                <label className="input_error">
                  {errors.name && errors.name}
                </label>
              </Input>

              {/* Input Surname */}
              <Input>
                <input 
                  type="text" 
                  name="surname"
                  value={input.surname}
                  onChange={handleChange}
                  required
                  className='input_field'
                />
                <label 
                  htmlFor="surname"
                  className='input_label'
                >Surname: </label>
                <label className="input_error">
                  {errors.surname && errors.surname}
                </label>
              </Input>
              
              {/* Input Description */}
              <Input>
                <input 
                  type="text" 
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  required
                  className='input_field'
                />
                <label 
                  htmlFor="description"
                  className='input_label'
                >Description: </label>
                <label className="input_error">
                  {errors.description && errors.description}
                </label>
              </Input>

              {/* Input Image */}
              <Input>
                <input 
                  type="text"
                  name="image"
                  // accept="image/*"
                  value={input.image}
                  onChange={handleChange}
                  // ref={inputRef}
                  placeholder=""
                  // required
                  className='input_field'
                />
                <label 
                  htmlFor="image"
                  className='input_label'
                >Image: </label>
                <label className="input_error">
                  {errors.image && errors.image}
                </label>
              </Input>

              {/* Input Nationality */}
              <Input>
                <input 
                  type="text" 
                  name="nationality"
                  value={input.nationality}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className='input_field'
                />
                <label 
                  htmlFor="nationality"
                  className='input_label'
                >Nationality: </label>
                <label className="input_error">
                  {errors.nationality && errors.nationality}
                </label>
              </Input>

              {/* Input Born */}
              <Input>
                <input 
                  type="date" 
                  name="born"
                  value={input.born}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className='input_field'
                />
                <label 
                  htmlFor="born"
                  className='input_label'
                >Date of Born: </label>
                <label className="input_error">
                  {errors.born && errors.born }
                </label>
              </Input>

              <Input height='90px'>
								<div className='input_select'>
									<select
										name='selectTeam'
										onChange={handleSelectChange}
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
									<label className='input_error select'>
										{errors.team && errors.team}
									</label>
								</div>

								<div>
									{
										input.teams.map((t) => (
											<span className='team-tag' key={t}>
												{t}
												<span
													className='remove'
													onClick={() => handleDeleteTeam(t)}
												>
													x
												</span>
											</span>
										))
                  }
								</div>
							</Input>

              <div className='card-btn'>
								<button
									className='cancel'
									type='button'
									onClick={() => navigate("/drivers")}
								>
									Cancel
								</button>

								<button
									className='success'
									type='submit'
                  disabled={disabledFunction(errors)}
                  
								>
									Save
								</button>
							</div>

            </form>
          </div>
        </div>
      </Create>
    </div>
  )
}

export default Form
