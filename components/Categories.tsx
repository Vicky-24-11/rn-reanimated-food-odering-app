import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import CachedImage from './CachedImage';

const Categories = ({ activeCategory, handleCategoryChange, categories }: any) => {

    // console.log("categories -----> ", categories)

    return (
        <Animated.View entering={FadeInDown.duration(600).springify()} style={{ marginVertical: hp(1) }} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} >
                {
                    categories.map((cat: any, index: any) => {

                        let isActive = cat.strCategory === activeCategory;

                        return (
                            <TouchableOpacity key={index} style={{ height: hp(10), justifyContent: "center", marginRight: hp(2), borderRadius: 50, alignItems: "center", }} onPress={() => handleCategoryChange(cat.strCategory)} >
                                <View>
                                    {/* <Image source={{ uri: cat.strCategoryThumb }} style={[{ height: hp(6), width: hp(6), borderRadius: 50, objectFit: "cover", }, isActive ? { borderWidth: 5, borderColor: "#e1ad01" } : null]} /> */}
                                    <CachedImage
                                        source={{ uri: cat.strCategoryThumb }}
                                        style={[{ height: hp(6), width: hp(6), borderRadius: 50, objectFit: "cover", }, isActive ? { borderWidth: 5, borderColor: "#e1ad01" } : null]}
                                    />
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