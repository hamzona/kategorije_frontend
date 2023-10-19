import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import PresistLogin from "./components/PresistLogin";
import SignUp from "./components/SignUp";
import CreateGamePage from "./features/game/CreateGamePage";
import Home from "././components/Home";
import GameMain from "./features/game/GameMain";
import GameList from "./features/game/GameList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PresistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/createGame" element={<CreateGamePage />} />
            <Route path="/game/:id" element={<GameMain />} />
            <Route path="/myGames" element={<GameList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
