import { EuiContextMenuItem, EuiSwitch } from '@elastic/eui';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

const SizeFilter = () => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [sizes, setSizes] = useState([<EuiContextMenuItem key="copy" icon="pencil">Fetching Data</EuiContextMenuItem>]);
  let allMenuItems = [];

  const toggleSize = (event, type, name) => {
    // console.log(event, type, name);

    allMenuItems = [];
    setSizes(allMenuItems);
    const curSizes = GlobalState.filters.size;
    GlobalState.filters.size.forEach((x, i) => {
      if (x.name === name) {
        curSizes[i].checked = !curSizes[i].checked;
        curSizes[i].color = !curSizes[i].checked ? 'secondary' : 'success';
      }
    });
    dispatch({ type: 'UPDATE_FILTER_SIZE', size: curSizes });

    GlobalState.filters.size.forEach((size) => {
      allMenuItems.push(
        <EuiSwitch
          key={size.name}
          className="sizeFilterBTN"
          name={size.name}
          label={size.name}
          color={size.checked ? 'secondary' : 'danger'}
          checked={size.checked}
          onChange={e => toggleSize(e, 'size', size.name)}
        />
      );
    });
    setSizes(allMenuItems);
  };

  // load all sizes
  useEffect(() => {
    if (GlobalState.allProducts && GlobalState.allProducts.length > 0) {
      const allSizes = [];
      // setSizes([]);
      GlobalState.allProducts.forEach((x) => {
        x.sizes.forEach((size) => {
          const check = _.find(allSizes, o => o.name === size);
          if (!check) {
            // console.log(allSizes);
            allSizes.push({
              id: allSizes.length, name: size, checked: true
            });
          }
        });
      });
      dispatch({ type: 'UPDATE_FILTER_SIZE', size: allSizes });
      GlobalState.filters.size.forEach((size) => {
        allMenuItems.push(
          <EuiSwitch
            key={size.name}
            className="sizeFilterBTN"
            name={size.name}
            label={size.name}
            color={size.checked ? 'secondary' : 'danger'}
            checked={size.checked}
            onChange={e => toggleSize(e, 'size', size.name)}
          />
        );
      });
      setSizes(allMenuItems);
    }
  }, [GlobalState.allProducts]);

  return (
    <div className="size filterOption">
      <h5>Sizes</h5>
      {sizes}
    </div>
  );
};

export default SizeFilter;
