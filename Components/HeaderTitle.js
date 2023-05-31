import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import React from "react";
import color from "./color/color";
import { useNavigation } from "@react-navigation/native";

const HeaderTile = (props) => {
  const navigation = useNavigation();
  const login =()=>{
    Alert.alert('Đăng xuất','Bạn có chắc chắn muốn đăng xuất',[
      {
        text:"Đóng",
        style:'cancel'
      },
      {
        text:"Đồng ý",
        onPress: ()=>navigation.replace('Login')
      }
    ])
  }
  return (
    <View style={styles.header}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            color: color.xanh,
            fontWeight: "bold",
          }}
        >
          {props.title}
        </Text>
      </View>
      {props.title == "Trang cá nhân" && (
        <TouchableOpacity onPress={login}>
        <Image
          source={require("../Image/power.png")}
          style={{ width: 20, height: 20, marginRight: 20, marginTop: 5 }}
        />
        </TouchableOpacity>
        
      )}
    </View>
  );
};
export default HeaderTile;
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
