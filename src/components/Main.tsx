import {
  Box,
  Button,
  Form,
  FormField,
  Spinner,
  Tab,
  Tabs,
  TextInput,
  Accordion,
  AccordionPanel,
} from "grommet";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addSuggestion,
  deleteSuggestion,
  getSuggestion,
  updateSuggestion,
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1rem",
                          margin: "1rem",
                        }}
                      >
                        ID: {item.id}
                      </p>
                      <p
                        style={{
                          fontSize: "1rem",
                          margin: "1rem",
                        }}
                      >
                        Movie Name: {item.movie_name}
                      </p>
                      <p
                        style={{
                          fontSize: "1rem",
                          margin: "1rem",
                        }}
                      >
                        Suggestion By: {item.suggestion_by}
                      </p>
                      <p
                        style={{
                          fontSize: "1rem",
                          margin: "1rem",
                        }}
                      >
                        Like: {item.like_count}
                      </p>
                      <p
                        style={{
                          fontSize: "1rem",
                          margin: "1rem",
                        }}
                      >
                        Dislike: {item.dislike_count}
                      </p>
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
            <Tab title="Update">
              {data.map((item) => {
                return (
                  <>
                    <Accordion>
                      <AccordionPanel
                        onClick={() => {
                          setForm(item);
                        }}
                        label={item.movie_name}
                      >
                        <FormField label="Movie Name">
                          <TextInput
                            value={form.movie_name}
                            type="text"
                            onChange={(e) => {
                              setForm({ ...form, movie_name: e.target.value });
                            }}
                          />
                        </FormField>
                        <FormField label="Suggestion By">
                          <TextInput
                            value={form.suggestion_by}
                            type="text"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                suggestion_by: e.target.value,
                              });
                            }}
                          />
                        </FormField>
                        <FormField label="Like Count">
                          <TextInput
                            value={form.like_count}
                            type="number"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                like_count: parseInt(e.target.value),
                              });
                            }}
                          />
                        </FormField>
                        <FormField label="Dislike Count">
                          <TextInput
                            value={form.dislike_count}
                            type="number"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                dislike_count: parseInt(e.target.value),
                              });
                            }}
                          />
                        </FormField>
                        <FormField>
                          <Button
                            style={{
                              border: "none",
                              padding: "0.5rem",
                              borderRadius: "0.5rem",
                              fontSize: "1rem",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                            primary
                            onClick={() => {
                              dispatch<any>(updateSuggestion(form, item.id));
                            }}
                          >
                            Save
                          </Button>
                        </FormField>
                      </AccordionPanel>
                    </Accordion>
                  </>
                );
              })}
            </Tab>
            <Tab title="Delete">
              {data.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        margin: "0",
                      }}
                    >
                      ID: {item.id}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        margin: "0",
                      }}
                    >
                      Movie Name: {item.movie_name}
                    </p>
                    <Button
                      style={{
                        border: "none",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onClick={() => {
                        dispatch<any>(deleteSuggestion(item.id));
                      }}
                      primary
                    >
                      Sil
                    </Button>
                  </div>
                );
              })}
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}
