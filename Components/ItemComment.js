import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemComment = (props) => {
  const { image, content, name } = props.DataComments;
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 100,
          marginRight: 5,
        }}
      />
      <View>
        <Text style={{ fontSize: 10 }}>{name}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({});
