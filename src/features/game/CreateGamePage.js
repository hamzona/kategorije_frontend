import React, { useRef } from "react";
import { useCreateGameMutation } from "./gameApiSlice";

export default function CreateGamePage() {
  const [createGame] = useCreateGameMutation();

  const gameName = useRef("");
  const usersNumber = useRef(null);
  async function hendleSubmit(e) {
    e.preventDefault();
    try {
      // if (usersNumber.current.value < 2 || usersNumber.current.value > 6)
      //   return;
      const result = await createGame({
        name: gameName.current.value,
        usersNumber: usersNumber.current.value,
      });
      console.log(result);
      gameName.current.value = "";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Create game</h1>
      <form onSubmit={hendleSubmit}>
        <input type="text" ref={gameName} />
        <input type="number" ref={usersNumber} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
