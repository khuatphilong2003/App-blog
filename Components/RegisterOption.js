import { StyleSheet, Text, View, Image ,TouchableOpacity} from "react-native";
import React from "react";
import color from "./color/color";



const RegisterOption = ({navigation}) => {
  return (
    <View style={{ paddingHorizontal: 30 ,backgroundColor:'white',flex:1}}>
      <View
        style={{
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../Image/register_option.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>
      <View style={{ height: 100 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: color.xanh }}>
          Chọn loại tài khoản
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 150,
          backgroundColor: color.xanh,
          alignItems: "center",
          borderRadius: 20,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          marginTop:20
        }}
        onPress={()=>navigation.navigate('RegisterAdmin')}
      >
        <Image
          source={require("../Image/admin.png")}
          style={{ width: 100, height: 100,marginLeft:20}}
        />
        <Text style={{marginLeft:30,fontSize:30,color:'white',fontWeight:'bold'}}>Người quản {"\n"}trị</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 150,
          backgroundColor: color.xanh,
          alignItems: "center",
          borderRadius: 20,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          marginTop:30
        }}
        onPress={()=>navigation.navigate('Register')}
      >
       <Text style={{marginLeft:20,marginRight:20,fontSize:30,color:'white',fontWeight:'bold'}}>Người dùng</Text>
        <Image
          source={require("../Image/user_option.png")}
          style={{ width: 100, height: 100,marginLeft:20}}
        />
       
      </TouchableOpacity>
    </View>
  );
};

export default RegisterOption;

const styles = StyleSheet.create({});
