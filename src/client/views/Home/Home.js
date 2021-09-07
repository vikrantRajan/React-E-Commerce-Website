
import {
  EuiButton,
  EuiCard,
  EuiFlexGrid,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPageContent,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import Cart from '../../global/Cart';
import CartButton from '../../global/CartButton';
import useFetch from '../../hooks/useFetch';

const Home = () => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [currentData, setCurrentData] = useState({ data: null, isPending: true, error: null });
  const { data, isPending, error } = useFetch('/api/products');

  useEffect(() => {
    dispatch({ type: 'TOGGLE_CART', showCart: false });
    dispatch({ type: 'RESET_FILTER' });
  }, []);

  useEffect(() => {
    setCurrentData({ data, isPending, error });
    dispatch({ type: 'UPDATE_ALL_PRODUCTS', allProducts: data });
  }, [data]);

  useEffect(() => {
    if (GlobalState.filters.allFilteredProducts && currentData.data) {
      if (currentData.data.length !== GlobalState.filters.allFilteredProducts.length) {
        dispatch({ type: 'UPDATE_FILTER_PRODUCTS', allFilteredProducts: currentData.data });
      }
    }
  }, [currentData.data]);

  // FILTER
  useEffect(() => {
    if (data) {
      let noData = false;
      const categoryData = [];

      const sizeData = [];

      const colorData = [];

      const priceData = [];

      const searchData = [];
      let finishedSearch = false;

      // CATEGORY FILTER
      if (GlobalState.filters.category) {
        data.forEach((x, i) => {
          let done = false;
          GlobalState.filters.category.forEach((category) => {
            if (!done) {
              let check = false;
              if (category.checked) {
                check = _.find(x.categories, o => o === category.name);
              }
              const duplicate = _.find(categoryData, o => o.id === x.id);
              if (check && !duplicate) {
                categoryData.push(x);
                done = true;
              }
            }
          });

          if (i === data.length - 1 && (categoryData.length <= 0 || !categoryData)) noData = true;
        });
      }

      // SIZE FILTER
      if (!noData && categoryData && GlobalState.filters.size) {
        categoryData.forEach((x, i) => {
          let done = false;
          GlobalState.filters.size.forEach((size) => {
            if (!done) {
              let check = false;
              if (size.checked) {
                check = _.find(x.sizes, o => o === size.name);
              }
              const duplicate = _.find(sizeData, o => o.id === x.id);
              if (check && !duplicate) {
                sizeData.push(x);
                done = true;
              }
            }
          });

          if (i === categoryData.length - 1 && (sizeData.length <= 0 || !sizeData)) noData = true;
        });
      }

      // COLOR FILTER
      if (!noData && sizeData && GlobalState.filters.color) {
        sizeData.forEach((x, i) => {
          let done = false;
          GlobalState.filters.color.forEach((color) => {
            if (color.checked && x.color === color.name && !done) {
              colorData.push(x);
              done = true;
            }
          });

          if (i === sizeData.length - 1 && (colorData.length <= 0 || !colorData)) noData = true;
        });
      }


      // PRICE FILTER
      if (!noData && colorData && GlobalState.filters.price) {
        colorData.forEach((x, i) => {
          // eslint-disable-next-line no-useless-escape
          const curPrice = parseFloat(Number(x.price.replace(/[^0-9\.-]+/g, '')));
          if (curPrice > GlobalState.filters.price.min
            && curPrice < GlobalState.filters.price.max) priceData.push(x);

          if (i === sizeData.length - 1 && (priceData.length <= 0 || !priceData)) noData = true;
        });
      }

      // SEARCH FILTER
      if (!noData && priceData) {
        priceData.forEach((x, i) => {
          if (
            x.title.toLowerCase().includes(GlobalState.search.toLowerCase())
          ) {
            searchData.push(x);
          }

          if (i === priceData.length - 1) finishedSearch = true;
        });
      }

      if (searchData && finishedSearch) {
        setCurrentData({ data: searchData, isPending: false, error: null });
      }

      if (noData) setCurrentData({ data: [], isPending: false, error: null });
    }
  }, [GlobalState.filters]);


  let c = 0;
  // console.log(currentData.data, currentData.isPending, currentData.error);
  return (
    <div className="home">
      { isPending && (
      <div className="loadingContainer">
        {' '}
        <EuiLoadingChart size="xl" className="loadingBar" />
        {' '}
      </div>
      )}
      { error && <div className="fetchFailed"><h1>{ error }</h1></div> }
      { currentData.data && (
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        borderRadius="none"
      >
        <EuiPageContentBody>
          <div className="videoBanner">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <ReactPlayer width="100%" height="auto" playing={true} loop url="https://vikrantrajan.com/video/ecommerce.mp4" />
            <h1 className="videoBannerText">
              Built with
              {' '}
              <span className="green">React</span>
              {' '}
              <br />
              For your
              {' '}
              <span className="blue">React</span>
              ion.
              {' '}
              <br />
              <p className="videoBannerP firstLine">Here is a quick demonstration of my skills in React.js</p>
              <p className="videoBannerP">with a simple e-commerce website.</p>
              <a href="#productGrid">
                <EuiButton size="m" id="bannerBTN" iconType="arrowDown">View Products</EuiButton>
              </a>
            </h1>

          </div>

          <EuiFlexGrid id="productGrid" gutterSize="l" columns={4}>
            {currentData.data.map((x) => {
              if (x.in_stock === 'No') return false;
              c += 1;
              return x.in_stock === 'Yes' ? (

                <EuiFlexItem key={c}>
                  <EuiCard
                    className="productCard"
                    textAlign="left"
                    image={(
                      <div style={{
                        backgroundImage: `url(${x.images[0].url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '200px'
                      }}
                      />
                    )}
                    title={x.title}
                  >
                    <EuiText size="s" paddingsize="m" className="price">
                      <h4>{x.price}</h4>
                    </EuiText>

                    <EuiFlexGrid gutterSize="s" columns={3}>
                      <div className="absoluteBottom">
                        <div className="b">
                          <CartButton item={x} />
                          <EuiFlexItem grow={false} className="viewDetailsButton">
                            <Link to={`productdetails/${x.id}`}>
                              <EuiButton>View Details</EuiButton>
                            </Link>
                          </EuiFlexItem>
                        </div>
                      </div>
                    </EuiFlexGrid>
                  </EuiCard>
                </EuiFlexItem>

              ) : (
                null
              );
            })}
          </EuiFlexGrid>
          <Cart />
        </EuiPageContentBody>
      </EuiPageContent>
      )
      }
      {(currentData.data && currentData.data.length <= 0) && (
      <div className="noProductsFound">
        <h1>No Products Found!</h1>
        <EuiButton onClick={() => dispatch({ type: 'RESET_FILTER' })}>
          View All Products
        </EuiButton>
      </div>
      )}
    </div>
  );
};

export default Home;
