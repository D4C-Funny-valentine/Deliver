import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItem,
} from "../featuresSlice/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const items = useSelector(selectBasketItem);
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);

  const filterItems = items.filter((item) => item.id === id);

  const showQuantityHandler = useCallback(() => {
    setIsPressed(!isPressed);
  }, [isPressed, setIsPressed]);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!filterItems.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={showQuantityHandler}
        className={`bg-white border p-3 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row items-center">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1 font-medium" numberOfLines={1}>{name}</Text>
            <Text className="text-gray-500 text-sm" numberOfLines={3}>{description}</Text>
            <Text className="text-gray-500 mt-2">$ {price}</Text>
          </View>
          <View>
            <View className="">
              <Image
                style={{
                  borderWidth: 1,
                  borderColor: "#f3f3f4",
                }}
                source={{
                  uri: urlFor(image).url(),
                }}
                className="bg-gray-300 p-4 w-24 h-24"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="flex-row items-center space-x-2 py-1.5 px-4">
          <View className="">
            <TouchableOpacity
              disabled={!filterItems.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon color={"#00ccbb"} size={35} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500">{filterItems.length}</Text>
          <View className="">
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00ccbb"} size={35} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
