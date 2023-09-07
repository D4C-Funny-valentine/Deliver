import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItem,
  selectBasketTotal,
} from "../featuresSlice/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItem);
  const navigation = useNavigation();
  const totalPrice = useSelector(selectBasketTotal);
  const routeToViewBasket = useCallback(() => {
    navigation.navigate("Basket");
  }, []);

  if (items.length === 0) return null;
  return (
    <View className=" absolute bottom-5 w-full z-50">
      <TouchableOpacity onPress={routeToViewBasket}>
        <View className="flex-row justify-between items-center bg-[#00ccbb] p-4 rounded-lg mx-3">
          <Text className="text-xs text-white font-extrabold py-1 px-2.5 bg-[#01a296] rounded-md">
            {items.length}
          </Text>
          <Text className="text-white font-extrabold">View Basket</Text>
          <Text className="text-xs text-white font-extrabold">
            $ {totalPrice.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
