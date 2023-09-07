import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoriesCard = ({ imgUrl, title, handleCategoryDetail }) => {
  return (
    <TouchableOpacity onPress={handleCategoryDetail} className="relative mr-2">
      <Image
        className=" w-20 h-20 rounded"
        source={{
          uri: imgUrl,
        }}
      />
      <Text className="text-white absolute bottom-1 left-1 text-xs font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
