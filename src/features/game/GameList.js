import React from "react";
import { useGetGamesQuery } from "./gameApiSlice";
import { useNavigate } from "react-router-dom";
//import { useSocketID } from "../../context/SocketIDProvider";

export default function GameList() {
  const { data, isLoading, isError, isSuccess, error } = useGetGamesQuery();

  // const { socketID } = useSocketID();
  // console.log(socketID);
  const navigate = useNavigate();

  let content;
  if (isSuccess) {
    content = (
      <div>
        {data.map((item) => {
          return (
            <div key={item._id}>
              {item.name}
              <br />
              {item.socketID}
              <button
                onClick={() => {
                  //setSocketID(item.socketID);
                  navigate(`/game/${item.socketID}`);
                }}
              >
                Join
              </button>
            </div>
          );
        })}
      </div>
    );
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div>
      <h1>Game list</h1>
      {content}
    </div>
  );
}
