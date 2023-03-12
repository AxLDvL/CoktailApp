import * as React from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native';
import ShowCoktailImage from "../components/ShowCoktailImage";
import {useSelector} from "react-redux";
import {useState} from "react";


export default function FavoritesScreen({ navigation }) {
    const [selectedId, setSelectedId] = useState("");
    const favorites = useSelector((state) => state.favoriteCok)

    const renderItem = ({item}) => {
        const backgroundColor = item.idDrink === selectedId ? 'white' : 'white';
        const color = item.idDrink === selectedId ? 'darkgrey' : 'grey';

        return (
            <View style={styles.contain}>
                <ShowCoktailImage
                    item={item}
                    onPress={() => {
                        setSelectedId(item.idDrink);
                        navigation.navigate('Details',{idDrink:item.idDrink})
                    }}
                    backgroundColor={backgroundColor}
                    textColor={color}
                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={item => item.idDrink}
                    extraData={[selectedId]}
                    numColumns={2}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width:"100%",
        height:"100%"
    },
    contain:{
        flex:1,
        flexDirection:"column"
    }
});
