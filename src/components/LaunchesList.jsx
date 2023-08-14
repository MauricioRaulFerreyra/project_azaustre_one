import { Heading } from '@chakra-ui/react'
import { fetchData } from '../services/Render-as-You-Fetch'
import { LaunchItem } from './LaunchItem';
import { Suspense } from 'react';

const api_data = fetchData("https://api.spacexdata.com/v3");

export const LaunchesList = () => {

  const data = api_data.read()

  return (
    <>
      <Heading as="h1" size="lg" m={4}>
        SpaceX Launches
      </Heading>
      <Suspense fallback={<h2>LOADING . . .</h2>}>
        <ul>
          {
            data?.map((launch) => (
              <li key={launch.mission_name}>
                <LaunchItem  {...launch} />
              </li>
            ))
          }
        </ul >
      </Suspense>
    </>
  )
};

