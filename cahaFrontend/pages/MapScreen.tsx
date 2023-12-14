/**
 * @author Luo Wang
 * Map Screen
 */

import {
  Button,
  Divider,
  FlatList,
  Flex,
  Modal,
  Spinner,
  Text,
  View,
} from "native-base";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, Modal as RNModal, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from ".";
import useLoadAddressList from "../hooks/useLoadAddressList";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { AddressStateType } from "../store/addressReducer";

import { deleteAddress } from "../server/address";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

const MapScreen: FC = () => {
  const { data, loading, run } = useLoadAddressList();
  if (loading) {
    console.log("Loading");
  }

  const productList = useSelector<StateType>(
    (state) => state.addressList
  ) as AddressStateType[];

  console.log("productList--->", productList);

  const [modalVisible, setModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [addressInfo, setAddressInfo] = useState<AddressStateType[]>([]);
  const [pickedMarker, setPickedMarker] = useState<AddressStateType | null>(
    null
  );
  const mapViewRef = useRef<MapView | null>(null);

  useEffect(() => {
    // Update the local state only when productList changes
    setAddressInfo(productList);
  }, [productList]);

  useFocusEffect(
    React.useCallback(() => {
      // console.log("Page Refreshed");
      setPickedMarker(null);
      // Fetch data only when the component is focused
      run();
    }, [])
  );

  const [userLatitude, setUserLatitude] = useState("0");
  const [userLongitude, setUserLongitude] = useState("0");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function handleAddMarker(e: any) {
    // console.log(e.nativeEvent);
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setUserLatitude(latitude.toString());
    setUserLongitude(longitude.toString());
    const newLocation: AddressStateType = {
      latitude: latitude,
      longitude: longitude,
    };
    focusOnMarker(newLocation);
    // Use the spread operator to create a new array with the new location object
    setAddressInfo((prevAddressInfo) => [...prevAddressInfo, newLocation]);

    setModalVisible(true);
  }

  const focusOnMarker = (marker: any) => {
    const { latitude, longitude } = marker;

    // console.log("marker", marker);
    const region = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };

    // Use animateToRegion for a smooth animation
    mapViewRef.current?.animateToRegion(region, 1000);
  };

  // Render the FlatList inside the Modal
  const renderModalContent = () => (
    <View>
      <FlatList
        data={addressInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setListModalVisible(false);
              focusOnMarker(item);
              setPickedMarker(item);
              setModalVisible(true);
            }}
          >
            <Flex mt={hp(1)} mx={wp(3)}>
              <View>
                <Text>
                  <Text fontWeight={"bold"}>{item.title}</Text>,{" "}
                  {item.description}
                </Text>
              </View>
              <View my={hp(0.5)}>
                <Text fontSize={"xs"} color={"gray.500"}>
                  {item.latitude}, {item.longitude}
                </Text>
              </View>

              <Divider mb={hp(1)} />
            </Flex>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.50535954375994,
          longitude: -0.0913612087756882,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={(e) => {
          handleAddMarker(e);
        }}
      >
        {addressInfo?.map((item: any, index: any) => {
          return (
            <Marker
              pinColor={item.markerColor}
              key={index}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              onPress={() => {
                setModalVisible(true);
                setPickedMarker(item);
                focusOnMarker(item);
              }}
            />
          );
        })}
      </MapView>

      <Flex position={"absolute"} right={wp(5)} bottom={hp(2.5)}>
        <Button
          size={wp(8)}
          color={"black"}
          borderRadius={wp(20)}
          width={wp(25)}
          height={hp(3)}
          onPress={() => setListModalVisible(true)}
        >
          List
        </Button>
      </Flex>

      {loading && (
        <RNModal transparent visible={loading}>
          <View style={styles.modalContainer}>
            <Spinner />
          </View>
        </RNModal>
      )}

      <View>
        <Modal
          isOpen={modalVisible}
          onClose={() => {
            if (!pickedMarker)
              setAddressInfo((prevAddressInfo) => prevAddressInfo.slice(0, -1));

            setModalVisible(false);
            setPickedMarker(null);
          }}
          avoidKeyboard
          justifyContent="flex-end"
          bottom="4"
          size="lg"
        >
          <Modal.Content width={"100%"}>
            <Modal.CloseButton />
            <Modal.Header>
              {pickedMarker ? pickedMarker.title : "New Location"}
            </Modal.Header>
            <Modal.Body>
              {pickedMarker
                ? pickedMarker.description
                : "Click the following button to save this marker location data and information"}
            </Modal.Body>
            <Modal.Footer>
              {pickedMarker ? (
                <>
                  {/* {console.log("pickedMarker?.id", pickedMarker?.id)} */}
                  <Flex flexDirection={"row"}>
                    <Button
                      mr={wp(3)}
                      borderRadius={wp(20)}
                      bgColor={"green.500"}
                      onPress={() => {
                        setModalVisible(false);

                        navigation.navigate("AddLocationScreen", {
                          id: pickedMarker.id,
                          title: pickedMarker.title,
                          description: pickedMarker.description,
                          latitude: pickedMarker.latitude,
                          longitude: pickedMarker.longitude,
                          markerColor: pickedMarker.markerColor,
                        });
                        // console.log(
                        //   "latitude:",
                        //   userLatitude,
                        //   "",
                        //   "longitude:",
                        //   userLongitude
                        // );
                      }}
                    >
                      Edit Location
                    </Button>
                    <Button
                      borderRadius={wp(20)}
                      bgColor={"danger.500"}
                      onPress={() => {
                        setModalVisible(false);

                        deleteAddress(pickedMarker?.id || 0)
                          .then((res: any) => {
                            // console.log("res", res);
                            setPickedMarker(null);
                            setAddressInfo((prevAddressInfo) =>
                              prevAddressInfo.filter(
                                (item) => item.id !== pickedMarker?.id
                              )
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Delete Location
                    </Button>
                  </Flex>
                </>
              ) : (
                <>
                  <Button
                    borderRadius={wp(20)}
                    flex="1"
                    onPress={() => {
                      setModalVisible(false);

                      navigation.navigate("AddLocationScreen", {
                        latitude: userLatitude,
                        longitude: userLongitude,
                      });
                      // console.log(
                      //   "latitude:",
                      //   userLatitude,
                      //   "",
                      //   "longitude:",
                      //   userLongitude
                      // );
                    }}
                  >
                    Save Location
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>

      <View>
        {/* Modal for displaying FlatList */}
        <Modal
          avoidKeyboard
          justifyContent="flex-end"
          bottom="4"
          size="lg"
          isOpen={listModalVisible}
          onClose={() => setListModalVisible(false)}
        >
          <Modal.Content width={"100%"} height={"50%"}>
            {/* Modal header and other components if needed */}
            <Modal.CloseButton />
            <Modal.Header>List of Addresses</Modal.Header>

            {/* Render FlatList content */}
            {renderModalContent()}
          </Modal.Content>
        </Modal>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
  },
});
