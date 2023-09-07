import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../featuresSlice/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItem,
  selectBasketTotal,
} from "../featuresSlice/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import BasketScreenHeader from "../components/BasketScreenHeader";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurantItem = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItem);
  const [groupedItemsBasket, setGroupedItemsBasket] = useState([]);
  const dispatch = useDispatch();
  const orderTotalAmount = useSelector(selectBasketTotal);

  const fixedOrderTotal = orderTotalAmount.toFixed(2)

  const NetTotal = (orderTotalAmount + 5.99).toFixed(2)

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsBasket(groupedItems);
  }, [items]);


  return (
    <>
      {items.length === 0 ? (
        <SafeAreaView
          className="bg-white flex-1"
          style={{ marginTop: StatusBar.currentHeight || 0 }}
        >
          <View className="flex-1 bg-gray-100">
            <BasketScreenHeader restaurant={restaurantItem} />
            <TouchableOpacity
              onPress={navigation.goBack}
              className=" justify-center items-center flex-1"
            >
              <View className="py-4 px-3 bg-white rounded-md">
                <Text className="text-[#00ccbb] font-bold">
                  Your basket is empty. Please buy something.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          className="bg-white flex-1"
          style={{ marginTop: StatusBar.currentHeight || 0 }}
        >
          <View className="flex-1 bg-gray-100">
            <BasketScreenHeader restaurant={restaurantItem} />

            <ScrollView className="divide-y divide-gray-200">
              {Object.entries(groupedItemsBasket).map(([key, items]) => (
                <View
                  key={key}
                  className="flex-row items-center bg-white py-2 px-4 justify-between rounded-md"
                >
                  <View className="flex-row space-x-2 items-center">
                    <Text className="text-xs text-[#00ccbb]">
                      {items.length}x
                    </Text>
                    <Image
                      source={{
                        uri: urlFor(items[0]?.image).url(),
                      }}
                      className="h-12 w-12 rounded-full"
                    />
                    <Text className="text-gray-600 text-xs">{items[0]?.name}</Text>
                  </View>
                  <View className="flex-row space-x-2 items-center">
                    <Text className="text-gray-600 text-xs">$ {items[0]?.price}</Text>
                    <TouchableOpacity
                      onPress={() => dispatch(removeFromBasket({ id: key }))}
                    >
                      <Text className="text-[#00ccbb] text-xs">Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View className="p-5 bg-white mt-5 space-y-3">
              <View className="flex-row justify-between items-center bg-white">
                <Text className="text-sm text-gray-500">SubTotal</Text>
                <Text className="text-sm text-gray-500">
                  $ {fixedOrderTotal}
                </Text>
              </View>
              <View className="flex-row justify-between items-center bg-white">
                <Text className="text-sm text-gray-500">Deliver Fee</Text>
                <Text className="text-sm text-gray-500">
                  $ 5.99
                </Text>
              </View>
              <View className="flex-row justify-between items-center bg-white">
                <Text className="text-sm font-semibold">Order Total</Text>
                <Text className="text-sm font-semibold">
                  $ {NetTotal}
                </Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('PreparingOrderScreen')} className="bg-[#00ccbb] rounded-md p-4">
                    <Text className="text-white text-center font-bold">Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default BasketScreen;
