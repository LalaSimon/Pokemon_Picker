import { handlePokemonData } from "@/utils/handlePokemonData";
import {
    Text,
    View,
    Image,
    ImageBackground,
    Animated,
    StyleSheet,
    PanResponder,
} from "react-native";

interface PokemonCardProps {
    position: Animated.ValueXY;
    initialPosition: Animated.Value;
    state: {
        name: string;
        types: string[];
        url: string;
        abilities: string[];
        errorMessage: string;
        isLoading: boolean;
    };
    dispatch: React.Dispatch<any>;
}

export const PokemonCard = ({
    position,
    initialPosition,
    state,
    dispatch,
}: PokemonCardProps) => {
    const { name, types, url, abilities, errorMessage, isLoading } = state;

    const swipeOut = (direction: "left" | "right"): void => {
        //funkcja wywoływana przy responderze która wpływa na pozycję karty
        Animated.timing(position, {
            toValue: {
                x: direction === "right" ? 500 : -500,
                y: 0,
            },
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            position.setValue({ x: 0, y: 0 });
            initialPosition.setValue(-600);
            handlePokemonData(dispatch, name, initialPosition);

            if (direction === "right") {
                dispatch({ type: "SWIPED_RIGHT" });
            } else {
                dispatch({ type: "SWIPED_LEFT" });
            }
        });
    };

    // rotacja kartą w osi x
    const rotate = position.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ["-15deg", "0deg", "15deg"],
    });

    // zarządzanie stanem styli dla karty w momencie ruchu
    const cardStyle = {
        transform: [
            { translateX: position.x },
            { translateY: Animated.add(position.y, initialPosition) },
            { rotate },
        ],
        opacity: position.x.interpolate({
            inputRange: [-300, 0, 300],
            outputRange: [0.2, 1, 0.2],
        }),
    };

    //responder do obsługi gestów
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (_, gestureState) => {
            const breakPoint = 150;

            if (gestureState.dx > breakPoint) {
                swipeOut("right");
            } else if (gestureState.dx < -breakPoint) {
                swipeOut("left");
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.pokemonCard, cardStyle]}
        >
            <ImageBackground
                source={require("@/assets/images/pokemonBackground.png")}
                style={styles.imageBackground}
            >
                <Image source={{ uri: url }} style={styles.pokemonPhoto} />
            </ImageBackground>
            <Text style={styles.pokemonName}>{name}</Text>
            <View style={styles.divider} />

            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : (
                <>
                    {abilities.length > 0 && (
                        <View style={styles.abilityWrapper}>
                            {abilities.map((ability) => (
                                <Text style={styles.abilityText} key={ability}>
                                    {ability}
                                </Text>
                            ))}
                        </View>
                    )}
                    <View style={styles.divider} />
                    {types.length > 0 && (
                        <View style={styles.pokemonTypesWrapper}>
                            {types.map((type: string) => (
                                <Text style={styles.pokemonTypes} key={type}>
                                    {type}
                                </Text>
                            ))}
                        </View>
                    )}
                </>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    pokemonName: {
        fontSize: 35,
        fontWeight: "600",
        color: "#fff",
        marginRight: "auto",
        marginTop: 3,
        marginLeft: 5,
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    divider: {
        height: 1,
        backgroundColor: "#FFF",
        width: "100%",
        marginVertical: 10,
        opacity: 0.7,
    },
    pokemonTypesWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginRight: "auto",
        marginTop: 5,
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    pokemonTypes: {
        borderStyle: "solid",
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "black",
        color: "white",
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 20,
        fontSize: 14,
        fontWeight: "600",
    },
    pokemonCard: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: "auto",
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#FFF",
        width: 350,
        height: 500,
        borderRadius: 25,
        backgroundColor: "black",
    },

    abilityWrapper: {
        display: "flex",
        marginRight: "auto",
        marginVertical: 3,
        marginLeft: 5,
        gap: 4,
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    abilityText: {
        fontSize: 18,
        color: "white",
        fontWeight: 600,
    },
    errorMessage: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
        color: "white",
    },
    imageBackground: {
        borderRadius: 20,
        overflow: "hidden",
    },
    pokemonPhoto: {
        width: 300,
        height: 250,
        resizeMode: "contain",
    },
});
