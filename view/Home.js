import * as React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity

} from 'react-native';
import { useEffect, useState} from "react";
import ShowCoktailImage from "../components/ShowCoktailImage";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useDispatch, useSelector} from "react-redux";
import {createFavorite, deleteFavorite} from "../redux";
import SearchBar from "../components/SearchBar";

const HomeScreen = ({ navigation }) => {
    const [coktailList, setCoktailList] = useState([])
    const [selectedId, setSelectedId] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [searchPhrase, setSearchPhrase] = useState('')

    const favorites = useSelector((state) => state.favoriteCok);

    const dispatch = useDispatch();

    useEffect(()=>{
        try{
            fetch ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
                .then(response => response.json())
                .then(data => {
                    console.log(data.drinks)
                    setCoktailList(data.drinks);
                })
                .catch(error => {
                    console.error(error);
                });
        }catch(e){
            console.error(e)
        }
        console.log(coktailList);
    },[])



    const isFavorite = (item) => {
        return favorites.some(e => e.idDrink === item.idDrink);
    }
    const renderItem = ({item, index}) => {
        const backgroundColor = item.idDrink === selectedId ? 'white' : 'white';
        const color = item.idDrink === selectedId ? 'darkgrey' : 'grey';
    if(index < itemsPerPage) {
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
                <View style={{flexDirection:"row-reverse"}}>
                    <TouchableOpacity
                        onPress={() => {

                            let index = favorites.findIndex((e)=>{return  e.idDrink == item.idDrink});

                            if(index === -1){
                                dispatch(createFavorite(item))
                            } else{
                                dispatch(deleteFavorite(item.idDrink))
                            }
                        }}
                        style={[styles.item, {backgroundColor:'transparent',marginHorizontal:10,marginBottom:10}]}
                    >
                        {isFavorite(item)?
                            <Ionicons  name="ios-heart" size={24} color="red" />
                            :
                            <Ionicons  name="ios-heart-outline" size={24} color="red" />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )}
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}/>
            <SafeAreaView style={styles.container}>
                    <FlatList
                        data={coktailList.slice(0, itemsPerPage)}
                        renderItem={renderItem}
                        keyExtractor={item => item.idDrink}
                        extraData={[selectedId, favorites]}
                        numColumns={2}
                        onEndReached={() => {
                            setItemsPerPage(itemsPerPage + 20);
                        }}
                        onEndReachedThreshold={5}
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
        height:"100%",

    },
    contain:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        margin:10,
        borderRadius:10
    }
});

export default HomeScreen;
