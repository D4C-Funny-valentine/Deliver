import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";

const BasketScreenHeader = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="p-5 border-b border-[#00ccbb2f] shadow-[#00ccbb] bg-white shadow-lg">
        <View>
          <Text className="text-lg font-semibold ">Basket</Text>
          <Text className=" text-gray-400">{restaurant.name}</Text>
        </View>

        <TouchableOpacity
          onPress={navigation.goBack}
          className=" absolute top-5 right-5 rounded-full bg-gray-100"
        >
          <XCircleIcon size={45} color={"#00ccbb"} />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center px-4 py-3 space-x-4 bg-white justify-between my-5">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <Text className="flex-1 text-gray-500">Deliver in 45-50 min</Text>
        <TouchableOpacity>
          <Text className="text-[#00ccbb]">Change</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BasketScreenHeader;
