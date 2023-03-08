import * as React from 'react';
import {Button, View, Text, TouchableOpacity, StatusBar, StyleSheet, SafeAreaView, FlatList, Image} from 'react-native';
import {useEffect, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DetailsScreen from "./Details";
import FavoritesScreen from "./Favorites";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.title, {color: textColor}]}>{item.strDrink}</Text>
        </View>
        <Image style={{width:150,height:150}} source={{uri:item.strDrinkThumb}} />
    </TouchableOpacity>
);
const Tab = createBottomTabNavigator();
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
        const color = item.idDrink === selectedId ? 'grey' : 'black';

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
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home' : 'home-outline';
                            } else if (route.name === 'Details') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                            } else if (route.name === 'Favorites') {
                                iconName = focused ? 'md-heart-sharp' : 'md-heart-outline';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Details" component={DetailsScreen} options={{headerShown: false}} />
                    <Tab.Screen name="Favorites" component={FavoritesScreen} />
                </Tab.Navigator>
            </NavigationContainer>
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
        flexDirection:"column",
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flex:1,
        width:150,
        height:150,
        alignItems: "center",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    title: {
        fontSize: 14,
    },
});