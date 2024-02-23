import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


export default function testComponent() {
    return (
        <Text style={{color: 'black', fontSize: 16}}>Hello!</Text>
    )
}