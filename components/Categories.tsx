import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { categoryData } from '@/constants/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

const Categories = ({ activeCategory, setActiveCategory, categories }) => {



    return (
        <Animated.View entering={FadeInDown.duration(600).springify()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} >
                {
                    categories.map((cat, index) => {

                        let isActive = cat.name === activeCategory;

                        return (
                            <TouchableOpacity key={index} style={{ height: hp(10), justifyContent: "center", marginRight: hp(2), borderRadius: 50, alignItems: "center", }} onPress={() => setActiveCategory(cat.name)} >
                                <View>
                                    <Image source={{ uri: cat.strCategoryThumb }} style={[{ height: hp(6), width: hp(6), borderRadius: 50, objectFit: "cover", }, isActive ? { borderWidth: 5, borderColor: "#e1ad01" } : null]} />
                                </View>
                                <Text>{cat.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}

export default Categories

const styles = StyleSheet.create({})