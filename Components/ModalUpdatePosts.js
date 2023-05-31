import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "./color/color";
import HeaderTile from "./HeaderTitle";
import { API } from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ModalUpdatePosts = (props) => {
  const [visible, setVisible] = useState(false);
  const [img_base64, setimg_base64] = useState(null);
  const [content, setContent] = useState("");
  const [imgUser,setImgUser] = useState("");
  const [fullnameUser,setFullNameUser] = useState("");
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
      });
    }
  };

  const getUserPosts = async ()=>{
      const JsonValue = await AsyncStorage.getItem("ObjUser");
      let objU = JSON.parse(JsonValue);
      setImgUser(objU.avatar_user);
      setFullNameUser(objU.full_name);
  }

  const getData = ()=>{
    let uri_update = API+"tbPosts/"+props.IdPosts;
    fetch(uri_update).then((res)=>{return res.json()}).then((res_json)=>{
      setContent(res_json.content);
      setimg_base64(res_json.imgPosts);
    })
  }
const UpdatePosts = () => {
  let uri_update = API+"tbPosts/"+props.IdPosts;
    let objPosts = {
      tbUsersId: props.IdUserLogin,
      content:content,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      imgPosts: img_base64,
    };
    fetch(uri_update, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objPosts),
    }).then((res) => {
      if (res.status == 200) {
        alert("Sửa bài viết thành công");
        setContent("");
        setimg_base64(null);
        setVisible(false);
      }
    });
  };

  
  useEffect(()=>{
    getUserPosts();
    getData();
  },[])
  return (
    <View>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={{ backgroundColor: color.xam, flex: 1 }}>
          <View
            style={{
              height: 80,
              backgroundColor: "white",
              borderRadius: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: "center", flex: 0.3 }}
              onPress={() => setVisible(false)}
            >
              <Image
                source={require("../Image/close.png")}
                style={{ width: 15, height: 15, tintColor: color.xanh }}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                marginLeft: 20,
                flex: 1,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: color.xanh }}
              >
                Sửa bài viết
              </Text>
            </View>
            <TouchableOpacity
              style={{ justifyContent: "center", flex: 0.3 }}
              onPress={() => setVisible(false)}
            ></TouchableOpacity>
            
          </View>

          {props.IdUserLogin == props.IdUserPosts && (
            <View
              style={{
                flex: 1,
                margin: 20,
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View></View>
                <Image
                  source={{ uri: imgUser }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                />
                <View>
                  <Text
                    style={{ marginLeft: 20, fontWeight: "bold", fontSize: 20 }}
                  >
                    {fullnameUser}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <TextInput
                  
                    multiline={true}
                    editable
                    placeholder="Bạn đang nghĩ gì"
                    numberOfLines={5}
                    style={{ padding: 10 }}
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
                  onPress={UpdatePosts}
                >
                  <Text style={{ color: "black" }}>Sửa bài</Text>
                </TouchableOpacity>    
               
              </View>
            </View>
          )}
          
          

          {props.IdUserLogin != props.IdUserPosts && (
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <Text style={{ fontSize: 20 }}>
                Không sửa được bài viết vì không phải{" "}
              </Text>
              <Text style={{ fontSize: 20 }}>bài viết của mình</Text>
            </View>
          )}
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor:"white",
          borderTopColor:color.xam,
          borderTopWidth:1,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10
        }}
      >
        <Text style={{fontSize:20}}>Sửa bài viết</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalUpdatePosts;

const styles = StyleSheet.create({});
