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
//saga to handle the form, ie, 'ADD_PRODUCT'
function* addProduct(action) {
  try {
    //1. http post to endpoint /api/product
    //2. refresh the data, ie, yield put({type: 'FETCH_PRODUCT'})
    //3. action.payload should look like this:
    /*
    {
    "name": "banana",
    "description": "Tasty fruits",
    "price": "10",
    "stock_quantity": "1000",
    "image_url": "image.url",
    "category": "fruits" 
}
    */
    yield axios.post("/api/product", action.payload);
    yield put({ type: "FETCH_PRODUCT" });
  } catch (error) {
    console.log("Product post request failed", error);
  }
}
function* deleteProduct(action) {
  try {
    yield axios.delete(`/api/product/${action.payload}`);
    yield put({ type: "FETCH_PRODUCT" });
  } catch (error) {
    console.log("Delete request failed", error);
  }
}
function* updateProduct(action) {
  //action.payload should look like this:
  // action.payload.id = the productId
  // action.payload.data = {id: '4', 'name': 'name of product', etc...};
  try {
    yield axios.put(`/api/product/${action.payload.id}`, action.payload.data);
    yield put({ type: "FETCH_PRODUCT" });
  } catch (error) {
    console.log("Update request failed", error);
  }
}
function* productSaga() {
  yield takeLatest("FETCH_PRODUCT", fetchProduct);
  yield takeLatest("ADD_PRODUCT", addProduct);
  yield takeLatest("DELETE_PRODUCT", deleteProduct);
  yield takeLatest("UPDATE_PRODUCT", updateProduct);
}

export default productSaga;
