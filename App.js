import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Welcome from "./Components/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import TabBottom from "./Components/TabBottom";
import ItemComment from "./Components/ItemComment";
import RegisterOption from "./Components/RegisterOption";
import RegisterAdmin from "./Components/RegisterAdmin";
import color from "./Components/color/color";

import UpdateProfile from "./Components/UpdateProfile";
import DetailListPostUser from "./Components/DetailListPostUser";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListUser from "./Components/ListUser";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBottom"
          component={TabBottom}
          options={{ headerBackVisible: false, headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false, headerTintColor: color.xanh }}
        />
        <Stack.Screen
          name="RegisterOption"
          component={RegisterOption}
          options={{ headerShown: false, headerTintColor: color.xanh }}
        />
        <Stack.Screen
          name="RegisterAdmin"
          component={RegisterAdmin}
          options={{ headerShown: false, headerTintColor: color.xanh }}
        />
        
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false, headerTintColor: color.xanh }}
        />
        <Stack.Screen
          name="DetailListPostUser"
          component={DetailListPostUser}
          options={{ headerShown: false, headerTintColor: color.xanh }}
        />
        <Stack.Screen
        name="ListUser"
        component={ListUser}
        options={{ headerShown: false, headerTintColor: color.xanh }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
