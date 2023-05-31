import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTile from "./HeaderTitle";
import ItemPosts from "./ItemPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./API";

const Home = () => {
  let uri_list_posts = API+"tbPosts?_sort=id&_order=desc"; // Địa chỉ server
  const [refreshing, setRefreshing] = React.useState(false);
  const [listPosts, setListPosts] = useState([]);
  const [idUser,setIdUser] = useState("");
  const getData = () => {
    fetch(uri_list_posts)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setListPosts([...res_json]);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  const getIdUser = async ()=>{
      const JsonValue = await AsyncStorage.getItem("ObjUser");
      let objUser = JSON.parse(JsonValue);
      setIdUser(objUser.id);
  }
  useEffect(() => {
    getData();
    getIdUser();
  },[]);
  return (
    <View style={styles.container}>
      <HeaderTile title="Trang chủ" />
      <View style={{ flex: 1, marginHorizontal: 15 }}>

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        data={listPosts}
        renderItem={({ item }) => <ItemPosts DataPosts={item} GetIdUser = {idUser}/>}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
