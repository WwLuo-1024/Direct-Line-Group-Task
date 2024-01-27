/**
 * @author Luo Wang
 * Address Reducer (redux)
 */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AddressStateType = {
  createdAt?: string;
  createdAtFormat?: string;
  description?: string;
  id?: number;
  latitude: string;
  longitude: string;
  markerColor?: string;
  title?: string;
  updatedAt?: string;
  updatedAtFormat?: string;
};

const INIT_STATE: AddressStateType[] = [
  {
    createdAt: "",
    createdAtFormat: "",
    description: "",
    id: 0,
    latitude: "",
    longitude: "",
    markerColor: "",
    title: "",
    updatedAt: "",
    updatedAtFormat: "",
  },
];

export const addressSlice = createSlice({
  name: "address",
  initialState: INIT_STATE,
  reducers: {
    loadData(states: AddressStateType[]) {
      return states;
    },

    resetAddress(
      state: AddressStateType[],
      action: PayloadAction<AddressStateType[]>
    ) {
      return action.payload;
    },
  },
});

export const { loadData, resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
