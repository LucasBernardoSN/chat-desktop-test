import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, setMessageToBeFetchedDone } from '../../reducers';
import { updateMessageIndex } from '../../reducers/MessageList.reducer';
import { useFetchMessages } from './index';
import useApi from './useApi';

export type FileMessagesPostFailed = { file: FormData; receiverid: number };
export type TextMessagesPostFailed = {
  file: URLSearchParams;
  receiverid: number;
};

export default function useAsyncApiCall() {
  const dispatch = useDispatch();

  const { handleSendFile, handleSendMessage } = useApi();
  const { handleFetchMessages } = useFetchMessages();
  const [fileMessagesPostFailed, setFileMessagesPostFailed] = useState<
    FileMessagesPostFailed[]
  >([]);
  const [textMessagesPostFailed, setTextMessagesPostFailed] = useState<
    TextMessagesPostFailed[]
  >([]);
  const MessagesToBeFetchedList = useSelector(
    (state: RootState) => state.MessagesToBeFetched
  );

  const { hasNetworkConnection } = useSelector(
    (state: RootState) => state.UserInterface
  );

  useEffect(() => {
    async function handleAsyncFetchMessagesList() {
      if (hasNetworkConnection) {
        if (MessagesToBeFetchedList.length) {
          for (const asyncFetchedMessages of MessagesToBeFetchedList) {
            const { alreadyDone, messagecount, receiverid } =
              asyncFetchedMessages;

            if (!alreadyDone) {
              const failed = await handleFetchMessages(receiverid, 'onClick', {
                firstfetch: true,
                messagecount,
              });

              if (failed) {
                dispatch(
                  setMessageToBeFetchedDone({
                    receiverid,
                  })
                );
              }
            }
          }
        }
      }
    }

    async function handleAsyncPostMessages() {
      if (hasNetworkConnection) {
        if (textMessagesPostFailed.length) {
          for (const { file, receiverid } of textMessagesPostFailed) {
            await new Promise((sleep) => setTimeout(sleep, 1000));

            const { failed, data } = await handleSendMessage(file, receiverid);

            if (failed === false) {
              const newMesssageFilesSentFailed = textMessagesPostFailed.filter(
                (item) => {
                  return item.file !== file;
                }
              );

              setTextMessagesPostFailed(newMesssageFilesSentFailed);

              dispatch(
                updateMessageIndex({
                  id: file.get('id') as string,
                  index: data.index,
                  receiverid,
                })
              );
            }
          }
        }
      }
    }

    async function handleAsyncFailedPostFiles() {
      if (hasNetworkConnection) {
        if (fileMessagesPostFailed.length) {
          for (const { file, receiverid } of fileMessagesPostFailed) {
            await new Promise((sleep) => setTimeout(sleep, 1000));

            const { failed, data } = await handleSendFile(file, receiverid);

            if (failed === false) {
              const newMesssageFilesSentFailed = fileMessagesPostFailed.filter(
                (item) => {
                  return item.file !== file;
                }
              );

              setFileMessagesPostFailed(newMesssageFilesSentFailed);

              dispatch(
                updateMessageIndex({
                  id: file.get('id') as string,
                  index: data.index,
                  receiverid,
                })
              );
            }
          }
        }
      }
    }

    handleAsyncFailedPostFiles();
    handleAsyncFetchMessagesList();
    handleAsyncPostMessages();
  }, [hasNetworkConnection]);

  return { setFileMessagesPostFailed, setTextMessagesPostFailed };
}
