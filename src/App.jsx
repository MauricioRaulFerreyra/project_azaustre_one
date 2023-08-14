import { Image } from "@chakra-ui/react";
import logo from "./assets/logo-spacex.png";
import { LaunchDetail } from "./components/LaunchDetail";
import { Routes, Route } from "react-router-dom";
import { LaunchesList } from "./components/LaunchesList";
import { RocketsDetail } from "./components/RocketsDetail";

function App() {

  return (
    <>
      <Image m={4} src={logo} alt="image" width={300} />
      <Routes>
        <Route path="/" element={<LaunchesList />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
        <Route path="/rockets/:id" element={<RocketsDetail />} />
      </Routes>
    </>
  );
}

export default App;
