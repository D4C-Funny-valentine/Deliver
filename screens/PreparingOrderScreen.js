import { SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Delivery")
    },4000)
  },[]) 
  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/deliveryOrder.gif")}
        animation="slideInUp"
        iterationCount={1}
        className=" w-80 h-80"
      />
      <Animatable.Text
        className=" text-white font-semibold text-center my-10"
        animation="slideInUp"
        iterationCount={1}
      >
        Waiting for Restaurant to accept your offer
      </Animatable.Text>
      <ActivityIndicator size={60} color={"#ffffff"} />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
