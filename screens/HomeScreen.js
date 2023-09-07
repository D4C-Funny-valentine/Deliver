import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import Features from "../components/Features";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featureCategories, setFeatureCategories] = useState([]);

  // the reason why i use useLayoutEffect is when the ui load this will start to work.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // the reason why i use useEffect is when the component load this will start to work.
  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type== "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
          }
        }
    `
      )
      .then((data) => setFeatureCategories(data));
  }, []);

  return (
    <SafeAreaView
      className="bg-white pt-3"
      style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}
    >
      {/* Header */}
      <View className=" flex-row pb-3 items-center space-x-2 mt-2 mx-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className=" h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className=" font-semibold text-gray-400 text-xs">
            Deliver Now!
          </Text>
          <Text className=" font-bold text-xl">
            Current Location
            <ChevronDownIcon color={"#00CCBB"} size={20} />
          </Text>
        </View>
        <UserIcon size={35} color={"#00CCBB"} />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 mb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 items-center bg-gray-200 p-2 rounded">
          <MagnifyingGlassIcon size={25} color={"#aaaaaa"} />
          <TextInput
            className="px-3 py-1 rounded-md"
            placeholder="Restaurants and cuisines"
            keyboardType={"default"}
          />
        </View>
        <AdjustmentsHorizontalIcon color={"#00CCBB"} size={30} />
      </View>
      {/* body */}
      <ScrollView className="flex-1 bg-gray-100">
        {/* Categories */}
        <Categories/>

        {/* Features */}
        {
          featureCategories?.map(category => (
            <Features
             key={category._id}
             id={category._id}
             title={category.name}
             description={category.short_description}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
