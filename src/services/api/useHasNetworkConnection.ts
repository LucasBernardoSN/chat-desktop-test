import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, toggleUserInterfaceProp } from '../../reducers';
import useApi from './useApi';

export default function useHasNetworkConnection() {
  const dispatch = useDispatch();
  const { hasNetworkConnection } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const { handleServerPing } = useApi();

  async function checkConnectionWithServer(): Promise<boolean> {
    const { failed } = await handleServerPing();

    if (failed) {
      if (hasNetworkConnection === true) {
        dispatch(toggleUserInterfaceProp({ hasNetworkConnection: false }));

        let handleNoNetworkConnection = setInterval(async () => {
          const { failed } = await handleServerPing();
          if (failed) {
            // console.error('NOT INTERNET CONNECTION');
          } else {
            dispatch(
              toggleUserInterfaceProp({
                hasNetworkConnection: true,
              })
            );
            clearInterval(handleNoNetworkConnection);
          }
        }, 5000);
      }
      return false;
    } else {
      dispatch(toggleUserInterfaceProp({ hasNetworkConnection: true }));
      return true;
    }
  }

  return { checkConnectionWithServer };
}
