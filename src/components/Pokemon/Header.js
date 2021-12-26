import React, { Fragment } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { capitalize} from "lodash"
import getColorByPokemonType from "../../utils/getColorByPokemonType";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header(props) {

    const { name, order, image, type } = props;
    
    const color = getColorByPokemonType(type);
    const bgStyles = { backgroundColor: color, ...styles.bgStyles}

    return (
        <Fragment>
            <View style={bgStyles} />
            <SafeAreaView style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{capitalize(name)}</Text>
                    <Text style={styles.order} >#{`${order}`.padStart(3,0)}</Text>
                </View>
                <View style={styles.contentImg}>
                    <Image source={{uri: image}} style={styles.image} />
                </View>
            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 300,
        resizeMode: "contain"
    },
    contentImg: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 30
    },
    bgStyles: {
        width: "100%",
        height: 400,
        position: 'absolute',
        borderBottomEndRadius: 300,
        borderBottomLeftRadius: 300,
        transform: [{scaleX: 2}]
    },
    content: {
        marginHorizontal: 20,
        marginTop: 30
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40
    },
    name: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 27
    },
    order: {
        color:"#fff",
        fontWeight: "bold"
    }
});
