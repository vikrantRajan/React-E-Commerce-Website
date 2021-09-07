import {
  EuiAvatar,
  EuiBadge,
  EuiLoadingChart, EuiPageContent, EuiPageContentBody
} from '@elastic/eui';
import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useParams } from 'react-router-dom';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import Cart from '../../global/Cart';
import CartButton from '../../global/CartButton';
import useFetch from '../../hooks/useFetch';
// import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  // const { productDetailsDispatch } = useContext(ProductDetailsContext);
  let carouselImgCount = 0;
  let categoriesCount = 0;
  let sizesCount = 0;
  // FUNCTIONS

  const { data, isPending, error } = useFetch(`/api/products/${id}`);
  useEffect(() => {
    dispatch({ type: 'TOGGLE_CART', showCart: false });
    // if (!isPending && !error && data) productDetailsDispatch({ type: 'ADD_PRODUCT_DETAILS', productDetails: data });
  }, []);
  return (
    <div className="productDetails">
      { isPending && (
      <div className="loadingContainer">
        {' '}
        <EuiLoadingChart size="xl" className="loadingBar" />
        {' '}
      </div>
      ) }
      { error && <div className="fetchFailed"><h1>{ error }</h1></div> }
      { data && (
        <EuiPageContent
          hasBorder={false}
          hasShadow={false}
          paddingSize="none"
          color="transparent"
          borderRadius="none"
        >
          <EuiPageContentBody restrictWidth="75%">
            <Carousel
              // eslint-disable-next-line react/jsx-boolean-value
              autoPlay={true}
              infiniteLoop
              swipeable
              className="productDetailsCarousel"
            >
              {data.images.map((x) => {
                carouselImgCount += 1;
                if (x.url) {
                  return (
                    <div key={carouselImgCount}>
                      <div style={{
                        backgroundImage: `url(${x.url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '500px',
                        maxHeight: '500px'
                      }}
                      />
                      <img src={x.url} alt={data.title} className="thumbnailCarousel" />
                      <p className="legend">{data.title}</p>
                    </div>
                  );
                }
                return false;
              })}
            </Carousel>

            <div className="textContainer">
              <h1 className="title">{data.title}</h1>
              <h2 className="price">{data.price}</h2>
              <EuiBadge className="color" color={data.color}>{data.color}</EuiBadge>
              <div className="sizes">
                {data.sizes.map((x) => {
                  sizesCount += 1;
                  if (x) return <EuiAvatar size="m" className="sizeIcon" name={x} key={sizesCount} initialsLength={2} />;
                  return false;
                })}
              </div>
              {data.categories.map((x) => {
                categoriesCount += 1;
                if (x) return <h4 className="categories" key={categoriesCount}>{x}</h4>;
                return false;
              })}
              <CartButton item={data} />
            </div>
            <Cart showCart={GlobalState.showCart} />
          </EuiPageContentBody>
        </EuiPageContent>
      )}
    </div>
  );
};

export default ProductDetails;
