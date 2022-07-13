import { Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { deleteSuggestion } from "../store/actions/suggestionAction";

export default function DeleteMovie() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );
  return (
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
                dispatch<any>(deleteSuggestion(item.id));
              }}
              primary
            >
              Sil
            </Button>
          </div>
        );
      })}
    </>
  );
}
