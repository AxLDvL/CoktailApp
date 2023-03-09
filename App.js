
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./view/Home";
import DetailsScreen from "./view/Details";
import FavoritesScreen from "./view/Favorites"
import Ionicons from "@expo/vector-icons/Ionicons"
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator
            header
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home' : 'home-outline';
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

            <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
    );
}



const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator  >
                <Stack.Screen options={{headerShown: false}} name="HomeT" component={HomeTabs} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen options={{headerShown: false}}  name="Favorites" component={FavoritesScreen} />
            </Stack.Navigator>
        </NavigationContainer>



    );
}

