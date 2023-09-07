import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../featuresSlice/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);


  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView
        className="z-50"
        style={{ marginTop: StatusBar.currentHeight || 0 }}
      >
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 py-4 px-4 z-50 rounded-md shadow-lg">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-500">Estimate Arrival</Text>
              <Text className="text-2xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar color="#00ccbb" indeterminate={true} size={30} />
          <Text className="text-xs mt-3 text-gray-500">
            Your order at {restaurant.name} is preparing.
          </Text>
        </View>
      </SafeAreaView>
      {/* map from expo */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-8 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.name}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center justify-between space-x-4 px-4 h-20">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="w-12 h-12 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className=" text-lg">Nyein Kyaw</Text>
          <Text className="text-gray-500">Your Raider</Text>
        </View>

        <TouchableOpacity onPress={() => Linking.openURL(`tel:${"09970662799"}`)}>
          <Text className="text-[#00ccbb] text-lg mr-4 font-semibold">
            Call
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
