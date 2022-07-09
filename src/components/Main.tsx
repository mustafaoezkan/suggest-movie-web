import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getSuggestion } from "../store/actions/suggestionAction";

export default function Main() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.suggestion
  );

  useEffect(() => {
    dispatch<any>(getSuggestion());
    console.log(data);
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        padding: "20rem",
      }}
    >
      {data.map((item) => {
        const subYear = item.created_at.substring(0, 4);
        const subMonth = item.created_at.substring(5, 7);
        const subDay = item.created_at.substring(8, 10);
        const subHour = item.created_at.substring(11, 13);
        const subMinute = item.created_at.substring(14, 16);

        const subDate = `${subDay}-${subMonth}-${subYear} ${subHour}:${subMinute}`;

        return (
          <>
            <p>ID: {item.id}</p>
            <p>Movie Name: {item.movie_name}</p>
            <p>Like Count: {item.like_count}</p>
            <p>Dislike Count: {item.dislike_count}</p>
            <p>Suggestion By: {item.suggestion_by}</p>
            <p>Created At: {subDate}</p>
          </>
        );
      })}
    </div>
  );
}
