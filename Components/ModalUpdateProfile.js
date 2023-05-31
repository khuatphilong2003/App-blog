import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import color from "./color/color";

const ModalUpdateProfile = (props) => {
  
  return (
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
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: color.xanh,
              borderRadius: 20,
            }}
          >
            <Text>Tên hiện tại: {props.dataFullName}</Text>
            <View
              style={{
                padding: 10,
                marginVertical: 10,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              <TextInput placeholder="Nhập vào tên muốn đổi" />
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
                onPress={()=>setVisibleModal(false)}
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
  );
};

export default ModalUpdateProfile;

const styles = StyleSheet.create({});
