import { EuiContextMenuItem, EuiSwitch } from '@elastic/eui';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';


const ColorFilter = () => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [colors, setColors] = useState([<EuiContextMenuItem key="copy" icon="pencil">Fetching Data</EuiContextMenuItem>]);
  let allMenuItems = [];

  const toggleColor = (event, type, name) => {
    allMenuItems = [];
    setColors(allMenuItems);
    const curColors = GlobalState.filters.color;
    GlobalState.filters.color.forEach((x, i) => {
      if (x.name === name) {
        curColors[i].checked = !curColors[i].checked;
        curColors[i].color = !curColors[i].checked ? 'secondary' : 'success';
      }
    });
    dispatch({ type: 'UPDATE_FILTER_COLOR', color: curColors });

    GlobalState.filters.color.forEach((color) => {
      allMenuItems.push(
        <EuiSwitch
          key={color.name}
          className="colorFilterBTN"
          name={color.name}
          label={color.name}
          color={color.checked ? 'secondary' : 'danger'}
          checked={color.checked}
          onChange={e => toggleColor(e, 'color', color.name)}
        />
      );
    });
    setColors(allMenuItems);
  };

  // load all colors
  useEffect(() => {
    if (GlobalState.allProducts && GlobalState.allProducts.length > 0) {
      const allColors = [];
      // setColors([]);
      GlobalState.allProducts.forEach((x) => {
        const check = _.find(allColors, o => o.name === x.color);
        if (!check) {
        //   console.log(allColors);
          allColors.push({
            id: allColors.length, name: x.color, checked: true
          });
        }
      });
      dispatch({ type: 'UPDATE_FILTER_COLOR', color: allColors });
      GlobalState.filters.color.forEach((color) => {
        allMenuItems.push(
          <EuiSwitch
            key={color.name}
            className="colorFilterBTN"
            name={color.name}
            label={color.name}
            color={color.checked ? 'secondary' : 'danger'}
            checked={color.checked}
            onChange={e => toggleColor(e, 'color', color.name)}
          />
        );
      });
      setColors(allMenuItems);
    }
  }, [GlobalState.allProducts]);

  return (
    <div className="color filterOption">
      <h5>Colors</h5>
      {colors}
    </div>
  );
};

export default ColorFilter;
