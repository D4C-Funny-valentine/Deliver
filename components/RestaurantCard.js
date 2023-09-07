import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback } from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ item }) => {
  const { image, address, name, rating, type } = item;
  const navigation = useNavigation();

  const navigateRestaurantHandler = useCallback(() => {
    navigation.navigate("Restaurant", item);
  }, []);

  return (
    <TouchableOpacity
      className="mr-3 bg-white shadow rounded py-3 px-2 w-72 justify-center"
      onPress={navigateRestaurantHandler}
    >
      <Image
        source={{
          uri: urlFor(image).url(),
        }}
        className="h-44 w-full object-cover rounded"
      />
      <View className=" gap-y-1 mt-3 justify-center">
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex-row gap-1 items-center">
          <StarIcon color="green" size={22} opacity={0.5} />
          <Text className="text-green-400">{rating}</Text>
          <Text className="text-xs text-gray-400">. {type.name}</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color={"gray"} size={22} opacity={0.4} />
          <Text className="text-gray-500 text-xs" numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
