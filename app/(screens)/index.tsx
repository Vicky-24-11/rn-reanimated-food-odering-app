import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '@/components/layout'
import { getResponseSize } from '../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Recipes from '@/components/Recipes';


const welcomeScreen = () => {

    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    const router = useRouter()

    useEffect(() => {
        ring1padding.value = 0,
            ring2padding.value = 0
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100)
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300)

        setTimeout(() => router.push("(screens)/homeScreen"), 2500)

    }, [])


    return (
        <Layout safeAreaBgColor="#F7d560">
            <View style={styles.container} >
                <Animated.View style={[styles.imageContainer1, { padding: ring1padding }]} >
                    <Animated.View style={[styles.imageContainer2, { padding: ring2padding }]} >
                        <Image source={require("@/assets/images/welcomeImage.png")} style={styles.image} />
                    </Animated.View>
                </Animated.View>

                <View style={{ alignItems: "center", paddingTop: hp(2) }}>
                    <Text style={styles.title} >yummy</Text>
                    <Text style={{ fontSize: hp(2) }}>Food is always right</Text>
                </View>
            </View>
        </Layout>
    )
}

export default welcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer1: {
        backgroundColor: "#E1AD01",
        padding: hp(5)
    },
    imageContainer2: {
        backgroundColor: "#F4c430",
        padding: hp(5)
    },
    image: {
        width: hp(20),
        height: hp(20),
    },
    title: {
        fontSize: hp(7),
        fontWeight: "500",
        color: Colors.white
    }

})