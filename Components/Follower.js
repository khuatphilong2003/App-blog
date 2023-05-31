import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import HeaderTile from "./HeaderTitle";
import { useState } from "react";
import ItemPosts from "./ItemPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./API";
import ItemUserFollow from "./ItemUserFollow";

const Video = () => {
  const [listUserFollow, setListUserFollow] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [idUser,setIdUser] = useState("");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListPostsFollow();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const getListPostsFollow = async () => {
    const JsonValue = await AsyncStorage.getItem("ObjUser");
    let objU = JSON.parse(JsonValue);
    console.log(objU.id);
    setIdUser(objU.id);
    let uri = API + "tbFollow?userFollowerId=" + objU.id;
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        console.log("Dang follow: " + res_json.length);
        setListUserFollow([...res_json]);
        console.log(res_json[1]);
      });
  };
  useEffect(() => {
    getListPostsFollow();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <HeaderTile title="Đang theo dõi" />
      <View style={{ marginTop: 20, flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={listUserFollow}
          renderItem={({ item }) => <ItemUserFollow DataUser={item} />}
        />
      </View>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({});
