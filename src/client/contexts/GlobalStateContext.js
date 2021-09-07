import React, { createContext, useEffect, useReducer } from 'react';
import Reducer from '../reducers/GlobalStateReducer';

export const GlobalStateContext = createContext();

// eslint-disable-next-line react/prop-types
const GlobalStateContextProvider = ({ children }) => {
  const [GlobalState, dispatch] = useReducer(Reducer,
    {
      showCart: false,
      currentProductDetails: {},
      search: '',
      filters: {
        category: [],
        price: {
          min: 0,
          max: 0
        },
        color: [],
        size: [],
        allFilteredProducts: []
      },
      cart: [],
      allProducts: []
    }, () => {
      try {
        const localData = localStorage.getItem('GlobalState');
        return localData ? JSON.parse(localData) : {
          showCart: false,
          currentProductDetails: {},
          search: '',
          filters: {
            category: [],
            price: {
              min: 0,
              max: 0
            },
            color: [],
            size: []
          },
          cart: [],
          allProducts: []
        };
      } catch (e) {
        console.log(e);
        return e;
      }
    });

  useEffect(() => {
    localStorage.setItem('GlobalState', JSON.stringify(GlobalState));
  }, [GlobalState]);
  return (
    <GlobalStateContext.Provider value={{ GlobalState, dispatch }}>
      { children }
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContextProvider;
