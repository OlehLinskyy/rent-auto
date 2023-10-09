import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import css from './carItem.module.css';
import ModalCar from 'components/modalCar/ModalCar';
import Description from 'components/description/Description';
import heart from 'image/heart.svg';
import blueHart from 'image/blue-heart.svg';

function CarItem({ data }) {
  const [showModal, setshowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const state = localStorage.getItem('cars');
    if (state) {
      setIsFavorite(state.indexOf(data.id) !== -1);
    }
  }, [data.id]);

  function handleModalShow() {
    setshowModal(true);
  }
  function handleModalClose() {
    setshowModal(false);
  }
  const address = data.address.split(',');
  const placeholderImage = 'https://i.ibb.co/SQMHv4P/car.jpg';
  const onImageError = e => {
    e.target.src = placeholderImage;
  };
  function handleFavorite() {
    const localCars = localStorage.getItem('cars');
    const state = localCars ? JSON.parse(localCars) : [];
    if (state.indexOf(data.id) !== -1) {
      state.splice(state.indexOf(data.id), 1);
      setIsFavorite(false);
    } else {
      state.push(data.id);
      setIsFavorite(true);
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cars', serializedState);
  }
  return (
    <li>
      <div className={css.cards}>
        <img
          className={css.image}
          src={data.img || placeholderImage}
          onError={onImageError}
          alt="cars"
          width="274px"
          height="268px"
        />
        <div className={css.information}>
          <div className={css.info_cars}>
            <p className={css.name_cars}>
              {`${data.make} `}
              <span>{data.model}</span>
              {`, ${data.year}`}
            </p>
            <p>{data.rentalPrice}</p>
          </div>
          <div>
            <Description array={[address[1], address[2], data.rentalCompany]} />
            {/* <div className={css.location}>
              <p>{address[1]}</p>
              <p>|</p>
              <p>{address[2]}</p>
              <p>|</p>
              <p>{data.rentalCompany}</p>
            </div> */}
            <Description array={[data.type, data.model, data.id,data.functionalities[0]]} />
            {/* <div className={css.location}>
              <p>{data.type}</p>
              <p>|</p>
              <p>{data.model}</p>
              <p>|</p>
              <p>{data.id}</p>
              <p>|</p>
              <p>{data.functionalities[0]}</p>
            </div> */}
          </div>
        </div>
        <button onClick={handleModalShow} className={css.learn_more}>
          Learn more
        </button>
        <Modal
          show={showModal}
          onHide={handleModalClose}
          centered
          dialogClassName={css.modal_action_dialog}
          contentClassName={css.modal_action_content}
        >
          <Modal.Body className={css.modal}>
            <ModalCar ModalClose={handleModalClose} data={data} />
          </Modal.Body>
        </Modal>
        <button onClick={handleFavorite} className={css.heart}>
          {!isFavorite ? (
            <img src={heart} alt="heart" />
          ) : (
            <img src={blueHart} alt="heart" />
          )}
        </button>
      </div>
    </li>
  );
}

export default CarItem;
