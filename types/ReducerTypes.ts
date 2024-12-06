interface FetchStartAction {
    type: "FETCH_START";
}

interface FetchSuccessAction {
    type: "FETCH_SUCCESS";
    payload: {
        name: string;
        types: string[];
        url: string;
        abilities: string[];
    };
}

interface FetchErrorAction {
    type: "FETCH_ERROR";
    payload: string;
}

interface SwipeAction {
    type: "SWIPED_RIGHT" | "SWIPED_LEFT";
}

export type PokemonAction =
    | FetchStartAction
    | FetchSuccessAction
    | FetchErrorAction
    | SwipeAction;

export interface PokemonState {
    name: string;
    types: string[];
    abilities: string[];
    url: string;
    isLoading: boolean;
    swipedRight: number;
    swipedLeft: number;
    errorMessage: string;
}
