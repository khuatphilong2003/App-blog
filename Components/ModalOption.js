import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "./color/color";
import { API } from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalUpdatePosts from "./ModalUpdatePosts";

const ModalOption = (props) => {
  const [visible, setVisible] = useState(false);
  const { idUserPosts, setidUserPosts } = useState("");
  const onDeletePost = () => {
    if (props.idUserLogin == props.IdUserPosts) {
      Alert.alert("Thông báo","Bạn có chắc chắn muốn xóa bài viết",[
        {
          text:"Đồng ý",
          onPress:()=>{
            let uri_delet_post = API + "tbPosts/" + props.IdPosts;
            fetch(uri_delet_post, {
              method: "DELETE",
            })
              .then((res) => {
                return res.json();
              })
              .then((res_json) => {
                alert("Xóa thành công");
              });
          }
        },{
          text:"Đóng"
          
        }
      ])
      
    } else {
      alert("Không thể xóa bài viết vì không phải bài viết của mình");
    }
  };
  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <View style={{ flex: 1 }}></View>
        <View style={{backgroundColor:color.xanh,paddingTop:20,borderTopLeftRadius:20,borderTopRightRadius:20}}>
          <TouchableOpacity
            onPress={onDeletePost}
            style={{
              marginHorizontal: 20,
              backgroundColor:'white',
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
              flexDirection:'row'
            }}
          >
            <Text style={{fontSize:20}}>Xóa bài viết</Text>
          </TouchableOpacity>

          <ModalUpdatePosts
            IdUserLogin={props.idUserLogin}
            IdPosts={props.IdPosts}
            IdUserPosts={props.IdUserPosts}
          />

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              marginHorizontal: 20,
              marginBottom: 50,
              backgroundColor:color.xam,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{fontSize:20}}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        <Image
          source={require("../Image/option.png")}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ModalOption;

const styles = StyleSheet.create({});
