import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

const CachedImage = ({ source, style, ...props }: any) => {
    const [cachedSource, setCachedSource] = useState(null);

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const uri = typeof source === 'string' ? source : source.uri;
                const cachedImageData = await AsyncStorage.getItem(uri);

                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data as string);
                    setCachedSource({ uri: base64Data as string });
                }
            } catch (error) {
                console.error("Error in caching image:", error);
                setCachedSource(source);
            }
        };

        getCachedImage();
    }, [source]);

    return <Animated.Image source={cachedSource || source} style={style} {...props} />;
};

export default CachedImage;

const styles = StyleSheet.create({

})