import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTile from "./HeaderTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "./color/color";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { checkPass } from "./Validation";
import { API } from "./API";
const UpdateProfile = ({route}) => {
  let uri = API+"tbUsers/"// địa chỉ sserver 
  
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalPass, setVisibleModalPass] = useState(false);
  const [img_uri, setimg_uri] = useState(null);
  const [img_base64, setimg_base64] = useState(null);
  const onUpdate = () =>{
    let uri_update = uri+id
    let objU = {
      username: username,
      password: passWordNew==""?password:passWordNew,
      phone: phone,
      email: email,
      tbRolesId:role,
      full_name: fullname,
      avatar_user: img_base64 == null ? avatar: img_base64,
      id:id
    }
    fetch(uri_update,{
      method:"PUT",
      headers: {
        // Định dạng dữ liệu gửi đi
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objU),
    }).then((res)=>{
      if(res.status == 200){
        alert("Sửa thành công")
      }
    })
  }
  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setimg_uri(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri; // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        // phải nối chuỗi với tiền tố data image
        setimg_base64("data:image/" + file_ext + ";base64," + res);
        console.log(img_base64);
        // upload ảnh lên api thì dùng PUT có thể viết ở đây
      });
    }
  };


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [erroPass, setErroPass] = useState("");
  const [errorChangePass, setErrorChangePass] = useState("");
  const [errorChangePassNew, setErrorChangePassNew] = useState("");
  const [passWordNew,setPassWordNew] = useState("");
  const getDataUser =  () => {
  let uri  = API+"tbUsers/"+route.params.idUser
  fetch(uri).then((res)=>{return res.json()}).then((objU)=>{
    setUsername(objU.username);
    setPassword(objU.password);
    setPhone(objU.phone);
    setAvatar(objU.avatar_user);
    setFullname(objU.full_name);
    setRole(objU.tbRolesId);
    setEmail(objU.email);
    setId(objU.id);
  })
   
  };
  useEffect(() => {
    getDataUser();
  }, []);

  const onUpdateUser = () =>{
    let uri = uri+id
    let objU = {
      username:username,
      password:passWordNew,
      phone:phone,
      avatar_user:img_base64,
      email:email,
      tbRolesId:role,
      fullname:fullname,
    }
    fetch(uri,{
      method:"PUT",
      
    })
  } 

  return (
    <KeyboardAwareScrollView>
      <HeaderTile title="Sửa thông tin cá nhân" />
      <View style={{ padding: 10 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {img_base64 == null && (
            <Image
              source={{ uri: avatar }}
              style={{ width: 130, height: 130, borderRadius: 100 }}
            />
          )}
          {img_base64 != null && (
            <Image
              source={{ uri: img_base64 }}
              style={{ width: 130, height: 130, borderRadius: 100 }}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={getImage}
        >
          <Text style={{ fontSize: 17, color: color.xanh }}>
            Thay đổi ảnh đại diện 
          </Text>
        </TouchableOpacity>
        <View
          style={{ borderWidth: 1, borderColor: color.xam, marginTop: 50 }}
        ></View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ fontSize: 20 }}>Tên đăng nhập</Text>
          <View
            style={{
              marginLeft: 50,
              borderBottomColor: color.xam,
              borderBottomWidth: 1,
              paddingBottom: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20 }}>{username}</Text>
          </View>
        </View>

        <View
          style={{ borderWidth: 1, borderColor: color.xam, marginTop: 10 }}
        ></View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ fontSize: 20, flex: 0.5 }}>Tên</Text>
          <View>
            <View
              style={{
                marginLeft: 50,
                borderBottomColor: color.xam,
                borderBottomWidth: 1,
                paddingBottom: 10,
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 20 }}>{fullname}</Text>
            </View>
            <View>
              <Modal
                visible={visibleModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                  setVisibleModal(false);
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: 300,
                      padding: 20,
                      backgroundColor: color.xanh,
                      borderRadius: 20,
                    }}
                  >
                    <Text>Tên hiện tại: {fullname}</Text>
                    <View
                      style={{
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: "white",
                      }}
                    >
                      <TextInput
                        placeholder="Nhập vào tên muốn đổi"
                        onChangeText={(Text) => setFullname(Text)}
                      />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: color.xam,
                          flex: 1,
                          padding: 10,
                          borderRadius: 10,
                          marginTop: 20,
                          alignItems: "center",
                        }}
                        onPress={() => setVisibleModal(false)}
                      >
                        <Text>Đóng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "white",
                          flex: 1,
                          padding: 10,
                          borderRadius: 10,
                          marginTop: 20,
                          marginLeft: 10,
                          alignItems: "center",
                        }}
                        onPress={() => setVisibleModal(false)}
                      >
                        <Text style={{ color: color.xanh }}>Lưu</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Text
                onPress={() => setVisibleModal(true)}
                style={{ marginLeft: 50, color: color.xanh, paddingTop: 5 }}
              >
                Chỉnh sửa
              </Text>
            </View>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: color.xam }}></View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ fontSize: 20, flex: 0.5 }}>Email</Text>
          <View
            style={{
              marginLeft: 50,
              borderBottomColor: color.xam,
              borderBottomWidth: 1,
              paddingBottom: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20 }}>{email}</Text>
          </View>
        </View>

        <View
          style={{ borderWidth: 1, borderColor: color.xam, marginTop: 10 }}
        ></View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ fontSize: 20, flex: 0.5 }}>Số điện thoại</Text>
          <View
            style={{
              marginLeft: 50,
              borderBottomColor: color.xam,
              borderBottomWidth: 1,
              paddingBottom: 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20 }}>{phone}</Text>
          </View>
        </View>

        <View
          style={{ borderWidth: 1, borderColor: color.xam, marginTop: 10 }}
        ></View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ fontSize: 20, flex: 0.5 }}>Mật khẩu</Text>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginLeft: 50,
                borderBottomColor: color.xam,
                borderBottomWidth: 1,
                paddingBottom: 10,
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 20 }}>***********</Text>
            </View>
            <View>
              <Modal
                visible={visibleModalPass}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                  setVisibleModal(false);
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: 300,
                      padding: 20,
                      backgroundColor: color.xanh,
                      borderRadius: 20,
                    }}
                  >
                  <Text>Mật khẩu hiện tại</Text>
                    <View
                      style={{
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: "white",
                      }}
                    >
                      
                      <TextInput
                        placeholder="Nhập vào mật hiện tại"
                        onChangeText={(Text) => {
                          if (Text != password) {
                            setErroPass("Mật khẩu không đúng");
                          } else {
                            setErroPass("");
                          }
                        }}
                      />
                    </View>
                    <Text style={{ color: "red" }}>{erroPass}</Text>
                    <Text>Mật khẩu mới</Text>
                    <View
                      style={{
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: "white",
                      }}
                    >
                      <TextInput
                        placeholder="Nhập vào mật khẩu mới"
                        onChangeText={(Text) => {
                          if(checkPass(Text) == false){
                            setErrorChangePass("Mật khẩu từ 6 đến 20 ký tự chứa ít nhất một chữ số, {\n}một chữ hoa và một chữ thường")
                          }
                          else{
                            setErrorChangePass("");
                            setPassWordNew(Text);
                          }
                        }}
                      />
                    </View>
                    <Text style={{color:'red'}}>{errorChangePass}</Text>
                    <Text>Nhập lại mật khẩu mới</Text>
                    <View
                      style={{
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: "white",
                      }}
                    >
                      <TextInput placeholder="Nhập vào lại mật khẩu mới" onChangeText={(Text)=>{
                        if(Text !=passWordNew){
                          setErrorChangePassNew("Mật khẩu nhập không khớp");
                        }
                        else{
                          setErrorChangePassNew("");
                        }
                      }}/>
                    </View>
                    <Text style={{color:'red'}}>{errorChangePassNew}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: color.xam,
                          flex: 1,
                          padding: 10,
                          borderRadius: 10,
                          marginTop: 20,
                          alignItems: "center",
                        }}
                        onPress={() => setVisibleModalPass(false)}
                      >
                        <Text>Đóng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "white",
                          flex: 1,
                          padding: 10,
                          borderRadius: 10,
                          marginTop: 20,
                          marginLeft: 10,
                          alignItems: "center",
                        }}
                        onPress={() => setVisibleModalPass(false)}
                      >
                        <Text style={{ color: color.xanh }}>Lưu</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Text
                onPress={() => setVisibleModalPass(true)}
                style={{ marginLeft: 50, color: color.xanh, paddingTop: 5 }}
              >
                Chỉnh sửa
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ borderWidth: 1, borderColor: color.xam, marginTop: 10 }}
        ></View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            style={{
              width: 200,
              height: 30,
              padding: 5,
              backgroundColor: color.xanh,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={onUpdate}
          >
            <Text>Xong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
