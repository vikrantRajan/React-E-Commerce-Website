import { EuiDualRange, htmlIdGenerator } from '@elastic/eui';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

const PriceFilter = () => {
  const [dualValue, setDualValue] = useState([0, 5000]);
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [maxPrice, setMaxPrice] = useState(99999);

  useEffect(() => {
    if (GlobalState.allProducts && GlobalState.allProducts.length > 0) {
      let current = 0;
      GlobalState.allProducts.forEach((x) => {
        // eslint-disable-next-line no-useless-escape
        const curPrice = parseFloat(Number(x.price.replace(/[^0-9\.-]+/g, '')));
        if (curPrice > current) {
          current = Math.round(curPrice);
        }
      });
      setMaxPrice(current);
      dispatch({ type: 'UPDATE_FILTER_PRICE', price: { min: 0, max: current } });
    }
  }, [GlobalState.allProducts]);

  const onDualChange = (value) => {
    dispatch({ type: 'UPDATE_FILTER_PRICE', price: { min: value[0], max: value[1] } });
  };

  useEffect(() => {
    const value = [GlobalState.filters.price.min, GlobalState.filters.price.max];
    setDualValue(value);
  }, [GlobalState.filters.price]);

  return (
    <div className="price">
      <h5>Price</h5>
      <EuiDualRange
        className="priceSlider"
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showInput
        min={0}
        max={maxPrice}
      />
    </div>
  );
};

export default PriceFilter;
