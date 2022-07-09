import { combineReducers } from "redux";
import { SuggestionState } from "../types/suggestion";
import suggestionReducer from "./reducers/suggestionReducer";

export interface AppState {
    suggestion: SuggestionState;
}

const rootReducer = combineReducers<AppState>({
    suggestion: suggestionReducer,
});

export default rootReducer;