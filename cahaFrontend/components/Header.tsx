/**
 * @author Luo Wang
 * Header Component
 */
import {
  Box,
  ChevronLeftIcon,
  HStack,
  IconButton,
  Text,
  View,
} from "native-base";
import React, { FC } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../pages";

function AppBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <>
      <Box safeAreaTop bgColor={"rgba(0,0,0,0)"} />
      <HStack
        bgColor={"rgba(0,0,0,0)"}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        borderBottomRadius={wp(5)}
      >
        <HStack alignItems="center">
          <IconButton
            icon={<ChevronLeftIcon color="grey" />}
            onPress={() => navigation.goBack()}
          />
          <View justifyContent="center">
            <Text color="black" fontSize="20" fontWeight="bold">
              Save Location
            </Text>
          </View>
        </HStack>
      </HStack>
    </>
  );
}

const Header: FC = () => {
  return <AppBar />;
};

export default Header;
