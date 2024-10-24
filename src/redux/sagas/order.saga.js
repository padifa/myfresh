import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchOrder() {
  try {
    const response = yield axios.get("/api/order");
    yield put({ type: "SET_ORDER", payload: response.data });
  } catch (error) {
    console.log("Order get request failed", error);
  }
}

function* addOrder(action) {
  try {
    yield axios.post("/api/order", action.payload);
    yield put({ type: "FETCH_ORDER" });
  } catch (error) {
    console.log("create order request failed", error);
  }
}

function* orderPay(action) {
  //orderId needs to be the action.payload
  try {
    yield axios.put(`/api/order/pay/${action.payload}`);
    yield put({ type: "FETCH_ORDER" });
  } catch (error) {
    console.log("Update order Receipt failed", error);
  }
}
function* orderSaga() {
  yield takeLatest("FETCH_ORDER", fetchOrder);
  yield takeLatest("ADD_ORDER", addOrder);
  yield takeLatest("PAYMENT", orderPay);
}

export default orderSaga;
