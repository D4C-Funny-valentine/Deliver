import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const Features = ({ id,title, description }) => {
  const [restaurants,setRestaurants] = useState([])

  useEffect(() => {
    sanityClient.fetch(`
    *[_type== "featured" && _id == $id ]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
        name
        }
      }
    }[0]
    `, {id}).then((data) => setRestaurants(data?.restaurants));
  }, [id]);

  return (
    <View>
      <View className="flex-row mt-4 justify-between items-center px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color={"#00CCBB"} />
      </View>

      <Text className="px-4 text-xs text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        {/* Restaurant Card */}
        {
          restaurants.map((restaurant) => (
            <RestaurantCard item={restaurant} key={restaurant._id}/>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default Features;
