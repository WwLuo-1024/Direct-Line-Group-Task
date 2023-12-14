/**
 * @author Luo Wang
 * Add Location Screen
 */

import {
  View,
  Text,
  Flex,
  FormControl,
  Input,
  Button,
  Box,
  Popover,
  CheckIcon,
} from "native-base";
import React, { FC, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from ".";
import Header from "../components/Header";
import LocationIcon from "../assets/icons/LocationIcon";
import { R14Bold } from "../utils/fontSetting";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { markerColors } from "../utils/markerColorPicker";
import { saveAddress, updateAddress } from "../server/address";

export type LocationDataType = {
  id?: number;
  title: string;
  description: string;
  latitude: string;
  longitude: string;
  markerColor: string;
};

const AddLocationScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddLocationScreen">>();

  const [id, setId] = useState(route?.params?.id || 0);
  const [title, setTitle] = useState(route?.params?.title || "Marker Title");
  const [description, setDescription] = useState(
    route?.params?.description || "Marker Description"
  );
  const [userLatitude, setUserLatitude] = useState(route?.params?.latitude);
  const [userLongitude, setUserLongitude] = useState(route?.params?.longitude);
  const [markerColor, setMarkerColor] = useState(
    route?.params?.markerColor || "red"
  );

  function handleSaveData() {
    const data: LocationDataType = {
      title: title,
      description: description,
      latitude: userLatitude,
      longitude: userLongitude,
      markerColor: markerColor,
    };
    // console.log("data:", data);
    // saveAddress(data);
    saveAddress(data)
      .then((res: any) => {
        console.log("res", res);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateData() {
    const data: LocationDataType = {
      id: id,
      title: title,
      description: description,
      latitude: userLatitude,
      longitude: userLongitude,
      markerColor: markerColor,
    };
    // console.log("data:", data);
    // saveAddress(data);
    updateAddress(data)
      .then((res: any) => {
        console.log("res", res);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View width={"100%"} height={"100%"}>
      <Header />
      <Flex mx={wp(3)}>
        <Flex>
          <Flex flexDirection={"row"} alignItems={"center"}>
            <LocationIcon width={wp(7)} height={wp(7)} />
            <Text
              ml={wp(2)}
              variant={R14Bold}
              fontSize={wp(6)}
              fontWeight={"bold"}
            >
              {title}
            </Text>
          </Flex>
          <Text variant={R14Bold} fontSize={wp(4)}>
            {description}
          </Text>
        </Flex>

        <Flex>
          <FormControl mt="3" isRequired>
            <FormControl.Label>Title</FormControl.Label>
            <Input value={title} onChangeText={setTitle} />
          </FormControl>
          <FormControl mt="3" isRequired>
            <FormControl.Label>Description</FormControl.Label>
            <Input value={description} onChangeText={setDescription} />
          </FormControl>
          <FormControl mt="3" isRequired>
            <FormControl.Label>Latitude</FormControl.Label>
            <Input value={userLatitude} onChangeText={setUserLatitude} />
          </FormControl>
          <FormControl mt="3" isRequired>
            <FormControl.Label>Longitude</FormControl.Label>
            <Input value={userLongitude} onChangeText={setUserLongitude} />
          </FormControl>
        </Flex>

        <Flex mt={hp(2)}>
          <Text>Marker Color</Text>
          <Flex flexDirection={"row"} mt={hp(1)}>
            {markerColors.map((value, index) => {
              return (
                <View ml={index > 0 ? wp(3) : 0} key={index}>
                  <Box w="100%" alignItems="center">
                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <Button
                            size={"lg"}
                            {...triggerProps}
                            onPress={() => {
                              // console.log("value.color", value.color);
                              setMarkerColor(value.color);
                            }}
                            colorScheme={value.color}
                          >
                            {value.color === markerColor && (
                              <CheckIcon size="5" color="white" />
                            )}
                          </Button>
                        );
                      }}
                    >
                      <Popover.Content w={wp(20)}>
                        <Popover.Arrow />
                        <Popover.Body
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          {value.name}
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>
                  </Box>
                </View>
              );
            })}
          </Flex>
        </Flex>

        <Flex mt={hp(5)}>
          <Button
            borderRadius={wp(20)}
            onPress={id === 0 ? handleSaveData : handleUpdateData}
          >
            {id === 0 ? "Save" : "Update"}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default AddLocationScreen;
