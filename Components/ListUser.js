import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTile from "./HeaderTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "./color/color";
import ItemUser from "./ItemUser";
import { API } from "./API";

const ListUser = () => {
  const [idUse, setIdUser] = useState([]);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getIdUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const getIdUser = async () => {
    let uri = API + "tbUsers";
    const JsonValue = await AsyncStorage.getItem("ObjUser");
    let objU = JSON.parse(JsonValue);
    setIdUser(objU.tbRolesId);
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setList([...res_json]);
        console.log(list.length + "Danh sach ");
      });
  };
  useEffect(() => {
    getIdUser();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <HeaderTile title="Danh sách tài khoản" />
      {idUse == 2 && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: color.xanh }}>
            Do tài khoản là tài khoản người dùng nên không xem được
          </Text>
        </View>
      )}
      {idUse == 1 && (
        <View style={{ marginTop: 20, flex: 1 }}>
          <FlatList
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={list}
            renderItem={({ item }) => <ItemUser Data={item} />}
          />
        </View>
      )}
    </View>
  );
};

export default ListUser;

const styles = StyleSheet.create({});
