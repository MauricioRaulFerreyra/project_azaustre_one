import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Flex, Spacer, Tag, Text, Button } from "@chakra-ui/react";
import { getLaunchByFlightNumber } from "../services/Render-as-You-Fetch";

const api = "https://api.spacexdata.com/v3/launches/";

export function LaunchDetail() {
  const [launch, setLaunch] = useState({});
  const launchId = useParams();
  const { id } = launchId

  useEffect(() => {
    getLaunchByFlightNumber(api, id).then(setLaunch).catch(console.log);
  }, [id]);

  return (
    <Box bg="gray.100" p={4} m={4} borderRadius="lg">
      {!launch ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Flex>
            <Text fontSize="2xl">
              Mission <strong>{launch.mission_name}</strong> (
              {launch.launch_year})
            </Text>
            <Spacer />
            <Tag p={2} colorScheme={launch.launch_success ? "green" : "red"}>
              {launch.launch_success ? "Success" : "Failure"}
            </Tag>
          </Flex>
          <Box>
            Rocket:{" "}
            <Link to={`/rockets/${launch.rocket?.rocket_id}`}>
              {launch.rocket?.rocket_name}
            </Link>
          </Box>
          <Link to='/' >
            <Button mt={2} colorScheme="purple">
              Back
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}




