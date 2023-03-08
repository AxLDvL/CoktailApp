
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./view/Home";
import DetailsScreen from "./view/Details";
import FavoritesScreen from "./view/Favorites"
import Ionicons from "@expo/vector-icons/Ionicons"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StatusBar} from "react-native";


const Stack = createNativeStackNavigator

export default function App() {
    return (
    <NavigationContainer>
        <StatusBar style="auto"/>
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component ={HomeScreen}/>
            <Stack.Screen name={"Details"} component ={DetailsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

    );
}

