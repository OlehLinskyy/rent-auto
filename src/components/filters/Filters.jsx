import { useState, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Filters({ carsList, onFilter }) {
  const refCarBrend = useRef();
  const refCarPrice = useRef();
  const refPriceFrom = useRef();
  const refPriceTo = useRef();

  const [makeFilter, setMakeFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const makeList = carsList.map(i => i.make);
  const uniqueMakeList = [...new Set(makeList)].sort();
  const priceList = ['10'];
  for (let i = 20; i <= 500; i += 10) {
    priceList.push(i.toString());
  }

  function blurCarBrend() {
    if (makeFilter.length === 0) {
      refCarBrend.current.clear();
    }
  }
  function blurCarPrice() {
    if (priceFilter.length === 0) {
      refCarPrice.current.clear();
    }
  }

  function handleFilters() {
    const filtered = carsList
      .filter(item => {
        if (makeFilter.length) {
          return item.make === makeFilter[0];
        }
        return item;
      })
      .filter(item => {
        if (priceFilter.length) {
          const price = Number(item.rentalPrice.substring(1));
          return price <= priceFilter[0];
        }
        return item;
      })
      .filter(item => {
        if (refPriceFrom.current.value) {
          return item.mileage >= refPriceFrom.current.value;
        }
        return item;
      })
      .filter(item => {
        if (refPriceTo.current.value) {
          return item.mileage <= refPriceTo.current.value;
        }
        return item;
      });
    onFilter(filtered);
  }

  return (
    <div>
      <Typeahead
        id="carBrandFilter"
        ref={refCarBrend}
        options={uniqueMakeList}
        onChange={setMakeFilter}
        onBlur={blurCarBrend}
        selected={makeFilter}
        placeholder="Enter the text"
      />
      <Typeahead
        id="carPriceFilter"
        ref={refCarPrice}
        options={priceList}
        onChange={setPriceFilter}
        onBlur={blurCarPrice}
        selected={priceFilter}
        placeholder="To"
      />
      <Form.Control ref={refPriceFrom} type="number" placeholder="From" />
      <Form.Control ref={refPriceTo} type="number" placeholder="To" />
      <Button variant="primary" onClick={handleFilters}>
        Search
      </Button>
    </div>
  );
}

export default Filters;
