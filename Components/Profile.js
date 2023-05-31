import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import HeaderTile from "./HeaderTitle";
import color from "./color/color";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./API";
import ItemPostsUser from "./ItemPostsUser";
import ItemPosts from "./ItemPosts";

const Profile = ({ navigation, route }) => {
  const [listPosts, setListPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("");
  const [idUserPosts, setIdUserPosts] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [listFollow,setListFollow] = useState([]);
  const [listFollower,setListFollower] = useState([]);

  const getListPosts = async () => {
    const JsonValue = await AsyncStorage.getItem("ObjUser");
    let objU = JSON.parse(JsonValue);
    
    setIdUserPosts(objU.id);
    let uri_list = API + "tbPosts?tbUsersId=" + objU.id;
    fetch(uri_list)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setListPosts([...res_json]);
        console.log(res_json.length);
      });

    let uri_get_user = API + "tbUsers/" + objU.id;
    fetch(uri_get_user)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setAvatar(res_json.avatar_user);
        setFullname(res_json.full_name);
      });

      let uri_listFollow = API+"tbFollow?userFollowingId="+objU.id;
      fetch(uri_listFollow).then((res)=>{return res.json()}).then((res_json_follow)=>{
        setListFollow([...res_json_follow])
      })

      let uri_listFollower = API+"tbFollow?userFollowerId="+objU.id;
      fetch(uri_listFollower).then((res)=>{return res.json()}).then((res_json_follow)=>{
        setListFollower([...res_json_follow])
      })
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getListPosts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: color.xanh }}>
      <HeaderTile title="Trang cá nhân" />

      <View style={{ flexDirection: "row", margin: 20 }}>
        {avatar == null && (
          <Image
            source={require("../Image/user_option.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginRight: 30,
            }}
          />
        )}
        {avatar != null && (
          <Image
            source={{ uri: avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginRight: 30,
            }}
          />
        )}

        <View>
          <Text style={{ fontSize: 25 }}>{fullname}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderColor: "white",
                borderWidth: 1,
                width: 80,
                padding: 5,
              }}
              onPress={() =>
                navigation.navigate("UpdateProfile", { idUser: idUserPosts })
              }
            >
              <Text style={{ color: "white" }}>Chỉnh sửa </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderColor: "white",
                borderWidth: 1,
                width: 120,
                padding: 5,
                marginLeft:20
              }}
              onPress={() =>
                navigation.navigate("ListUser", { idUser: idUserPosts })
              }
            >
              <Text style={{ color: "white" }}>Quản lí tài khoản </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
           
            <Text style={{ marginRight:5 }}>Bài viết:</Text>
            <Text style={{ marginRight: 5,marginRight:20, fontWeight: "bold" }}>
              {listPosts.length}
            </Text>
            
            <Text style={{ }}>Người theo dõi: </Text>
            <Text style={{fontWeight: "bold" }}>{listFollow.length}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          
            <Text style={{ marginRight:5 }}>Đang theo dõi: </Text>
            <Text style={{ marginRight: 5, fontWeight: "bold" }}>{listFollower.length}</Text>
          </View>
          
        </View>
      </View>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <FlatList
          data={listPosts}
          renderItem={({ item }) => (
            <ItemPosts DataPosts={item} GetIdUser={idUserPosts} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
