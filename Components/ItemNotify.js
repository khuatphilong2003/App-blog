import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from './color/color'
const ItemNotify = (props) => {
    const {image,name}= props.DataItem;
  return (
    <View style={{flexDirection:'row',backgroundColor:'white',margin:10,borderRadius:10}}>
      <Image source={{uri:image}} style={{width:40,height:40,borderRadius:100,margin:10}}/>
      <View >
         <Text style={{color:'black',paddingTop:5}}>{name}</Text>
        <Text style={{color:color.xam,marginTop:5}}>Đã thêm một bài viết mới</Text>
      </View>
        
    </View>
  )
}

export default ItemNotify

const styles = StyleSheet.create({})