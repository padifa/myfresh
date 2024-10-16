import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchProduct() {
  try {
    const response = yield axios.get("/api/product");
    yield put({ type: "SET_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("Product get request failed", error);
  }
}

function* productSaga() {
  yield takeLatest("FETCH_PRODUCT", fetchProduct);
}

export default productSaga;
