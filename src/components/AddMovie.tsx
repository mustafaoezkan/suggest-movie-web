import { Box, Button, Form, FormField, Notification, TextInput } from "grommet";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSuggestion } from "../store/actions/suggestionAction";
import { SuggestionForm } from "../types/suggestion";

const emptyForm: SuggestionForm = {
  movie_name: "",
  dislike_count: 0,
  like_count: 0,
  suggestion_by: "",
};

export default function AddMovie() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<SuggestionForm>(emptyForm);
  const [visible, setVisible] = useState("");

  const submitForm = () => {
    try {
      setForm({ ...form, like_count: 5, dislike_count: 2 });
      dispatch<any>(addSuggestion(form));
      setVisible("success");
      setForm(emptyForm);
    } catch (error) {
      setVisible("error");
    }
  };
  return (
    <>
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
        {visible === "success" ? (
          <Notification
            toast
            status="normal"
            title="The movie was added to the database successfully"
            message="Thanks for your contribution, you can see your response on the show tab."
            onClose={() => setVisible("")}
          />
        ) : visible === "error" ? (
          <Notification
            status="critical"
            toast
            title="Error while adding the movie"
            onClose={() => {
              setVisible("");
            }}
          />
        ) : null}
      </Form>
    </>
  );
}
