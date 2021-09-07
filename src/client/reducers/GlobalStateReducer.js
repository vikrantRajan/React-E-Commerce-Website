import _ from 'lodash';

export const GlobalStateReducer = (state, action) => {
  let newArray = [];
  let curFilters;
  let currentMaxPrice = 0;
  switch (action.type) {
    // FILTERS
    case 'UPDATE_FILTER_CATEGORY':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: action.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'SEARCH':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: action.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'UPDATE_FILTER_SIZE':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: action.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'UPDATE_FILTER_COLOR':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: action.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'UPDATE_FILTER_PRICE':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: action.price.min || 0,
            max: action.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'UPDATE_FILTER_PRODUCTS':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: action.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    case 'RESET_FILTER':
      curFilters = state.filters;
      state.filters.category.forEach((x, i) => {
        curFilters.category[i].checked = true;
      });
      state.filters.size.forEach((x, i) => {
        curFilters.size[i].checked = true;
      });
      state.filters.color.forEach((x, i) => {
        curFilters.color[i].checked = true;
      });
      state.allProducts.forEach((x) => {
        // eslint-disable-next-line no-useless-escape
        const curPrice = parseFloat(Number(x.price.replace(/[^0-9\.-]+/g, '')));
        if (curPrice > currentMaxPrice) {
          currentMaxPrice = Math.round(curPrice);
        }
      });
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: curFilters.category || [],
          price: {
            min: 0,
            max: currentMaxPrice,
          },
          color: curFilters.color || [],
          size: curFilters.size || [],
          allFilteredProducts: state.allProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || [],
      };
    // ALL PRODUCTS
    case 'UPDATE_ALL_PRODUCTS':
      return {
        showCart: state.showCart || false,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: action.allProducts
      };
    // CART
    case 'TOGGLE_CART':
      return {
        showCart: action.showCart,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: state.cart || [],
        allProducts: state.allProducts || []
      };
    case 'ADD_ITEM_CART':
      return {
        showCart: action.showCart,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: [...state.cart, {
          id: action.newItem.id,
          title: action.newItem.title,
          price: action.newItem.price,
          sale_price: action.newItem.sale_price,
          in_stock: action.newItem.in_stock,
          thumbnail: action.newItem.thumbnail,
          categories: action.newItem.categories,
          color: action.newItem.color,
          sizes: action.newItem.sizes,
          qty: action.newItem.qty
        }] || [{
          id: action.newItem.id,
          title: action.newItem.title,
          price: action.newItem.price,
          sale_price: action.newItem.sale_price,
          in_stock: action.newItem.in_stock,
          thumbnail: action.newItem.thumbnail,
          categories: action.newItem.categories,
          color: action.newItem.color,
          sizes: action.newItem.sizes,
          qty: action.newItem.qty
        }],
        allProducts: state.allProducts || []
      };
    case 'ADD_QTY_CART':
      newArray = [...state.cart];
      state.cart.forEach((x, i) => {
        if (x.id === action.id) newArray[i].qty += 1;
      });
      return {
        showCart: state.showCart,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: [...newArray],
        allProducts: state.allProducts || []
      };
    case 'REMOVE_QTY_CART':
      newArray = [...state.cart];
      state.cart.forEach((x, i) => {
        if (x.id === action.id) newArray[i].qty -= 1;
        _.remove(newArray, n => n.qty <= 0);
      });
      return {
        showCart: state.showCart,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: [...newArray],
        allProducts: state.allProducts || []
      };
    case 'REMOVE_ALL_CART':
      return {
        showCart: state.showCart,
        currentProductDetails: state.currentProductDetails || null,
        search: state.search || '',
        filters: {
          category: state.filters.category || [],
          price: {
            min: state.filters.price.min || 0,
            max: state.filters.price.max || 0,
          },
          color: state.filters.color || [],
          size: state.filters.size || [],
          allFilteredProducts: state.filters.allFilteredProducts || []
        },
        cart: [],
        allProducts: state.allProducts || []
      };

    case 'CURRENT_STATE':
      return state.length > 0 ? state : {};
    default:
      return state;
  }
};

export default GlobalStateReducer;
