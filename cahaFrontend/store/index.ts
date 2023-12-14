import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressReducer";
import { AddressStateType } from "./addressReducer";

export type StateType = {
  addressList: AddressStateType[];
};

export default configureStore({
  reducer: {
    addressList: addressReducer,
  },
});
