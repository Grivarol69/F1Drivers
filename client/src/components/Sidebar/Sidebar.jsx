/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import {
  filterDriversBySource,
  filterDriversByTeam,
  orderByName,
  orderByDOB
} from "../../redux/actions";

const Sidebar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const teams = useSelector(state => state.teams);

  const handleFilterBySource = (event) => {
    dispatch(filterDriversBySource(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterByTeam = (event) => {
    dispatch(filterDriversByTeam(event.target.value));
    setCurrentPage(1);
  };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
  };

  //*DOB: Date of Born
  const handleOrderByDOB = (event) => {
    dispatch(orderByDOB(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className={styles.select__sidebar}>
        <h1>Filters</h1>
        <div className={styles.select__container}>
          <select onChange={(event) => handleFilterBySource(event)}>
            <option>Select Source</option>
            <option value="ALL">All Data</option>
            <option value="API">External Data</option>
            <option value="DB">Owner Data</option>
          </select>

          {/* Teams */}

          <select
            onChange={(event) => {
              handleFilterByTeam(event);
            }}
          >
            <option>Select Teams</option>
            {teams && teams.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.select__sidebar}>
        <h1>Orders</h1>
        <div className={styles.select__container}>
          <select onChange={(event) => handleOrderByName(event)}>
            <option>Alphabetical Order</option>
            <option value="ASC">Ascending</option>
            <option value="DES">Descending</option>
          </select>
          <select onChange={(event) => handleOrderByDOB(event)}>
            <option>Order by DOB</option>
            <option value="ASC">Ascending</option>
            <option value="DES">Descending</option>
          </select>
        </div>
        {/* Otros elementos de la Sidebar */}
      </div>
    </>
  );
};

export default Sidebar;
