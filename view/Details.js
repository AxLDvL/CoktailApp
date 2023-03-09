import * as React from 'react';
import {View, Text, Image, StyleSheet, StatusBar,FlatList} from 'react-native';
import {useEffect, useState} from "react";



export default function DetailsScreen({route }) {
    const { idDrink } = route.params;
    const [coktailDetail, setCoktailDetail] = useState({});

    useEffect(()=>{
        try{
            const coktail= (async () => {
                const response = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
                const data = await response.json();

                console.log("data",data.drinks[0]);

                //je convertie l'objet coktail en
                let ingredients = [];
                let quantity = [];
                for (const [key, value] of Object.entries(data.drinks[0])) {

                    if(key.startsWith('strIngredient')&& value !=null){
                        ingredients.push(value);
                    }
                    if(key.startsWith('strMeasure')&& value !=null){
                        quantity.push(value);
                    }
                }
                const recette = ingredients.map((e,i)=>{
                    return ({
                        ingredient:e,
                        quantity:quantity[i]
                    })
                })
                console.log(recette)

                const coktailInfo = {
                    name: data.drinks[0].strDrink,
                    imageUrl: data.drinks[0].strDrinkThumb,
                    instructions: data.drinks[0].strInstructions,
                    recipe:recette
                }
                console.log(coktailInfo);
                setCoktailDetail(coktailInfo)
                // je filtre le tableau coktail en fonction de la clé qui doit commencer par strIngredient
            })();
        }catch(e){
            console.error(e)
        }
    },[])
    const renderRecipe = ({item})=>{
        return(
            <>
                <Text>{item.ingredient}</Text>
                <Text>{item.quantity}</Text>
            </>
        )
    }
if(coktailDetail.propertyIsEnumerable('name')){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{coktailDetail.name}</Text>
            <Image
                style={styles.image}
                source={{uri: coktailDetail.imageUrl}}
            />
            <Text style={styles.title2}>Instructions</Text>
            <Text style={styles.paragraphe}>{coktailDetail.instructions}</Text>

           <FlatList
                data={coktailDetail?.recipe}
                renderItem = {renderRecipe}
            />
        </View>
    );
}

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width:"100%",
        height:"100%"
    },
    title: {
        flexWrap:"wrap",
        fontSize: 18,
        padding:5,
        marginVertical:10,
        alignSelf:"center",
        color:"darkgrey"
    },
    title2:{
        fontSize: 14,
        marginVertical:10,
        alignSelf:"center",
        color:"darkgrey"
    },
    image:{
        alignSelf:"center",
        width:200,
        height:200,
        margin:10
    },
    paragraphe:{
        fontSize:12,
        textAlign:"left",

    }
});
