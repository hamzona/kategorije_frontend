import React from "react";
import { SpinnerCircular } from "spinners-react";

export default function Spiner() {
  return (
    <SpinnerCircular
      size={200}
      thickness={100}
      speed={150}
      color="#36ad47"
      secondaryColor="rgba(0, 0, 0, 0.44)"
    />
  );
}
