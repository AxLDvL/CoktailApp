import * as React from 'react';
import {Button, View, Text, TouchableOpacity, StatusBar, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useEffect, useState} from "react";


const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item.strDrink}</Text>
    </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
    const [coktailList, setCoktailList] = useState([])
    const [selectedId, setSelectedId] = useState();
    useEffect(()=>{
        try{
            const coktailList = (async () => {
                const response = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
                const datas = await response.json();
                console.log(datas.drinks)
                setCoktailList(datas.drinks);
            })();
        }catch(e){
                console.error(e)
            }

        console.log(coktailList);
    },[])

    const renderItem = ({item}) => {
        const backgroundColor = item.idDrink === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.idDrink === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.idDrink);
                    console.log(item.idDrink)
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={coktailList}
                    renderItem={renderItem}
                    keyExtractor={item => item.idDrink}
                    extraData={selectedId}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});