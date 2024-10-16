const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, [action.payload.key]: action.payload.value };
    case "UNSET_CART":
      return {};
    default:
      return state;
  }
};

// cart will be on the redux state at:
// state.cart
export default cartReducer;
