import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "./API";
import color from "./color/color";
import ModalListPostFollow from "./ModalListPostFollow";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ItemUserFollow = (props) => {
  const { userFollowingId } = props.DataUser;
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [id,setid] = useState("");
  const getData = async () => {
    const JsonValue = await AsyncStorage.getItem("ObjUser");
    let uri = API + "tbUsers/" + userFollowingId;
    let objU = JSON.parse(JsonValue);
    setid(objU.id)
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setImg(res_json.avatar_user);
        setName(res_json.full_name);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        margin: 10,
      }}
    >
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        {img != null && (
          <Image
            source={{ uri: img }}
            style={{ width: 60, height: 60, borderRadius: 100 }}
          />
        )}
        <View style={{ marginLeft: 10, marginTop: 10, flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
          <ModalListPostFollow idUserFollow={userFollowingId} getIdUser = {id}/>
        </View>
        <View
          style={{
            borderRadius: 10,
            padding: 5,
            borderWidth: 1,
            borderColor: color.xam,
            height: 30,
          }}
        >
          <Text style={{ color: color.xam }}>Đang theo dõi</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemUserFollow;

const styles = StyleSheet.create({});
