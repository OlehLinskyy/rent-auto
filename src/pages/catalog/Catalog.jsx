import { useState, useEffect } from 'react';
import axios from 'axios';
import CarList from 'components/carList/CarList';
import Filters from 'components/filters/Filters';
import css from './Catalog.module.css';
axios.defaults.baseURL = 'https://6520634b906e276284c46921.mockapi.io';

function Catalog() {
  const [visibleItems, setVisibleItems] = useState(8);
  const [filteredList, setFilteredList] = useState([]);
  const [carsList, setCarsList] = useState([]);

  function handleLoadMore() {
    setVisibleItems(i => i + 8);
  }

  useEffect(() => {
    axios.get('/cars').then(response => {
      const cars = response.data;
      setCarsList(cars);
      setFilteredList(cars);
    });
  }, []);

  function onFilter(list) {
    setVisibleItems(8);
    setFilteredList(list);
  }

  return (
    <div className="container text_center">
      <Filters carsList={carsList} onFilter={onFilter} />
      <CarList carsList={filteredList.slice(0, visibleItems)} />
      {visibleItems < filteredList.length && (
        <button className={css.button} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}

export default Catalog;
