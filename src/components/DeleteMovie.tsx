import { Button, Notification, Spinner } from "grommet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  deleteSuggestion,
  getSuggestion,
} from "../store/actions/suggestionAction";

export default function DeleteMovie() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState("");

  const deleteClick = (id) => {
    try {
      dispatch<any>(deleteSuggestion(id));
      setVisible("success");
    } catch (error) {
      setVisible("error");
    }
  };

  useEffect(() => {
    dispatch<any>(getSuggestion());
  }, [visible]);

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );
  return loading ? (
    <Spinner />
  ) : (
    <>
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
                deleteClick(item.id);
              }}
              primary
            >
              Sil
            </Button>
            {visible === "success" ? (
              <Notification
                toast
                status="info"
                title="The movie was deleted from the database successfully"
                onClose={() => {
                  setVisible("");
                }}
              />
            ) : visible === "error" ? (
              <Notification
                status="critical"
                toast
                title="Error while deleting the movie"
                onClose={() => {
                  setVisible("");
                }}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}
