import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCart() {
  try {
    const response = yield axios.get("/api/cart");
    yield put({ type: "SET_CART", payload: response.data });
  } catch (error) {
    console.log("Cart get request failed", error);
  }
}
function* submitCart(action) {
  try {
    yield axios.post("/api/cart", action.payload);
    yield put({ type: "CART_SUBMIT_SUCCESS" });
  } catch (error) {
    console.log("Cart submit request failed", error);
  }
}

function* cartSaga() {
  yield takeLatest("FETCH_CART", fetchCart);
  yield takeLatest("SUBMIT_CART", submitCart);
}

export default cartSaga;
