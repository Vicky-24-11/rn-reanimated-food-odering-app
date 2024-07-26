import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import ProfileIcon from '@/assets/icons/profileIcon';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '@/components/Categories';
import axios from 'axios';
import Recipes from '@/components/Recipes';

const homeScreen = () => {

    const [activeCategory, setActiveCategory] = useState("Beef")
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])

    useEffect(() => {
        getCategories()
        getRecipes()
    }, [])

    const getCategories = async () => {
        try {

            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')

            if (response && response.data) {

                setCategories(response.data.categories)

            } else {

                console.error("Unable to fetch data");


            }

        } catch (error) {
            console.log('error ---- ', error)
        }
    }

    const getRecipes = async (category = "Dessert") => {
        try {

            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)

            if (response && response.data) {

                setMeals(response.data.meals)

            } else {

                console.error("Unable to fetch data");


            }

        } catch (error) {
            console.log('error ---- ', error)
        }
    }

    //    const handleCategoryChange = category()


    return (
        <Layout isShowHeader={false} >
            {/* Header block */}
            <View style={styles.headerBlock} >
                <ProfileIcon style={{ height: hp(4) }} />
                <BellIcon color={Colors.grey} />
            </View>
            {/* Greeting Block */}
            <View>
                <Text style={{ fontSize: hp(1.7), marginVertical: hp(2) }} >Hello Vikas Pandey</Text>
                <View>
                    <Text style={{ fontSize: hp(3.8), fontWeight: "500" }} >Make your own food</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: hp(3.8), fontWeight: "500" }} >Stay at </Text>
                    <Text style={{ fontSize: hp(3.8), color: "#ffd700", fontWeight: "500" }} >home </Text>
                </View>
            </View>
            {/* Search Bar */}
            <View style={styles.searchInputBlock} >
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search any recipe'
                    placeholderTextColor={"gray"}

                />
                <View style={{ backgroundColor: Colors.white, padding: 5, borderRadius: 50 }}>
                    <MagnifyingGlassIcon strokeWidth={3} size={hp(2.5)} color="gray" />
                </View>
            </View>
            {categories.length > 0 && <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} />}

            <Recipes categories={categories} meals={meals} />
        </Layout>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    headerBlock: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    searchInputBlock: {
        width: "100%",
        backgroundColor: "#c5c6d0",
        borderRadius: hp(5),
        marginTop: hp(3),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: hp(1)
    },
    searchInput: {
        width: "100%",
        height: hp(5),
        fontSize: hp(1.7),
        flex: 1,
        padding: hp(0.5),
        paddingLeft: 10
    }
})