import {
  Box,
  Button,
  Form,
  FormField,
  Spinner,
  Tab,
  Tabs,
  TextInput,
} from "grommet";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addSuggestion,
  getSuggestion,
} from "../store/actions/suggestionAction";
import { SuggestionForm } from "../types/suggestion";

const emptyForm: SuggestionForm = {
  movie_name: "",
  dislike_count: 0,
  like_count: 0,
  suggestion_by: "",
};

export default function Main() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );
  const [form, setForm] = useState<SuggestionForm>(emptyForm);

  const submitForm = () => {
    setForm({ ...form, like_count: 5, dislike_count: 2 });
    dispatch<any>(addSuggestion(form));
  };

  useEffect(() => {
    dispatch<any>(getSuggestion());
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        padding: "15rem",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Tabs>
            <Tab title="Show">
              <div>
                {data.map((item) => {
                  return (
                    <div>
                      <h1>Movie Name: {item.movie_name}</h1>
                      <h2>Suggestion By: {item.suggestion_by}</h2>
                      <h3>Like: {item.like_count}</h3>
                      <h3>Dislike: {item.dislike_count}</h3>
                    </div>
                  );
                })}
              </div>
            </Tab>
            <Tab title="Add">
              <Form>
                <FormField label="Movie Name" htmlFor="movieId">
                  <TextInput
                    id="movieId"
                    value={form.movie_name}
                    onChange={(e) => {
                      setForm({ ...form, movie_name: e.target.value });
                    }}
                    placeholder="Please enter a movie name..."
                  />
                </FormField>
                <FormField label="Suggestion By" htmlFor="suggestionById">
                  <TextInput
                    id="suggestionById"
                    value={form.suggestion_by}
                    onChange={(e) => {
                      setForm({ ...form, suggestion_by: e.target.value });
                    }}
                    placeholder="Please enter suggester who suggested this..."
                  />
                </FormField>
                <Box direction="row" gap="medium">
                  <Button
                    onClick={() => {
                      submitForm();
                    }}
                    type="submit"
                    label="Submit"
                  />
                </Box>
              </Form>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}
