import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { API } from './API';

const ItemUser = (props) => {
    const {username,avatar_user,tbRolesId,id} = props.Data;
    const deleteUser = ()=>{

        Alert.alert("Thông báo","Bạn có chắc chắn muốn xóa",[
            {
                text:"Đồng ý",
                onPress:()=>{
                    let uri = API+"tbUsers/"+id
                    fetch((uri),{
                        method:'Delete'
                    }).then((res)=>{return res.json()}).then((res_json)=>{
                        alert("Xóa thành công");
                    })
                }
            },
            {
                text:"Đóng",
                
            }
        ])
            
    }
  return (
    <View>
      <View style={{flexDirection:'row',padding:10,backgroundColor:'white',margin:10,borderRadius:10,shadowColor:'black',
       shadowOpacity:0.26,
       shadowOffset:{width:0,height:2},
       shadowRadius:8,
       elevation:5,}}>
        <Image
            source={{uri:avatar_user}}
            style={{width:70,height:70,borderRadius:100,marginRight:20}}
        />
        <View style={{flex:1}}>
            <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>
               {username}
            </Text>
            </View>
            <View>
            {tbRolesId == 1 && <Text>Admin</Text>}
            {tbRolesId == 2 && <Text>User</Text>}
            </View>
        </View>
        <View>
            <Text onPress={deleteUser}>Xóa</Text>
            
        </View>
        
      </View>
    </View>
  )
}

export default ItemUser

const styles = StyleSheet.create({})