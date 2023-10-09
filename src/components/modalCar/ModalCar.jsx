import css from './ModalCar.module.css';
import close from 'image/x.svg';

function ModalCar({ data, ModalClose }) {
  const address = data.address.split(',');
  const rentalConditions = data.rentalConditions.split('\n');
  const placeholderImage = "https://i.ibb.co/SQMHv4P/car.jpg"
  function handlecloseModal() {
    ModalClose();
  }
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  }

  return (
    <>
      <div className={css.main_info}>
        <img 
            className={css.image} 
            src={data.img || placeholderImage}
            onError={onImageError} 
            alt="cars" 
        />
        <div className={css.info}>
          <p className={css.name_cars}>
            {`${data.make} `}
            <span>{data.model}</span>
            {`, ${data.year}`}
          </p>
          <div>
            <div className={css.location}>
              <p>{address[1]}</p>
              <p>|</p>
              <p>{address[2]}</p>
              <p>|</p>
              <p>{`Id: ${data.id}`}</p>
              <p>|</p>
              <p>{`Year: ${data.year}`}</p>
              <p>|</p>
              <p>{`Type: ${data.type}`}</p>
            </div>
            <div className={css.location}>
              <p>{`Fuel Consumption: ${data.fuelConsumption}`}</p>
              <p>|</p>
              <p>{`Engine Size: ${data.engineSize}`}</p>
            </div>
          </div>
        </div>
        <p className={css.description}>{data.description}</p>
      </div>
      <div className={css.info}>
        <p className={css.title}>Accessories and functionalities:</p>
        <div>
          <div className={css.location}>
            <p>{data.accessories[0]}</p>
            <p>|</p>
            <p>{data.accessories[1]}</p>
            <p>|</p>
            <p>{data.accessories[2]}</p>
          </div>
          <div className={css.location}>
            <p>{data.functionalities[0]}</p>
            <p>|</p>
            <p>{data.functionalities[1]}</p>
            <p>|</p>
            <p>{data.functionalities[2]}</p>
          </div>
        </div>
      </div>
      <div className={css.info}>
        <p className={css.title}>Rental Conditions:</p>
        <ul className={css.conditions_item}>
          <li className={css.conditions}>
            <p>{rentalConditions[0]}</p>
          </li>
          <li className={css.conditions}>
            <p>{rentalConditions[1]}</p>
          </li>
          <li className={css.conditions}>
            <p>{rentalConditions[2]}</p>
          </li>
          <li className={css.conditions}>
            <p>
              Mileage: <span>{data.mileage}</span>{' '}
            </p>
          </li>
          <li className={css.conditions}>
            <p>
              Price: <span>{data.rentalPrice}</span>
            </p>
          </li>
        </ul>
      </div>
      <button className={css.rental_car}>Rental car</button>
      <button onClick={handlecloseModal} className={css.close}>
        <img src={close} alt="close" />
      </button>
    </>
  );
}

export default ModalCar;
