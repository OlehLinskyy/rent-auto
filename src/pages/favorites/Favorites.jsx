import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalCar from 'components/modalCar/ModalCar';
import css from './Favorites.module.css'

function Fafotites() {
  const [filteredList, setFilteredList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [car, setCar] = useState({});

  useEffect(() => {
    axios.get('/cars').then(response => {
      const cars = response.data;
      setCarsList(cars);
    });
  }, []);

  useEffect(() => {
    if (carsList.length) {
      const state = localStorage.getItem('cars');
      const cars = state ? JSON.parse(state) : [];
      const result = carsList.filter(i => cars.indexOf(i.id) !== -1);
      setFilteredList(result);
    }
  }, [carsList]);
 
  console.log(filteredList);
  return (
    <div className={`container ${css.flex}`}>
      <ul className={css.cars_list}>
        {filteredList.map((data, id) => (
          <li key={id}>
            <button className={`${css.button} ${car.id === data.id && css.active_button}` } onClick={() => {setCar(data);}}>
              <span>{data.make}</span>
              <span>{` ${data.model}`}</span>
              <span>{`, ${data.year}`}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={css.previev}>
        {car.id && <ModalCar data={car}/>}
      </div>
    </div>
  );
}

export default Fafotites;
