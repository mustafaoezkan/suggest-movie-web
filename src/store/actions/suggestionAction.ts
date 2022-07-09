import { Suggestion, SuggestionForm, SuggestionDispatch } from "../../types/suggestion";
import api from "../../utils/api";

export const getSuggestion = () => async (dispatch: SuggestionDispatch) => {
    dispatch({ type: "GET_SUGGESTION_START" });
    try {
        const response = await api().get<Suggestion[]>("/suggestions");
        dispatch({
            type: "GET_SUGGESTION_SUCCESS", payload: response.data
        })
    } catch {
        dispatch({ type: "GET_SUGGESTION_ERROR" });
    }
}

export const addSuggestion = (form: SuggestionForm) => async (dispatch: SuggestionDispatch) => { 
    dispatch({ type: "ADD_SUGGESTION_START" });
    try {
        const response = await api().post<Suggestion>("/suggestions/", form);
        dispatch({
            type: "ADD_SUGGESTION_SUCCESS", payload: response.data
        })
    } catch {
        dispatch({ type: "ADD_SUGGESTION_ERROR" });
    }
}

export const updateSuggestion = (form: Partial<SuggestionForm>, suggestionId: number) => async (dispatch: SuggestionDispatch) => {
    dispatch({ type: "UPDATE_SUGGESTION_START" });
    try {
        const response = await api().put<Suggestion>(`/suggestions/${suggestionId}`, form);
        dispatch({
            type: "UPDATE_SUGGESTION_SUCCESS", payload: response.data
        })
    } catch {
        dispatch({ type: "UPDATE_SUGGESTION_ERROR" });
    }
}

export const deleteSuggestion = (suggestionId: number) => async (dispatch: SuggestionDispatch) => {
    dispatch({ type: "DELETE_SUGGESTION_START" });
    try {
        await api().delete(`/suggestions/${suggestionId}`);
        dispatch({
            type: "DELETE_SUGGESTION_SUCCESS", payload: suggestionId
        })
    } catch {
        dispatch({ type: "DELETE_SUGGESTION_ERROR" });
    }
}