import React, { useEffect, useState } from "react";
import { useGetGamesMutation } from "./gameApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function GameList() {
  const [getGames] = useGetGamesMutation();

  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();
  useEffect(() => {
    async function a() {
      try {
        const result = await getGames({ creator: user });

        console.log(result);
        if (result?.data) {
          setGames(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    a();
  }, []);

  const [games, setGames] = useState([]);

  return (
    <div className="p-5">
      <h1 className="p-4">My games</h1>
      <div>
        {games.map((item) => {
          return (
            <ListGroup key={item._id} as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold"> {item.socketID}</div>
                  users: {item.usersNumber}
                </div>
                <Button
                  style={{ margin: "0px 5vw" }}
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
    </div>
  );
}
