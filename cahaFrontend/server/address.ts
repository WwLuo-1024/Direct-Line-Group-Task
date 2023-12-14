/**
 * @author Luo Wang
 * Network requests
 */
import { LocationDataType } from "../pages/AddLocationScreen";
import axios, { ResDataType } from "./ajax";
// import axios from "axios";

export async function getAddressList(): Promise<ResDataType> {
  const url = `http://192.168.101.4:8000/api/address/load`;
  //   const data = (await axios.get(url)) as ResDataType
  const data = await axios.get(url);
  return data;
}

export async function saveAddress(locationData: LocationDataType) {
  const url = "http://192.168.101.4:8000/api/address/create";
  const data = await axios.post(url, locationData);
  return data;
}

export async function deleteAddress(id: number) {
  const url = `http://192.168.101.4:8000/api/address/delete?id=${id}`;
  const data = await axios.post(url, id);
  return data;
}

export async function updateAddress(locationData: LocationDataType) {
  const url = `http://192.168.101.4:8000/api/address/update`;
  const data = await axios.patch(url, locationData);
  return data;
}
