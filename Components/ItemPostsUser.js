import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React ,{useEffect, useState}from "react";
import ModalOption from "./ModalOption";
import { API } from "./API";

const ItemPostsUser = (props) => {
  let uri = API + "tbUsers/";
  const { tbUsersId, content, commentCount, shareCount, likeCount, imgPosts } =
    props.DataItemPosts;
    const [fullname, setFullname] = useState("");
  const [imgUser, setImgUser] = useState();
  const getUserPosts = () => {
    let uri_user = uri + tbUsersId;
    fetch(uri_user, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setFullname(res_json.full_name);
        setImgUser(res_json.avatar_user);
      });
  };
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <View>
          <Image
            source={{ uri: props.avatar }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ marginLeft: 10, justifyContent: "center", flex: 1 }}>
          <Text></Text>
        </View>
        <ModalOption
          IdPosts={id}
          IdUserPosts={tbUsersId}
          idUserLogin={props.GetIdUser}
          ContentPosts={content}
          ImgPosts={imgPosts}
          FullNameUser={fullname}
          ImgUser={imgUser}
        />
      </View>
      <View style={styles.posts}>
        <Text>{content}</Text>
      </View>
      {imgPosts != null && (
        <View>
          <Image
            source={{ uri: imgPosts }}
            style={{ width: 374, height: 400 }}
          />
        </View>
      )}

      <View style={styles.menu}>
        <TouchableOpacity>
          <Image source={require("../Image/like.png")} style={styles.img1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNhan(parseInt(nhan) + 1)}>
          <Image
            source={require("../Image/comments.png")}
            style={styles.img2}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../Image/share.png")} style={styles.img3} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginLeft: 10, marginVertical: 5 }}>
        <Text style={{ fontSize: 13 }}> likes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 10, marginVertical: 5 }}
        onPress={() => setNhan(parseInt(nhan) + 1)}
      >
        <Text style={{ fontSize: 13 }}>View all comments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemPostsUser;

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "#DBDBDB",
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    padding: 10,
  },
  posts: {
    marginHorizontal: 10,
  },
  img1: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  img2: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  img3: {
    width: 20,
    height: 20,
  },
  menu: {
    flexDirection: "row",
    marginTop: 10,
  },
});
