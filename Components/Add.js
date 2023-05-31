import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderHome from "./HeaderTitle";
import color from "./color/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderTile from "./HeaderTitle";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { API } from "./API";

const Add = () => {
  let uri = API + "tbUsers/"; // Địa chỉ server
  let uri_posts = API + "tbPosts"; // Địa chỉ server
  const [idUser, setIdUser] = useState("");
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [img_uri, setimg_uri] = useState(null);
  const [img_base64, setimg_base64] = useState(null);

  const AddPosts = () => {
    let objPosts = {
      tbUsersId: idUser,
      content: content,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      imgPosts: img_base64,
    };
    fetch(uri_posts, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objPosts),
    }).then((res) => {
      if (res.status == 201) {
        alert("Thêm bài thành công");
        setContent("");
        setimg_base64(null);
      }
    });
  };

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      let _uri = result.assets[0].uri; // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        setimg_base64("data:image/" + file_ext + ";base64," + res);
        console.log(img_base64);
      });
    }
  };

  const getDataUser = async () => {
    const JsonValue = await AsyncStorage.getItem("ObjUser");
    let objU = JSON.parse(JsonValue);
    let uri_user = uri + objU.id;
    fetch(uri_user)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => {
        setAvatar(res_json.avatar_user);
        setFullname(res_json.full_name);
        setRole(res_json.tbRolesId);
        setIdUser(res_json.id);
        console.log("long");
      });
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTile title="Tạo bài viết" />

      {role == 1 && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              margin: 20,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
              }}
            >
              <View></View>
              {avatar == null && (
                <Image
                  source={require("../Image/user_option.png")}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                />
              )}
              {avatar != null && (
                <Image
                  source={{ uri: avatar }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                />
              )}
              <View>
                <Text
                  style={{ marginLeft: 20, fontWeight: "bold", fontSize: 20 }}
                >
                  {fullname}
                </Text>
              </View>
            </View> */}
            <View style={{ flex: 1 }}>
              <View>
                <TextInput
                  multiline={true}
                  editable
                  placeholder="Bạn đang nghĩ gì"
                  numberOfLines={10}
                  
                  style={{ padding: 10,height:100 }}
                  onChangeText={(Text) => setContent(Text)}
                  value={content == "" ? "" : content}
                />
              </View>

              {img_base64 == null && (
                <TouchableOpacity
                  style={{
                    height: 300,
                    backgroundColor: color.xam,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                  }}
                  onPress={addImage}
                >
                  <Image
                    source={require("../Image/image-.png")}
                    style={{ width: 50, height: 50 }}
                  />
                  <View>
                    <Text>Thêm ảnh </Text>
                  </View>
                </TouchableOpacity>
              )}
              {img_base64 != null && (
                <TouchableOpacity
                  style={{
                    marginVertical: 20,
                    height: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                  }}
                  onPress={addImage}
                >
                  <Image
                    source={{ uri: img_base64 }}
                    style={{ height: 300, width: 300, marginBottom: 10 }}
                  />
                  <TouchableOpacity onPress={() => setimg_base64(null)}>
                    <Image
                      source={require("../Image/cancel.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: content == "" ? color.xam : color.xanh,
                  borderRadius: 10,
                  marginTop: 30,
                }}
                disabled={content == "" ? true : false}
                onPress={AddPosts}
              >
                <Text style={{ color: "black" }}>Đăng bài</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      {role == 2 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: color.xanh, fontSize: 20 }}>
            Do tài khoản của bạn là tài khoản người{" "}
          </Text>
          <Text style={{ color: color.xanh, fontSize: 20 }}>
            dùng nên không đăng được bài
          </Text>
        </View>
      )}
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
