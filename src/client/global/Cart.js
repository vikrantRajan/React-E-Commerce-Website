import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem, EuiFlyout, EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiGlobalToastList,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiText,
  EuiTitle
} from '@elastic/eui';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';
// eslint-disable-next-line react/prop-types
export default () => {
  let c = 999;
  let emptyCart;
  let checkoutButton;
  let clearCartButton;
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isPopoverOpen, setisPopoverOpen] = useState(false);
  const openClearCartPopOver = () => setisPopoverOpen(true);
  const closePopover = () => setisPopoverOpen(false);
  const [toasts, setToasts] = useState([]);

  const removeToast = () => {
    setToasts([]);
  };
  let total = 0;
  const calculateTotalPrice = () => {
    GlobalState.cart.forEach((x) => {
      const p = parseFloat(x.price.replace(/\$/g, '')) * x.qty;
      total += p;
      // console.log(p, total);
    });
    setTotalPrice(total.toFixed(2));
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [GlobalState.cart]);
  useEffect(() => {}, [GlobalState.showCart]);
  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL_CART', item: false });
    closePopover();
  };

  const closeFlyout = () => dispatch({ type: 'TOGGLE_CART', showCart: false });
  if (GlobalState.cart.length === 0 || !GlobalState.cart) {
    emptyCart = (
      <div key={c} className="emptyCart">
        <h1>You Have No Items In Your Cart!</h1>
        <EuiButton onClick={closeFlyout} fill>
          Continue Shopping
        </EuiButton>
      </div>
    );
    checkoutButton = false;
    clearCartButton = false;
  } else {
    emptyCart = false;
    clearCartButton = (
      <EuiFlexItem grow={false}>
        <EuiPopover
          button={(
            <EuiButtonEmpty
              iconType="alert"
              onClick={openClearCartPopOver}
              flush="left"
            >
              Clear Cart
            </EuiButtonEmpty>
    )}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          anchorPosition="upCenter"
        >
          <EuiPopoverTitle>You&rsquo;re about to delete everything</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText size="s">
              <p>
                Are you sure you want to do this? You cannot undo this action once to click
              </p>
            </EuiText>
          </div>
          <EuiPopoverFooter>
            <EuiButtonEmpty
              iconType="alert"
              onClick={() => removeAll()}
              flush="left"
            >
              Yes, Clear Cart
            </EuiButtonEmpty>
          </EuiPopoverFooter>
        </EuiPopover>
      </EuiFlexItem>
    );
    checkoutButton = (

      <EuiFlexItem grow={false}>
        <EuiButton onClick={closeFlyout} fill>
          Checkout $
          { totalPrice }
        </EuiButton>
      </EuiFlexItem>
    );
  }
  // OUTPUT
  return GlobalState.showCart ? (
    <EuiFlyout
      ownFocus
      onClose={closeFlyout}
      paddingSize="l"
      id="flyoutMediumPadding cart"
      aria-labelledby="flyoutMediumPaddingTitle"
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyoutMediumPaddingTitle">
            Your Cart
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>

        {GlobalState.cart.map((x) => {
          c += 1;
          return GlobalState.cart.length > 0 && GlobalState.cart ? (
            <div key={c} className="cartItem">
              <div
                className="cartItemImage"
                style={{
                  backgroundImage: `url(${x.thumbnail})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '30%',
                  height: '100px',
                  float: 'left'
                }}
              />
              <div className="cartItemText">
                <h1 className="cartItemTitle">{x.title}</h1>
                <h2 className="cartItemPrice">{x.price}</h2>
                <h3 className="cartItemQty">
                  <EuiButtonEmpty
                    iconType="plus"
                    className="plus"
                    onClick={() => dispatch({ type: 'ADD_QTY_CART', id: x.id })}
                    flush="left"
                  />
                  {x.qty}
                  <EuiButtonEmpty
                    className="minus"
                    iconType="minus"
                    onClick={() => dispatch({ type: 'REMOVE_QTY_CART', id: x.id })}
                    flush="left"
                  />
                </h3>
              </div>
            </div>
          ) : false;
        })}
        {emptyCart}
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          {clearCartButton}
          {checkoutButton}
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={6000}
          />
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  ) : false;
};
