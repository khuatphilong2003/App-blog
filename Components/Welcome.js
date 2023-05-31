import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import color from "./color/color";
const Welcome = ({navigation}) => {
  return (
    <View style={{ flex: 100,backgroundColor:'white' }}>
      <View
        style={{
          flex: 10,
          marginTop:20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: color.xanh }}>
          BLOG
        </Text>
      </View>
      <View
        style={{
          flex: 60,
         
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../Image/Facebook_Flatline.png")} />
      </View>
      <View
        style={{ flex: 30, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          style={{
            marginBottom: 40,
            flexDirection: "row",
            width: 300,
            height: 55,
            backgroundColor: color.xanh,
            alignItems: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          onPress={()=>{navigation.replace('Login')}}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontStyle: "italic",
              flex: 1,
            }}
          >
            Let's begin
          </Text>
          <Image
            source={require("../Image/right.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
