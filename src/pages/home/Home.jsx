import css from './Home.module.css';
function Home() {
  return (
    <div className={css.hero}>
      <div className="container">
        <div className={css.card}>
          <h1>Car Rent</h1>
          <p>
            Our team would be more than happy to help you with your reservation.
            Call us!
          </p>
          <a href="tel:+380730000000" className={css.number}>+380730000000</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
