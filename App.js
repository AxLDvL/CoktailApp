
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./view/Home";
import DetailsScreen from "./view/Details";
import FavoritesScreen from "./view/Favorites"
import Ionicons from "@expo/vector-icons/Ionicons"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Provider} from "react-redux";
import {store} from "./redux";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';





export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
        </Provider>
    );
}

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return(
        <Tab.Navigator
            header
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Cocktail app') {
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
            <Tab.Screen options={{headerShown: false}} name="My cocktails" component={HomeStack} />
            <Tab.Screen options={{headerShown: false}} name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator  >
            <Stack.Screen options={{headerShown: false}}  name="Home" component={DrawerMenu } />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
    const [selectedScreen, setSelectedScreen] = React.useState("CocktailDrink");
    const handleScreenSelection = (screenName) => {
        setSelectedScreen(screenName);
    };
    return (
        <Drawer.Navigator
            useLegacyImplementation
            initialRouteName={selectedScreen}
        >
            <Drawer.Screen
                name='Ordinary drink'
                component={HomeScreen}
                options={() => ({
                    title: 'Ordinary drink',
                    drawerIcon: ({ focused}) => (
                        <MaterialCommunityIcons
                            name={focused ? 'glass-cocktail' : 'glass-cocktail-off'}
                            color={"blue"}
                            size={14}
                        />
                    ),
                    onPress: () => handleScreenSelection('Ordinary_Drink')
                })}
            />
            <Drawer.Screen
                name='Cocktail'
                component={HomeScreen}
                options={() => ({
                    title: 'Cocktail',
                    drawerIcon: ({ focused}) => (
                        <MaterialCommunityIcons
                            name={focused ? 'glass-cocktail' : 'glass-cocktail-off'}
                            color={"blue"}
                            size={14}
                        />
                    ),
                    onPress: () => handleScreenSelection('CoktailDrink')
                })}
            />

        </Drawer.Navigator>
    );
};

