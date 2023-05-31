import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "./color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { checkEmail, checkFulName, checkPass, checkPhone } from "./Validation";
import { API } from "./API";

const Register = (props) => {
    let uriUser = API+"tbUsers?username=" //Địa chỉ lấy user
    let uri = API+"tbUsers" //Địa chỉ server


  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorFullname, setErrorFullname] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [listUser, setListUser] = useState("");
  const [check,setcheck] = useState(false);
  const onRegister = () => {
    if (email.length == 0) {
      setErrorEmail("Email không được bỏ trống");
      return;
    }
    if (phone.length == 0) {
      setErrorPhone("Phone không được bỏ trống");
      return;
    }
    if (fullName.length == 0) {
      setErrorFullname("Họ tên không được bỏ trống");
      return;
    }
    if (username.length == 0) {
      setErrorUsername("Tên đăng nhập không được bỏ trống");
      return;
    }
    if (pass.length == 0) {
      setErrorPass("Mật khẩu không được bỏ trống");
      return;
    }

    let url_checkRegister = uriUser +username;
    
    fetch(url_checkRegister,{
      method:"GET"
    }).then((res)=>{return res.json()}).then((res_json)=>{
      if(res_json.length != 1){
        setErrorUsername("")
        let objU = {
              username: username,
              password: pass,
              phone: phone,
              email: email,
              tbRolesId:2,
              full_name: fullName,
              avatar_user: null}
        fetch(url_checkRegister,{
          method:"POST",
          headers: {
                  // Định dạng dữ liệu gửi đi
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(objU),
        }).then((res)=>{
          if(res.status == 201){
            Alert.alert("Chúc mừng","Bạn đã đăng ký thành công",[
              {
                text:"Đănh nhập ngay",
                onPress: ()=>props.navigation.navigate('Login') 
              },
              {
                text:"Đóng",
                style:'cancel'
              }
            ])
          }
        })

      }
      else{
        setErrorUsername("Tài khoản đã tồn tại");
      }
      
    })
      

        
      
  };
  const checkUsername = ()=>{
  
    listUser.map((item) => {
      if (item.username == username) {
        setcheck(false);
        return;
      } else {
        setcheck(true);
        return 
      }
    });
  }
  const onGetData = () => {
    let url_checkRegister = uri;
    fetch(url_checkRegister)
      .then((res) => {
        return res.json();
      })
      .then((res_json) => setListUser(res_json));
  };
  useEffect(() => {
    onGetData();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="height"
    >
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/register.png")}
              style={{ width: 250, height: 250, marginTop: 10 }}
            />
          </View>
          <View style={{ height: 100 }}>
            <Text
              style={{ fontSize: 40, fontWeight: "bold", color: color.xanh }}
            >
              Tài khoản người dùng
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("../Image/email.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Email"
              style={styles.textinput}
              onChangeText={(Text) => {
                if (checkEmail(Text) == true) {
                  setErrorEmail("");
                  setEmail(Text);
                } else {
                  setErrorEmail("Email không đúng định dạng");
                }
              }}
            />
          </View>
          <View>
            <Text style={{ color: "red" }}>{errorEmail}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/phone.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Số điện thoại"
              style={styles.textinput}
              onChangeText={(Text) => {
                if (checkPhone(Text) == false) {
                  setErrorPhone("Phone không đúng định dạng");
                } else {
                  setErrorPhone("");
                  setPhone(Text);
                }
              }}
            />
          </View>
          <View>
            <Text style={{ color: "red" }}>{errorPhone}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              paddingLeft: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/fullname.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Họ tên"
              style={styles.textinput}
              onChangeText={(Text) => {
                setFullName(Text);
              }}
            />
          </View>
          <View>
            <Text style={{ color: "red" }}>{errorFullname}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/user.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Tên đăng nhập"
              style={styles.textinput}
              onChangeText={(Text) => 
              setUsername(Text)
              }
            />
          </View>
          <View>
            <Text style={{ color: "red" }}>{errorUsername}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingBottom: 3,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Image/lock.png")}
              style={{
                tintColor: color.xanh,
                marginRight: 10,
                width: 15,
                height: 15,
              }}
            />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.textinput}
              onChangeText={(Text) => {
                if (checkPass(Text) == false) {
                  setErrorPass(
                    "Mật khẩu từ 6 đến 20 ký tự chứa ít nhất một chữ số, {\n}một chữ hoa và một chữ thường"
                  );
                } else {
                  setErrorPass("");
                  setPass(Text);
                }
              }}
            />
          </View>
          <View>
            <Text style={{ color: "red" }}>{errorPass}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: color.xanh,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={onRegister}
            >
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  textinput: {
    width: 300,
    paddingTop: 5,
    height: 30,
  },
});
