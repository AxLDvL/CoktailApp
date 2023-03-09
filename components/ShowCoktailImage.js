import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import * as React from "react";


export default function ShowCoktailImage  ({item, onPress, backgroundColor, textColor}) {

return (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item.strDrink}</Text>
        <Image
            style={styles.image}
            source={{uri: item.strDrinkThumb}}
        />
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    item: {
        flex: 0.5,
        margin: 10,
        borderRadius:10,
    },
    title: {
        flex:1,
        flexWrap:"wrap",
        fontSize: 12,
        padding:5,
        textAlign:"center"
    },
    image:{
        flex:1,
        alignSelf:"center",
        width:100,
        height:100,
        margin:10
    }
});

