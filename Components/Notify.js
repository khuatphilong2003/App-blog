import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTile from './HeaderTitle'
import { useState } from 'react'
import ItemComment from './ItemComment'
import ItemNotify from './ItemNotify'
import WebView from 'react-native-webview'
import YoutubeIframe from 'react-native-youtube-iframe'
const Notify = () => {
  return (
    <View>
      <HeaderTile title="Thông báo"/>
      
      <View style={{margin:20}}>
      <YoutubeIframe
        play={false}
        videoId={'ExBbScK_2JM'}
        width={'100%'}
        height={200}
      />

      
      </View>
      <View style={{margin:20}}>
      <YoutubeIframe
        play={false}
        videoId={'uK1H3C-gA9k'}
        width={'100%'}
        height={200}
      />
      </View>
      
    </View>
  )
}

export default Notify

const styles = StyleSheet.create({})