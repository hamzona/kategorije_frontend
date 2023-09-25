import { Routes, Route, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Welcome from "./components/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import PresistLogin from "./components/PresistLogin";
import Singup from "./components/Singup";
import CreateGamePage from "./features/game/CreateGamePage";
import GameList from "./features/game/GameList";
import GameMain from "./features/game/GameMain";
// import { useSocketID } from "./context/SocketIDProvider";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useSocket } from "./context/SocketProvider";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "./features/auth/authSlice";
// import GamePlayPage from "./features/game/GamePlayPage";
//import Prefetch from "./components/Prefetch";

function App() {
  /* const location = useLocation();
  const { id } = useParams();
  const { setSocketID, socketID } = useSocketID();

  const user = useSelector(selectCurrentUser);
  const socket = useSocket();

  useEffect(() => {
    let a = location.pathname.slice(0, 6);
    if (a !== "/game/") {
      if (socket) {
        socket.emit("close-game", { socketID, user });
        localStorage.removeItem("timerSeconds");
      }
      setSocketID(null);
    }
  }, [id, location.pathname]);*/
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route element={<PresistLogin />}>
          {/* <Route element={<Prefetch />}> */}
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="/createGame" element={<CreateGamePage />} />
            <Route path="/gamesList" element={<GameList />} />

            <Route path="/game/:id" element={<GameMain />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
