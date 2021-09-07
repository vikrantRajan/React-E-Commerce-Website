
import {

  EuiContextMenuItem,

  EuiSwitch
} from '@elastic/eui';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

const CategoryFilter = () => {
  const { GlobalState, dispatch } = useContext(GlobalStateContext);
  const [categories, setCategories] = useState([<EuiContextMenuItem key="copy" icon="pencil">Fetching Data</EuiContextMenuItem>]);
  let allMenuItems = [];


  const toggleCategory = (event, type, name) => {
    // console.log(event, type, name);

    allMenuItems = [];
    setCategories(allMenuItems);
    const curCategories = GlobalState.filters.category;
    GlobalState.filters.category.forEach((x, i) => {
      if (x.name === name) {
        curCategories[i].checked = !curCategories[i].checked;
        curCategories[i].color = !curCategories[i].checked ? 'secondary' : 'success';
      }
    });
    dispatch({ type: 'UPDATE_FILTER_CATEGORY', category: curCategories });

    GlobalState.filters.category.forEach((category) => {
      allMenuItems.push(
        <EuiSwitch
          key={category.name}
          className="categoryFilterBTN"
          name={category.name}
          label={category.name}
          color={category.checked ? 'secondary' : 'danger'}
          checked={category.checked}
          onChange={e => toggleCategory(e, 'category', category.name)}
        />
      );
    });
    setCategories(allMenuItems);
  };
  // load all categories
  useEffect(() => {
    if (GlobalState.allProducts && GlobalState.allProducts.length > 0) {
      const allCategories = [];
      // setCategories([]);
      GlobalState.allProducts.forEach((x) => {
        x.categories.forEach((category) => {
          const check = _.find(allCategories, o => o.name === category);
          if (!check) {
            // console.log(allCategories);
            allCategories.push({
              id: allCategories.length, name: category, checked: true
            });
          }
        });
      });
      dispatch({ type: 'UPDATE_FILTER_CATEGORY', category: allCategories });
      GlobalState.filters.category.forEach((category) => {
        allMenuItems.push(
          <EuiSwitch
            key={category.name}
            className="categoryFilterBTN"
            name={category.name}
            label={category.name}
            color={category.checked ? 'secondary' : 'danger'}
            checked={category.checked}
            onChange={e => toggleCategory(e, 'category', category.name)}
          />
        );
      });
      setCategories(allMenuItems);
    }
  }, [GlobalState.allProducts]);


  // UPDATE UI WHEN FILTER STATE CHANGES
  useEffect(() => {
    // console.log('CATEGORY FILTER USEEFFECT');
    allMenuItems = [];

    setCategories(allMenuItems);
    GlobalState.filters.category.forEach((category) => {
      allMenuItems.push(
        <EuiSwitch
          key={category.name}
          className="categoryFilterBTN"
          name={category.name}
          label={category.name}
          color={category.checked ? 'secondary' : 'danger'}
          checked={category.checked}
          onChange={e => toggleCategory(e, 'category', category.name)}
        />
      );
    });
    setCategories(allMenuItems);
  }, [GlobalState.filters]);


  return categories.length > 0 ? (
    <div className="category filterOption">
      <h5>Category</h5>
      {categories}
    </div>
  ) : false;
};
export default CategoryFilter;
