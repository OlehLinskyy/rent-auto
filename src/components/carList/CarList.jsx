import css from './CarList.module.css';
import CarItem from 'components/carItem/CarItem';
function CarList({ carsList }) {
  return (
    <ul className={css.list_cars}>
      {carsList.map((data, id) => (
        <CarItem data={data} key={id} />
      ))}
    </ul>
  );
}

export default CarList;
