import {
  Accordion,
  AccordionPanel,
  Button,
  FormField,
  Notification,
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
  const [form, setForm] = useState<SuggestionForm>(emptyForm);
  const [visible, setVisible] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );

  const updateClick = (id) => {
    try {
      dispatch<any>(updateSuggestion(form, id));
      setVisible("success");
      setForm(emptyForm);
    } catch (error) {
      setVisible("error");
    }
  };
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
                    defaultValue={form.movie_name}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, movie_name: e.target.value });
                    }}
                  />
                </FormField>
                <FormField label="Suggestion By">
                  <TextInput
                    defaultValue={form.suggestion_by}
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
                    defaultValue={form.like_count}
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
                    defaultValue={form.dislike_count}
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
                      updateClick(item.id);
                    }}
                  >
                    Save
                  </Button>
                </FormField>
                {visible === "success" ? (
                  <Notification
                    toast
                    status="normal"
                    title="Movie Updated"
                    message="The movie was updated successfully"
                    onClose={() => {
                      setVisible("");
                    }}
                  />
                ) : visible === "error" ? (
                  <Notification
                    status="critical"
                    toast
                    title="Error while updating the movie"
                    onClose={() => {
                      setVisible("");
                    }}
                  />
                ) : null}
              </AccordionPanel>
            </Accordion>
          </>
        );
      })}
    </>
  );
}
