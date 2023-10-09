import css from './Description.module.css'

function Description({array}) {
    return (
        <ul className={css.list}>
          {array.map((arr, id) => (
            <li
              key={id}
              className={`${css.item} ${id === array.length - 1 ? css.item_last : ''}`}
            >
              {arr}
            </li>
          ))}
        </ul>
      );
}
export default Description;