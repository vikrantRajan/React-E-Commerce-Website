
import {
  EuiButton,
  EuiButtonEmpty, EuiFlexItem, EuiGlobalToastList
} from '@elastic/eui';
import _ from 'lodash';
import React, {
  Fragment, useContext, useState
} from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

// eslint-disable-next-line react/prop-types
const CartButton = ({ item }) => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [toasts, setToasts] = useState([]);
  const incomingItem = item;

  const removeToast = () => {
    setToasts([]);
  };
  const showSuccessCartNotification = (title) => {
    setToasts([
      {
        id: '1',
        title,
        color: 'success',
        iconType: 'uptimeApp',
        text: (
          <Fragment>
            <p>Good Choice! We&rsquo;re happy to have you here!</p>
          </Fragment>
        ),
      }
    ]);
  };
  const addToCart = (e) => {
    const newItem = {
      id: e.id,
      title: e.title,
      price: e.price,
      sale_price: e.sale_price,
      in_stock: e.in_stock,
      thumbnail: e.thumbnail,
      images: e.images,
      categories: e.categories,
      color: e.color,
      sizes: e.sizes,
      qty: e.qty || 1
    };
    const existingCartItem = _.find(GlobalState.cart, o => o.id === e.id);

    if (existingCartItem) {
      dispatch({ type: 'ADD_QTY_CART', id: e.id });
      // showSuccessCartNotification(`Added Another ${e.title} To Cart`);
    } else {
      dispatch({ type: 'ADD_ITEM_CART', newItem });
      showSuccessCartNotification(`Added ${e.title} To Cart`);
    }

    dispatch({ type: 'TOGGLE_CART', showCart: true });
  };

  const removeFromCart = ({ id }) => {
    dispatch({ type: 'REMOVE_QTY_CART', id });
    dispatch({ type: 'TOGGLE_CART', showCart: true });
  };

  const isItemIsInCart = _.find(GlobalState.cart, o => o.id === incomingItem.id) || false;

  const notificationPopover = (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removeToast}
      toastLifeTimeMs={3000}
    />
  );
  return isItemIsInCart ? (
    <h3 className="cartItemQty">
      <EuiButtonEmpty
        iconType="plus"
        className="plus"
        onClick={() => addToCart(incomingItem)}
        flush="left"
      />
      {isItemIsInCart.qty}
      <EuiButtonEmpty
        className="minus"
        iconType="minus"
        onClick={() => removeFromCart(incomingItem)}
        flush="left"
      />
      { notificationPopover }
    </h3>
  ) : (
    <EuiFlexItem grow={false}>
      <EuiButton color="secondary" size="m" iconType="plus" onClick={() => addToCart(incomingItem)}>
        Add To Cart
      </EuiButton>
      { notificationPopover }
    </EuiFlexItem>
  );
};

export default CartButton;
