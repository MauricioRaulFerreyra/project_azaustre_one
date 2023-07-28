import * as API from "./services/launches";
import { Heading, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import logo from "./assets/logo-spacex.png";
import { LaunchItem } from "./components/LaunchItem";
function App() {
  const [launches, setLaunches] = useState([]);
  useEffect(() => {
    API.getAllLaunches()
      .then(setLaunches)
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Image m={4} src={logo} alt="image" width={300} />
      <Heading as="h1" size="lg" m={4}>
        SpaceX Launches
      </Heading>
      <ul>
        {launches.map((launch) => (
          <LaunchItem key={launch.mission_name} {...launch} />
        ))}
      </ul>
    </>
  );
}

export default App;
