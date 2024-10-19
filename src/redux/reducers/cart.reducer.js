const cartReducer = (state = [], action) => {
  //a product item looks like this: {id: '1', name: 'apples', ...};
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_PRODUCT_FROM_CART":
      const newArray = [...state];
      return newArray.filter(
        (product) => Number(product.id) !== Number(action.payload)
      );
    case "UNSET_CART":
      return [];
    default:
      return state;
  }
};

// cart will be on the redux state at:
// state.cart
export default cartReducer;
