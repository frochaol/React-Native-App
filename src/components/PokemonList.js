import React from 'react'
import { FlatList, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    // console.log(props);
    const { pokemons, loadPokemons, isNext } = props;
    
    const loadMore = () => {
      loadPokemons();
    }

    return (
      <FlatList 
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id) }
        renderItem={({item}) => <PokemonCard pokemon={item}/>}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={isNext && loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isNext && (
            <ActivityIndicator size="large" style={styles.spinner} color="#AEAE"/>
          )          
        }
      />  
    );
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5
    },
    spinner: {
      marginTop: Platform.OS === "android" ? 30: 0,
      marginBottom: Platform.OS === "android" ? 90: 60,
    },
})