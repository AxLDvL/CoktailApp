import * as React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    FlatList,

} from 'react-native';
import {useEffect, useState} from "react";
import ShowCoktailImage from "../components/ShowCoktailImage";


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
        const backgroundColor = item.idDrink === selectedId ? 'white' : 'white';
        const color = item.idDrink === selectedId ? 'darkgrey' : 'grey';


        return (
            <ShowCoktailImage
                item={item}
                onPress={() => {
                    setSelectedId(item.idDrink);
                    console.log("selectedId",selectedId);
                    console.log("idDrink",item.idDrink);
                    navigation.navigate('Details',{idDrink:item.idDrink})
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <SafeAreaView style={styles.container}>
                <FlatList

                    data={coktailList}
                    renderItem={renderItem}
                    keyExtractor={item => item.idDrink}
                    extraData={selectedId}
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
});