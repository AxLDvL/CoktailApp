import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function FavoritesScreen({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Favorites Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Text>List of favorite cocktails:</Text>
            {/*favoriteCoktails.map((coktail) => (
              */}
        </View>
    );
}