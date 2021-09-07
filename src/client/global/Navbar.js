
import {
  EuiButton,
  EuiButtonIcon, EuiFieldSearch,
  EuiHeader,
  EuiHeaderSectionItemButton, EuiIcon,
  EuiPopover
} from '@elastic/eui';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalStateContext } from '../contexts/GlobalStateContext';
import logo from '../jibe-logo.svg';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';
import SizeFilter from './SizeFilter';

export default () => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [navSearch, setNavSearch] = useState('');
  const location = useLocation();
  const [isPopoverOpen, setPopover] = useState(false);
  document.body.classList.add('euiBody--headerIsFixed--double');

  const openCategoryPopover = () => {
    setPopover(!isPopoverOpen);
  };


  const closeCategoryPopover = () => {
    setPopover(false);
  };

  // ON CHANGE SEARCH
  const searching = (e) => { dispatch({ type: 'SEARCH', search: e.target.value }); };

  // REST FILTERS
  const resetAllFilters = () => {
    closeCategoryPopover();
    dispatch({ type: 'RESET_FILTER' });
    setTimeout(() => {
      setPopover(true);
    }, 500);
  };
  // UPDATE UI
  useEffect(() => { if (typeof GlobalState.search === 'string') setNavSearch(GlobalState.search); }, [GlobalState.search]);
  // closeCategoryPopover();
  // setTimeout(() => { openCategoryPopover(); }, 400);

  const leftSection = {
    items: [

      <Link to="/">
        <img src={logo} alt="" style={{ width: '50px' }} />
        {' '}
      </Link>,
    ],
    borders: 'right',
  };


  // console.log(location.pathname.includes("productdetails"));

  let rightSection = {
    items: [
      <EuiPopover
        id="categoryFilter"
        repositionOnScroll
        button={(
          <EuiButtonIcon
            display="base"
            size="s"
            iconType="aggregate"
            aria-label="More"
            onClick={openCategoryPopover}
          />
        )}
        isOpen={isPopoverOpen}
        closePopover={closeCategoryPopover}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <div id="filterPopover">
          <div className="filterHeader">
            <h4>
              Filter by category, size, price and color
              <br />
              <br />
              <span className="results">
                { GlobalState.filters.allFilteredProducts.length }
                {' '}
                Filtered Results
              </span>
            </h4>
            <EuiButton
              className="closeBTN"
              display="base"
              size="s"
              iconType="eyeClosed"
              aria-label="More"
              onClick={closeCategoryPopover}
            >
              Close
            </EuiButton>
            <EuiButton
              className="resetBTN"
              display="base"
              size="s"
              iconType="broom"
              aria-label="More"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </EuiButton>

          </div>
          <PriceFilter />
          <CategoryFilter />
          <SizeFilter />
          <ColorFilter />

        </div>
      </EuiPopover>,
      <EuiFieldSearch
        className="searchBar"
        placeholder="Search for it here"
        value={navSearch}
        onChange={e => searching(e)}
        isClearable
        aria-label="Search Jibe"
      />,
      <EuiHeaderSectionItemButton
        aria-label="News feed: Updates available"
        notification={GlobalState.cart.length}
        onClick={() => dispatch({ type: 'TOGGLE_CART', showCart: true })}
      >
        <EuiIcon type="cheer" size="m" />
      </EuiHeaderSectionItemButton>,
    ],
    borders: 'none',
  };

  if (location.pathname.includes('productdetails')) {
    rightSection = {
      items: [
        <Link to="/" className="goBack">Go Back</Link>,
        <EuiHeaderSectionItemButton
          aria-label="News feed: Updates available"
          notification={GlobalState.cart.length}
          onClick={() => dispatch({ type: 'TOGGLE_CART', showCart: true })}
        >
          <EuiIcon type="cheer" size="m" />
        </EuiHeaderSectionItemButton>,
      ],
      borders: 'none',
    };
  }

  // const headers = (
  //   <>
  //     <EuiHeader
  //       className="navbar"
  //       position="fixed"
  //       sections={[
  //         leftSection,
  //         rightSection,
  //       ]}
  //     />
  //   </>
  // );


  return (
    <>
      <EuiHeader
        className="navbar"
        position="fixed"
        sections={[
          leftSection,
          rightSection
        ]}
      />
    </>
  );
};
