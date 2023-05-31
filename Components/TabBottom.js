import { Image, StyleSheet, Text, View } from "react-native";
import React, { Profiler, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Follower from "./Follower";
import Add from "./Add";
import Profile from "./Profile";
import Notify from "./Notify";
import color from "./color/color";
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const TabBottom = () => {
  const Tab = createBottomTabNavigator();
  
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: color.xanh,
        tabBarInactiveTintColor: color.xam,
        tabBarShowLabel: false,
        
        tabBarIcon: ({ focused }) => {
          let screenName = route.name;
          if (screenName == "Home") {
            return (
              <AntDesign name="home" size={24} color={focused ? color.xanh : color.den}/>
            );
          } else if (screenName == "Follower") {
            return (
              <SimpleLineIcons name="user-following" size={20} color={focused ? color.xanh : color.den} />
            );
          } else if (screenName == "Add") {
            return (
              <Ionicons name="add-circle-outline" size={28} color={focused ? color.xanh : color.den} />
            );
          } else if (screenName == "Notify") {
            return (
              <Ionicons name="notifications-outline" size={24} color={focused ? color.xanh : color.den} />
            );
          } else if (screenName == "Profile") {
            return (
              <FontAwesome name="user-o" size={20} color={focused ? color.xanh : color.den} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Follower"
        component={Follower}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Add" component={Add} options={{ headerShown: false }} />
      <Tab.Screen
        name="Notify"
        component={Notify}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    tintColor: color.xanh,
  },
});
