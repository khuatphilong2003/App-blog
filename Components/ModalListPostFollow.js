import {
    FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTile from "./HeaderTitle";
import color from "./color/color";
import { API } from "./API";
import ItemPosts from "./ItemPosts";

const ModalListPostFollow = (props) => {
  const [visible, setVisible] = useState(false);
  const [list,setList] = useState("");
  const getData = ()=>{
    let uri_list = API + "tbPosts?tbUsersId=" + props.idUserFollow;
    fetch(uri_list)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setList([...res_json])
      });

  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <View>
      <Modal
        visible={visible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flex: 1,backgroundColor:color.xam}}>
          <View
            style={{
              flexDirection: "row",
              height: 80,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../Image/close.png")}
                style={{ width: 15, height: 15, tintColor: color.xanh }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
              <Text
                style={{ fontSize: 20, color: color.xanh, fontWeight: "bold" }}
              >
                Danh sách bài viết
              </Text>
            </View>
            <View style={{ width: 15, height: 15 }}>

            </View>
            
          </View>
          <View style={{flex:1}}>
          <FlatList
        data={list}
        renderItem={({ item }) => <ItemPosts DataPosts={item} GetIdUser = {props.getIdUser}/>}
        />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Xem tất cả bài viết</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalListPostFollow;

const styles = StyleSheet.create({});
