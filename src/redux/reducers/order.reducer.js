const orderReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER":
      return action.payload;
    case "UNSET_ORDER":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.order
export default orderReducer;
