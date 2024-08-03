import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from '@/constants';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import Loading from './loading';
import { getResponseSize } from '@/app/utils';
import CachedImage from './CachedImage';
import { useRouter } from 'expo-router';


const Recipes = ({ categories, meals }: any) => {

    const router = useRouter()

    return (
        <View style={styles.container} >
            <Text style={{ fontSize: hp(3), fontWeight: "600", marginVertical: 10 }} >Recipes</Text>
            <View>
                {
                    categories.length === 0 || meals?.length === 0 ? <Loading size="large" style={{ marginTop: getResponseSize(30) }} /> : <MasonryList
                        data={meals}
                        keyExtractor={(item): string => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => <RecipeCard item={item} index={i} router={router} />}
                        // refreshing={isLoadingNext}
                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                        onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                    />
                }

            </View>
        </View>
    )
}

const RecipeCard = ({ item, index, router }: any) => {

    let isEven = index % 2 == 0

    return (
        <Animated.View key={index} entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)} >
            <Pressable style={{ width: "100%", justifyContent: "center", marginBottom: 10, paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                onPress={() => router.push({
                    pathname: "(screens)/recipeDetailScreen",
                    params: item
                })}
            >
                {/* <Image source={{ uri: item.strMealThumb }} style={{ height: index % 3 == 0 ? hp(25) : hp(35), width: "100%", paddingHorizontal: 10, borderRadius: 35, marginVertical: 5 }} /> */}
                <CachedImage
                    source={{ uri: item.strMealThumb }}
                    style={{
                        height: index % 3 == 0 ? hp(25) : hp(35),
                        width: "100%",
                        paddingHorizontal: 10,
                        borderRadius: 35,
                        marginVertical: 5
                    }}
                />
                <Text style={{ fontSize: hp(1.5), fontWeight: "500", }} > {item.strMeal.length > 10 ? item.strMeal.slice(0.10) + "..." : item.strMeal} </Text>
            </Pressable>
        </Animated.View>
    )

}

export default Recipes

const styles = StyleSheet.create({
    container: {
        // marginVertical: hp(2),

    }
})