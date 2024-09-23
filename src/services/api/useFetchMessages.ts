import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  addMessages,
  includeMessagesToBeFetched,
  setMessageList,
  toggleUserInterfaceProp,
  updateHasMoreMessages,
} from '../../reducers';
import { FetchMessageProps } from '../../types/services.types';
import useApi from './useApi';
import useHasNetworkConnection from './useHasNetworkConnection';

export default function useFetchMessages() {
  const messageList = useSelector((state: RootState) => state.MessageList);
  const dispatch = useDispatch();
  const { handleFetchMessageList } = useApi();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const [loading, setLoading] = useState(false);

  async function handleFetchMessages<
    FetchTrigger extends
      | 'onScroll'
      | 'onClick'
      | 'onScrollAll'
      | 'searchMessage'
  >(
    receiverid: number,
    fetchTrigger: FetchTrigger,
    fetchMessageProps: FetchMessageProps[FetchTrigger]
  ) {
    let FetchMessageFailed = true;

    if (
      Object.hasOwn(messageList, receiverid) === false ||
      fetchTrigger === 'onScroll' ||
      fetchTrigger === 'onScrollAll' ||
      fetchTrigger === 'searchMessage'
    ) {
      setLoading(true);
      dispatch(toggleUserInterfaceProp({ currentChatLoading: true }));

      if (await checkConnectionWithServer()) {
        const { data, failed } = await handleFetchMessageList(
          receiverid,
          fetchMessageProps
        );

        if (failed === false) {
          if (fetchTrigger === 'onClick') {
            const { messagecount } =
              fetchMessageProps as FetchMessageProps['onClick'];

            dispatch(
              setMessageList({
                [receiverid]: {
                  messages: data.messages,
                  hasMessagesBelow: messagecount > 12,
                  hasMessagesAbove: true,
                },
              })
            );
          } else if (fetchTrigger === 'onScroll') {
            const { upwards } =
              fetchMessageProps as FetchMessageProps['onScroll'];

            if (data.messages.length) {
              dispatch(
                addMessages({
                  messages: upwards ? data.messages : data.messages.reverse(),
                  receiverid,
                  addBelow: !upwards,
                })
              );
            } else {
              dispatch(
                updateHasMoreMessages(
                  upwards
                    ? {
                        receiverid,
                        hasMessagesAbove: false,
                      }
                    : {
                        receiverid,
                        hasMessagesBelow: false,
                      }
                )
              );
            }
          } else if (fetchTrigger === 'searchMessage') {
            const { upwards } =
              fetchMessageProps as FetchMessageProps['searchMessage'];
            if (data.messages.length) {
              dispatch(
                addMessages({
                  messages: data.messages,
                  receiverid,
                  addBelow: upwards,
                })
              );
              dispatch(
                updateHasMoreMessages({
                  receiverid,
                  hasMessagesBelow: true,
                  hasMessagesAbove: true,
                })
              );
            }
          } else if (fetchTrigger === 'onScrollAll') {
            dispatch(
              setMessageList({
                [receiverid]: {
                  messages: data.messages,
                  hasMessagesBelow: false,
                  hasMessagesAbove: true,
                },
              })
            );
          }
          FetchMessageFailed = false;
        }
      } else {
        if (fetchTrigger === 'onClick') {
          const { messagecount } =
            fetchMessageProps as FetchMessageProps['onClick'];

          dispatch(
            includeMessagesToBeFetched({
              receiverid,
              alreadyDone: false,
              messagecount,
            })
          );
        }
      }

      dispatch(toggleUserInterfaceProp({ currentChatLoading: false }));
      setLoading(false);
    }

    return { FetchMessageFailed };
  }

  return { handleFetchMessages, loading };
}
