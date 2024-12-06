import React, { useEffect, useReducer, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import AnimatedButton from "@/components/Button";
import { initialState, pokemonReducer } from "@/utils/PokemonState";
import { handlePokemonData } from "@/utils/handlePokemonData";
import { PokemonCard } from "@/components/PokemonCard";

export default function PokemonPicker(): JSX.Element {
    const [state, dispatch] = useReducer(pokemonReducer, initialState);
    const { name, isLoading, swipedRight, swipedLeft } = state;

    const position = useRef(new Animated.ValueXY()).current; // Pozycja przesuwania karty
    const initialPosition = useRef(new Animated.Value(-600)).current; // Pozycja startowa dla wjazdu nowej karty

    useEffect(() => {
        handlePokemonData(dispatch, name, initialPosition);
    }, []);

    const replaceCardWithAnimation = (): void => {
        // animacja wymiany karty dla SKIP
        Animated.timing(position.y, {
            toValue: -600,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            position.setValue({ x: 0, y: 0 });
            initialPosition.setValue(-600);
            handlePokemonData(dispatch, name, initialPosition);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <PokemonCard
                    dispatch={dispatch}
                    position={position}
                    initialPosition={initialPosition}
                    state={state}
                />

                <View style={styles.buttonWrapper}>
                    <AnimatedButton
                        disabled={isLoading}
                        title="Skip"
                        cb={replaceCardWithAnimation}
                    />
                </View>

                <View style={styles.counterWrapper}>
                    <Text style={styles.counterText}>
                        Rejected: {swipedLeft}
                    </Text>
                    <Text style={styles.counterText}>
                        Caught: {swipedRight}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#232323",
        alignItems: "center",
        paddingTop: 30,
    },
    content: {
        display: "flex",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        marginTop: "auto",
        marginBottom: 30,
    },
    counterWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#3a3a3a",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    counterText: {
        color: "#e0e0e0",
        fontSize: 18,
        fontWeight: "bold",
    },
});
