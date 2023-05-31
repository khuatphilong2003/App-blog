import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Share
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "./color/color";
import ItemComment from "./ItemComment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./API";
import ModalOption from "./ModalOption";

const ItemPosts = (props) => {
  const onShare = async () => {
      const result = await Share.share({message:content,url:imgPosts});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
  };
  let uri = API + "tbUsers/"; // địa chỉ server
  const [textFollow, setTextFollow] = useState("");
  const {
    id,
    tbUsersId,
    content,
    commentCount,
    shareCount,
    likeCount,
    imgPosts,
  } = props.DataPosts;
  const [nhan, setNhan] = useState(1);
  const [fullname, setFullname] = useState("");
  const [imgUser, setImgUser] = useState();

  const onFollow = () => {
    let uri_follow =
      API +
      "tbFollow?userFollowerId=" +
      props.GetIdUser +
      "&userFollowingId=" +
      tbUsersId;
    fetch(uri_follow)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        if (res_json.length == 1) {
          setTextFollow("Đang theo dõi");
        } else {
          setTextFollow("Theo dõi");
        }
      });
  };

  const addFollow = () => {
    if (props.GetIdUser == tbUsersId) {
      alert("Bạn không thể thự theo dõi mình");
      return;
    }

    if(textFollow == "Theo dõi"){
      let uri_add_follow = API + "tbFollow";
      let objFollow = {
        userFollowerId: props.GetIdUser,
        userFollowingId: tbUsersId,
      };
      fetch(uri_add_follow, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objFollow),
      }).then((res_json) => {
        if (res_json.status == 201) {
          alert("Theo dõi thành công");
          setTextFollow("Đang theo dõi");
          onFollow();
        }
      });
    }
    else{
      alert("Bạn đang theo dõi người đó rồi")
    }
   
  };
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
        onFollow();
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
            source={{ uri: imgUser }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ marginLeft: 10, justifyContent: "center" }}>
          <Text>{fullname}</Text>
          <Text></Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={{
            marginRight: 10,
            height: 30,
            justifyContent: "center",
            alignItems: "flex-end",
            borderColor: textFollow == "Theo dõi" ? color.xanh : color.xam,
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
          }}
          onPress={addFollow}
        >
          <Text
            style={{
              // color: props.follow == "Theo dõi" ? color.xanh : color.xam,
              color: textFollow == "Theo dõi" ? color.xanh : color.xam,
            }}
          >
            {textFollow}
          </Text>
        </TouchableOpacity>
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
            style={{ width: 385, height: 400 }}
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
        <TouchableOpacity onPress={onShare}>
          <Image source={require("../Image/share.png")} style={styles.img3} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginLeft: 10, marginVertical: 5 }}>
        <Text style={{ fontSize: 13 }}>{likeCount} likes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 10, marginVertical: 5 }}
        onPress={() => setNhan(parseInt(nhan) + 1)}
      >
        <Text style={{ fontSize: 13 }}>View all {commentCount} comments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemPosts;

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
