import { onAuthStateChanged } from "firebase/auth";
import { Box, Button, Notification, Spinner, Text, TextInput } from "grommet";
import { Like, Dislike, Send } from "grommet-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { auth } from "../firebase-config";
import { AppState } from "../store";
import {
  addSuggestion,
  getSuggestion,
  updateSuggestion,
} from "../store/actions/suggestionAction";
import "../style/UserMain.css";
import { SuggestionForm } from "../types/suggestion";

const emptyForm: SuggestionForm = {
  movie_name: "",
  dislike_count: 0,
  like_count: 0,
  suggestion_by: "",
};

export default function UserMain() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );

  useEffect(() => {
    dispatch<any>(getSuggestion());
  }, []);

  const [form, setForm] = useState<SuggestionForm>(emptyForm);
  const [visible, setVisible] = useState("");
  const [darkMode, setDarkMode] = useOutletContext() as any;

  const submitForm = () => {
    try {
      setForm({ ...form });
      dispatch<any>(addSuggestion(form));
      setVisible("success");
      setForm(emptyForm);
    } catch {
      setVisible("error");
    }
  };

  return (
    <Box
      background={darkMode ? "black" : "light-2"}
      fill="vertical"
      overflow="auto"
      align="center"
      flex="grow"
      elevation="small"
      pad="xlarge"
      direction="column"
      border={{
        color: darkMode ? "accent-1" : "brand",
        size: "small",
        side: "all",
        style: "solid",
      }}
    >
      <Box
        width="xlarge"
        align="center"
        justify="center"
        direction="row"
        pad="small"
        gap="small"
        animation="slideDown"
      >
        <TextInput
          value={form.movie_name}
          placeholder="Please enter the movie name"
          plain={false}
          textAlign="center"
          onChange={(e) => {
            setForm({ ...form, movie_name: e.target.value });
          }}
        />
        <TextInput
          value={form.suggestion_by}
          placeholder="Please enter your name"
          plain={false}
          textAlign="center"
          onChange={(e) => {
            setForm({ ...form, suggestion_by: e.target.value });
          }}
        />
        <Button
          className="send-button"
          icon={<Send />}
          primary
          onClick={() => {
            submitForm();
          }}
        />
        {visible === "success" ? (
          <Notification
            toast
            status="normal"
            title="The movie was added successfully"
            onClose={() => {
              setVisible("");
            }}
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
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        data.map((item) => {
          return (
            <Box
              width="xlarge"
              align="center"
              justify="center"
              direction="row"
              pad="xsmall"
              gap="medium"
              overflow="auto"
              animation="slideUp"
              elevation="xsmall"
            >
              <Text weight="bold">{item.movie_name}</Text>
              <Text>{item.suggestion_by}</Text>
              <Text>{item.created_at}</Text>
              <Button
                className="like-button"
                icon={<Like />}
                primary
                badge={item.like_count}
                onClick={() => {
                  const result = {
                    movie_name: item.movie_name,
                    dislike_count: item.dislike_count,
                    like_count: item.like_count + 1,
                    suggestion_by: item.suggestion_by,
                  };
                  console.log(item);
                  dispatch<any>(updateSuggestion(result, item.id));
                }}
              />
              <Button
                className="dislike-button"
                icon={<Dislike />}
                primary
                badge={item.dislike_count}
                onClick={() => {
                  const result = {
                    movie_name: item.movie_name,
                    dislike_count: item.dislike_count + 1,
                    like_count: item.like_count,
                    suggestion_by: item.suggestion_by,
                  };
                  console.log(item);
                  dispatch<any>(updateSuggestion(result, item.id));
                }}
              />
            </Box>
          );
        })
      )}
    </Box>
  );
}
