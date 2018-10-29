import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from '../containers/launches';

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const MyTrips = () => (
  <Query query={GET_MY_TRIPS} fetchPolicy="network-only">
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR: {error.message}</p>;

      return (
        <div style={{ width: '100%' }}>
          <h3>Email</h3>
          <p>{data.me.email}</p>
          <h3>Trips</h3>
          {data.me.trips.length ? (
            data.me.trips.map(launch => (
              <LaunchTile key={launch.id} launch={launch} />
            ))
          ) : (
            <p>You haven't booked any trips</p>
          )}
        </div>
      );
    }}
  </Query>
);

export default MyTrips;