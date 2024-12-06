import { PokemonAction, PokemonState } from "@/types/ReducerTypes";

export const initialState: PokemonState = {
    name: "",
    abilities: [],
    types: [],
    url: "",
    isLoading: false,
    swipedRight: 0,
    swipedLeft: 0,
    errorMessage: "",
};

export function pokemonReducer(
    state: PokemonState,
    action: PokemonAction
): PokemonState {
    switch (action.type) {
        case "SWIPED_RIGHT":
            return { ...state, swipedRight: state.swipedRight + 1 };
        case "SWIPED_LEFT":
            return { ...state, swipedLeft: state.swipedLeft + 1 };

        case "FETCH_START":
            return { ...state, isLoading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                name: action.payload.name,
                types: action.payload.types,
                url: action.payload.url,
                abilities: action.payload.abilities,
                isLoading: false,
            };
        case "FETCH_ERROR":
            return { ...state, isLoading: false, errorMessage: action.payload };
        default:
            return state;
    }
}
