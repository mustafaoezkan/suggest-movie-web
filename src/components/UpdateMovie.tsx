import {
  Accordion,
  AccordionPanel,
  Button,
  FormField,
  TextInput,
} from "grommet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { updateSuggestion } from "../store/actions/suggestionAction";
import { SuggestionForm } from "../types/suggestion";

const emptyForm: SuggestionForm = {
  movie_name: "",
  dislike_count: 0,
  like_count: 0,
  suggestion_by: "",
};

export default function UpdateMovie() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );
  const [form, setForm] = useState<SuggestionForm>(emptyForm);
  return (
    <>
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
    </>
  );
}
