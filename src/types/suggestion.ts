import { ThunkDispatch } from "redux-thunk";

export interface SuggestionState {
    data: Suggestion[];
    loading: boolean;
    error: string;
};

export interface Suggestion {
    id: number;
    movie_name: string;
    like_count: number;
    dislike_count: number;
    suggestion_by: string;
    created_at: string;
}

export interface SuggestionForm {
    movie_name: string;
    like_count: number;
    dislike_count: number;
    suggestion_by: string;
}

interface GET_START {
    type: "GET_SUGGESTION_START";
}

interface GET_SUCCESS {
    type: "GET_SUGGESTION_SUCCESS";
    payload: Suggestion[];
}

interface GET_ERROR {
    type: "GET_SUGGESTION_ERROR";
}

interface ADD_START {
    type: "ADD_SUGGESTION_START";
}

interface ADD_SUCCESS {
    type: "ADD_SUGGESTION_SUCCESS";
    payload: Suggestion;
}

interface ADD_ERROR {
    type: "ADD_SUGGESTION_ERROR";
}

interface UPDATE_START {
    type: "UPDATE_SUGGESTION_START";
}

interface UPDATE_SUCCESS {
    type: "UPDATE_SUGGESTION_SUCCESS";
    payload: Suggestion;
}

interface UPDATE_ERROR {
    type: "UPDATE_SUGGESTION_ERROR";
}

interface DELETE_START {
    type: "DELETE_SUGGESTION_START";
}

interface DELETE_SUCCESS {
    type: "DELETE_SUGGESTION_SUCCESS";
    payload: number;
}

interface DELETE_ERROR {
    type: "DELETE_SUGGESTION_ERROR";
}

export type SuggestionAction = GET_START | GET_SUCCESS | GET_ERROR | ADD_START | ADD_SUCCESS | ADD_ERROR | UPDATE_START | UPDATE_SUCCESS | UPDATE_ERROR | DELETE_START | DELETE_SUCCESS | DELETE_ERROR;

export type SuggestionDispatch = ThunkDispatch<SuggestionState, void, SuggestionAction>;