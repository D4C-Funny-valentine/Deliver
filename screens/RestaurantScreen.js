import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../featuresSlice/restaurantSlice";
import { selectBasketItem } from "../featuresSlice/basketSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItem);
  const dispatch = useDispatch();
  const {
    params: {
      _id,
      image,
      address,
      name,
      dishes,
      rating,
      short_description,
      type,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        _id,
        image,
        address,
        name,
        dishes,
        rating,
        short_description,
        type,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const backToHomeHandler = useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight || 0 }}>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            className="p-4 w-full object-cover h-56"
          />
          <TouchableOpacity
            className=" absolute top-5 left-4 p-2 bg-gray-100 rounded-full"
            onPress={backToHomeHandler}
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 justify-center pt-4 mb-3">
            <View className="flex-row space-x-1 items-center mb-2">
              <Text className="text-2xl font-bold">{name}</Text>

              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color={"green"} opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-400">{rating}</Text> . {type.name}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon size={22} color={"gray"} opacity={0.6} />
              <Text className="text-xs text-gray-500">{address}</Text>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-1 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={22} />
            <Text className="pl-2 flex-1 text-md font-semibold justify-between">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={"#00ccdd"} size={20} />
          </TouchableOpacity>
        </View>

        <View className={`${items.length === 0 ? "pb-2" : "pb-28"}`}>
          <Text className="px-4 pt-3 mb-3 font-semibold text-xl">Menu</Text>

          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantScreen;
