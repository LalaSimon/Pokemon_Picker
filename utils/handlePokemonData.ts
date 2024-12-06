import { Dispatch } from "react";
import { PokemonAction } from "@/types/ReducerTypes";
import { getPokemonData } from "@/utils/getPokemonData";
import { capitalizeString } from "@/utils/capitalizeString";
import { Animated } from "react-native";

export const handlePokemonData = async (
    dispatch: Dispatch<PokemonAction>,
    currentName: string,
    initialPosition: Animated.Value
): Promise<void> => {
    dispatch({ type: "FETCH_START" });

    try {
        const data = await getPokemonData();

        // rekurencja by pokemony się nie powtarzały
        if (data.name === currentName) {
            return handlePokemonData(dispatch, currentName, initialPosition);
        }

        // użycie funkcji do capitalizacji nazw z api
        const capitalizedName = capitalizeString(data.name);
        const types = data.types.map((t: { type: { name: string } }) =>
            capitalizeString(t.type.name)
        );
        const abilities = data.abilities.map(
            (i: { ability: { name: string } }) =>
                capitalizeString(i.ability.name)
        );

        dispatch({
            type: "FETCH_SUCCESS",
            payload: {
                name: capitalizedName,
                types,
                url: data.sprites.front_default,
                abilities,
            },
        });

        // Animacja wejścia karty
        Animated.timing(initialPosition, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    } catch (error) {
        dispatch({
            type: "FETCH_ERROR",
            payload: `Error occurred: ${error}`,
        });
    }
};
