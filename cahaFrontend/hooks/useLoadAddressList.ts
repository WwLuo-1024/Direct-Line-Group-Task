/**
 * @author Luo Wang
 * Custom Hook for api calling
 */
import { useDispatch } from "react-redux";
import { useRequest } from "ahooks";
import { getAddressList } from "../server/address";
import { resetAddress } from "../store/addressReducer";

function useLoadAddressList() {
  const dispatch = useDispatch();

  //ajax loading
  const { data, loading, error, run } = useRequest(
    async () => {
      console.log("Start to request");
      const data = await getAddressList();
      return data;
    }
    // {
    //   manual: true,
    // }
  );

  if (data) {
    console.log("Received Data:", data);
    const addressList = data?.addressList;
    dispatch(resetAddress(addressList));
  }

  // useEffect(() => {
  //   run();
  // }, []);

  return { data, loading, error, run };
}

export default useLoadAddressList;
