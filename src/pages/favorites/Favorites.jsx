import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalCar from 'components/modalCar/ModalCar';
import Modal from 'react-bootstrap/Modal';
import useMediaQuery from 'helpers/useMediaQuery';
import Loader from 'components/loader/Loader';
import css from './Favorites.module.css';

function Fafotites() {
  const [filteredList, setFilteredList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [car, setCar] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const isMobile = useMediaQuery('(max-width:580px)');

  useEffect(() => {
    setLoader(true);
    axios.get('/cars').then(response => {
      const cars = response.data;
      setCarsList(cars);
      setLoader(false);
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

  function handleModalShow() {
    setshowModal(true);
  }
  function handleModalClose() {
    setshowModal(false);
  }

  return (
    <div className={`container ${css.flex}`}>
      {loader && <Loader />}
      <ul className={css.cars_list}>
        {filteredList.map((data, id) => (
          <li key={id}>
            <button
              className={`${css.button} ${
                car.id === data.id && css.active_button
              }`}
              onClick={() => {
                setCar(data);
                if (isMobile) {
                  handleModalShow();
                }
              }}
            >
              <span>{data.make}</span>
              <span>{` ${data.model}`}</span>
              <span>{`, ${data.year}`}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={css.previev}>
        {isMobile ? (
          <Modal
            show={showModal}
            onHide={handleModalClose}
            centered
            dialogClassName={css.modal_action_dialog}
            contentClassName={css.modal_action_content}
          >
            <Modal.Body className={css.modal}>
              <ModalCar ModalClose={handleModalClose} data={car} />
            </Modal.Body>
          </Modal>
        ) : (
          car.id && (
            <div className={css.modal}>
              <ModalCar data={car} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Fafotites;
