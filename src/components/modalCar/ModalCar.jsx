import css from './ModalCar.module.css';
import Description from 'components/description/Description';
import close from 'image/x.svg';

function ModalCar({ data, ModalClose }) {
  const address = data.address.split(',');
  const rentalConditions = data.rentalConditions.split('\n');
  const placeholderImage = 'https://i.ibb.co/SQMHv4P/car.jpg';
  function handlecloseModal() {
    ModalClose();
  }
  const onImageError = e => {
    e.target.src = placeholderImage;
  };

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
            <Description
              array={[
                address[1],
                address[2],
                `Id: ${data.id}`,
                `Year: ${data.year}`,
                `Type: ${data.type}`,
              ]}
            />
            <Description
              array={[
                `Fuel Consumption: ${data.fuelConsumption}`,
                `Engine Size: ${data.engineSize}`,
              ]}
            />
          </div>
        </div>
        <p className={css.description}>{data.description}</p>
      </div>
      <div className={css.info}>
        <p className={css.title}>Accessories and functionalities:</p>
        <div>
          <Description
            array={[
              data.accessories[0],
              data.accessories[1],
              data.accessories[2],
            ]}
          />
          <Description
            array={[
              data.functionalities[0],
              data.functionalities[1],
              data.functionalities[2],
            ]}
          />
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
              Mileage: <span>{data.mileage.toLocaleString('en-US')}</span>{' '}
            </p>
          </li>
          <li className={css.conditions}>
            <p>
              Price: <span>{data.rentalPrice}</span>
            </p>
          </li>
        </ul>
      </div>
      <a href="tel:+380730000000" className={css.rental_car}>
        Rental car
      </a>
      {ModalClose && (
        <button onClick={handlecloseModal} className={css.close}>
          <img src={close} alt="close" />
        </button>
      )}
    </>
  );
}

export default ModalCar;
