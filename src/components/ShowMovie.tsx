import { Spinner } from "grommet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getSuggestion } from "../store/actions/suggestionAction";

export default function ShowMovie() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );

  useEffect(() => {
    dispatch<any>(getSuggestion());
  }, []);

  return loading ? (
    <Spinner />
  ) : (
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
  );
}
