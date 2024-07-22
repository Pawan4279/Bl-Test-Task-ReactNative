import React from "react";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import commonStyle from "../themes/commonstyle";
import ProductCard from "../mainNavigation/productCard";

const HomeScreen = (props) =>{

    return(
        <LinearGradient
        colors={['#E44D26', '#F16529']}
        style={commonStyle.pageContainer}><ProductCard /></LinearGradient>
    )
}

export default HomeScreen;