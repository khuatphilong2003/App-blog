import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  AppRegistry,
} from "react-native";
import React, { useState } from "react";
import color from "./color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./API";


const Login = ({ navigation }) => {
  let uri = API+"tbUsers?username=" // Địa chỉ lấy user
  const [count, setCount] = useState(1);
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const onLogin = () => {
    if (username.length == 0) {
      setError("Userame không được bỏ trống");
      return;
    }
    if (pass.length == 0) {
      setError("Password không được bỏ trống");
      return;
    }
    //url check login
    let urlCheckLogin =uri
       + username;
    fetch(urlCheckLogin)
      .then((res) => {
        return res.json();
      })
      .then(async (res_json) => {
        if (res_json.length != 1) {
          setError("Username không đúng hoặc tài khoản không tồn tại");
          console.log(urlCheckLogin);
          return;
        }
        let objU = res_json[0];
        if (objU.password != pass) {
          setError("Password không đúng");
          return;
        }
        setError("");
       
          navigation.navigate("TabBottom");

        await AsyncStorage.setItem("ObjUser", JSON.stringify(objU));
        await AsyncStorage.setItem("GetIdUserLogin",`${objU.id}`);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="height"
    >
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <View
            style={{
              height: 350,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/login.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
          <View style={{ height: 100 }}>
            <Text
              style={{ fontSize: 40, fontWeight: "bold", color: color.xanh }}
            >
              Đăng nhập
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/user.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Username"
              onChangeText={(Text) => setUserName(Text)}
              style={{ width: 300, paddingTop: 10, fontSize: 15 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/lock.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={count % 2 != 0 ? true : false}
              onChangeText={(Text) => setPass(Text)}
              style={{ width: 300, paddingTop: 10, fontSize: 15 }}
            />
            <TouchableOpacity onPress={() => setCount(parseInt(count) + 1)}>
              {count % 2 != 0 && (
                <Image
                  source={require("../Image/view.png")}
                  style={{ width: 15, height: 15, tintColor: color.xanh }}
                />
              )}
              {count % 2 == 0 && (
                <Image
                  source={require("../Image/hide.png")}
                  style={{ width: 15, height: 15, tintColor: color.xanh }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "red", fontSize: 10 }}>{error}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: color.xanh,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                borderRadius: 10,
              }}
              onPress={onLogin}
            >
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>Or, login with...</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <Image source={require("../Image/facebook.png")} />
            <Image
              source={require("../Image/search.png")}
              style={{ marginHorizontal: 30 }}
            />
            <Image source={require("../Image/twitter.png")} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text>New to the app?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterOption")}
            >
              <Text style={{ color: color.xanh, fontWeight: "bold" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
