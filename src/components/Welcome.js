import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Welcome() {
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      Welcome {user}
      <Link to="/createGame">Create game</Link>
      <Link to={"/gamesList"}>Games List</Link>
    </div>
  );
}
