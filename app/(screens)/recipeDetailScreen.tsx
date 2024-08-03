import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CachedImage from '@/components/CachedImage'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getResponseSize } from '../utils'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import axios from 'axios'

const RecipeDetailScreen = () => {

    const item = useLocalSearchParams()
    const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()
    const [meals, setMeals] = useState([])

    useEffect(() => {
        getMealData(item.idMeal)
    }, [])


    const getMealData = async (id: any) => {
        try {

            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

            if (response && response.data) {

                setMeals(response.data.meals)

            } else {

                console.error("Unable to fetch data");

            }

        } catch (error) {
            console.log('error ---- ', error)
        }
    }

    console.log("item ------>", meals)

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: getResponseSize(30) }} >
            <CachedImage source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.headerContainer} >
                <TouchableOpacity style={styles.headerBtn}
                    onPress={router.back} >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={3.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBtn}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <HeartIcon size={hp(3.5)} strokeWidth={3.5} color={isFavorite ? "red" : "grey"} />
                </TouchableOpacity>
            </View>
            <Text>{item.strMeal}</Text>
        </ScrollView>
    )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: wp(98),
        height: hp(50),
        borderRadius: 53,
        resizeMode: 'cover',
        alignSelf: "center",
        marginTop: getResponseSize(5),
        borderBottomRightRadius: getResponseSize(35),
        borderBottomLeftRadius: getResponseSize(35)
    },
    headerContainer: {
        width: "90%",
        position: "absolute",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: getResponseSize(30),
        alignSelf: "center",
    },
    headerBtn: {
        backgroundColor: "white",
        borderRadius: 50,
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    }
})