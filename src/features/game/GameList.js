import React from "react";
import { useGetGamesQuery } from "./gameApiSlice";
import { useNavigate } from "react-router-dom";
import { Badge, Button, ListGroup } from "react-bootstrap";
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
            <ListGroup key={item._id} as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold"> {item.name}</div>
                  {item.socketID}
                </div>
                <Button
                  style={{ margin: "0px 20px" }}
                  onClick={() => {
                    navigate(`/game/${item.socketID}`);
                  }}
                >
                  JOIN
                </Button>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
    );

    {
      /* 

      <div>
        {data.map((item) => {
          return (
            <div key={item._id}>
              {item.name}
              <br />
              {item.socketID}
              <button
                onClick={() => {
                  navigate(`/game/${item.socketID}`);
                }}
              >
                Join
              </button>
            </div>
          );
        })}
      </div> */
    }
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="m-5">
      <h1 className="m-4">Game list</h1>
      {content}
    </div>
  );
}
