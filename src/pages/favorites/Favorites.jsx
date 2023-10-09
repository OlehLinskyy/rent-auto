import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarList from 'components/carList/CarList';

function Fafotites() {
  const [visibleItems, setVisibleItems] = useState(8);
  const [filteredList, setFilteredList] = useState([]);
  const [carsList, setCarsList] = useState([]);

  function handleLoadMore() {
    setVisibleItems((i) => i + 8)
  }

  function getFilteredList() {
    const state = localStorage.getItem("cars");
    const cars = state ? JSON.parse(state): [];
    const result = carsList.filter(i => cars.indexOf(i.id) !== -1);
    setFilteredList(result);
  }
  useEffect(() => {
    axios.get('/cars').then(response => {
      const cars = response.data;
      setCarsList(cars);
      
    });
  }, []);

  useEffect(() => {
    if (carsList.length) {
      getFilteredList();
    }
  }, [carsList])

  return (
    <div className="container">
      <CarList carsList={filteredList.slice(0, visibleItems)}/>
      {visibleItems < filteredList.length && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
}

export default Fafotites;
