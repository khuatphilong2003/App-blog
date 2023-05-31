import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTile from "./HeaderTitle";
import { API } from "./API";
import ItemPosts from "./ItemPosts";
import ItemPostsUser from "./ItemPostsUser";

const DetailListPostUser = ({ navigation, route }) => {
  const [listPosts, setListPosts] = useState([]);
  const getData = () => {
    let uri = API + "tbPosts?tbUsersId=" + route.params.idUserPosts;
    fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setListPosts([...res_json]);
        console.log(res_json.length);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{flex:1}}>
      <HeaderTile title="Danh sách bài viết của bạn" />
      <View style={{flex:1,marginHorizontal:20,marginVertical:20}}>
        <FlatList
          data={listPosts}
          renderItem={(item) => <ItemPostsUser DataItemPosts={item}  DataContent = {item.content}/>}
        />
      </View>
    </View>
  );
};

export default DetailListPostUser;

const styles = StyleSheet.create({});
