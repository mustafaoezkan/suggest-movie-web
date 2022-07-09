import { SuggestionAction, SuggestionState } from "../../types/suggestion";

const defaultState: SuggestionState = {
    data: [],
    loading: false,
    error: ""
}

const suggestionReducer = (state: SuggestionState = defaultState, action: SuggestionAction) => {
    switch (action.type) {
        case "GET_SUGGESTION_START":
            return {
                ...state,
                loading: true,
                error: ""
            }
        case "GET_SUGGESTION_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case "GET_SUGGESTION_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error while fetching suggestions"
            }
        case "ADD_SUGGESTION_START":
            return {
                ...state,
                loading: true,
                error: ""
            }
        case "ADD_SUGGESTION_SUCCESS":
            return {
                ...state,
                data: [...state.data, action.payload],
                loading: false
            }
        case "ADD_SUGGESTION_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error while adding suggestion"
            }
        case "UPDATE_SUGGESTION_START":
            return {
                ...state,
                loading: true,
                error: ""
            }
        case "UPDATE_SUGGESTION_SUCCESS":
            return {
                ...state,
                data: state.data.map(suggestion => suggestion.id === action.payload.id ? action.payload : suggestion),
                loading: false
            }
        case "UPDATE_SUGGESTION_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error while updating suggestion"
            }
        default:
            return state;
    }
};

export default suggestionReducer;