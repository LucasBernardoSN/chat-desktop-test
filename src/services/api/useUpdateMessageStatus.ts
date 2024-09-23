import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  removeListMessagesToUpdateStatus,
  updateMessageCount,
  updateMessageStatus,
} from '../../reducers';
import { MessagesToUpdateStatus } from '../../types';
import { useSocket } from '../socket';
import useApi from './useApi';

export default function useUpdateMessageStatus() {
  const dispatch = useDispatch();
  const { handleUpdateStatusMessage } = useApi();
  const messageToUpdateStatusList = useSelector(
    (state: RootState) => state.MessagesToUpdate
  );

  const { sendActionNotification } = useSocket({});

  async function queueMessagesToUpdateStatus(queue: MessagesToUpdateStatus) {
    for (const messageToUpdateStatus of Object.values(queue)) {
      const {
        listOfReadMessages,
        listOfReceivedMessages,
        listOfDeleteMessages,
        receiverid,
      } = messageToUpdateStatus;

      let updateMessageStatusFailed = {
        receivedMessage: true,
        readMessages: true,
        deleteMessages: true,
      };

      // ? ========== Update message status ==========
      if (listOfReceivedMessages.length) {
        const { failed } = await handleUpdateStatusMessage(
          listOfReceivedMessages,
          receiverid,
          2
        );

        if (failed === false) {
          updateMessageStatusFailed.receivedMessage = false;

          sendActionNotification({
            typeAction: 'ReadMessages',
            actionData: {
              UpdateUserProfile: false,
              ReadMessages: [
                {
                  messagestoupdate: listOfReceivedMessages,
                  receiverid,
                  status: 2,
                },
              ],
            },
          });

          for (const receivedMessagesToUpdate of listOfReceivedMessages) {
            dispatch(
              updateMessageStatus({
                id: receivedMessagesToUpdate,
                messagereadstatus: 2,
                receiverid,
              })
            );
          }

          dispatch(
            removeListMessagesToUpdateStatus({
              receiverid,
              listOfReadMessages: [],
              listOfReceivedMessages,
              listOfDeleteMessages,
            })
          );
        }
      }

      // ? ========== Update message status ==========

      // # ========== Read message status ==========

      if (listOfReadMessages.length) {
        const { failed } = await handleUpdateStatusMessage(
          listOfReadMessages,
          receiverid,
          3
        );

        if (failed === false) {
          updateMessageStatusFailed.readMessages = false;

          sendActionNotification({
            typeAction: 'ReadMessages',
            actionData: {
              UpdateUserProfile: false,
              ReadMessages: [
                {
                  messagestoupdate: listOfReadMessages,
                  receiverid,
                  status: 3,
                },
              ],
            },
          });

          dispatch(
            updateMessageCount({
              receiverid,
              messagecount: -listOfReadMessages.length,
            })
          );

          for (const receivedMessagesToUpdate of listOfReadMessages) {
            dispatch(
              updateMessageStatus({
                id: receivedMessagesToUpdate,
                messagereadstatus: 3,
                receiverid,
              })
            );
          }

          dispatch(
            removeListMessagesToUpdateStatus({
              receiverid,
              listOfReadMessages,
              listOfReceivedMessages: [],
              listOfDeleteMessages,
            })
          );
        }
      }
      // # ========== Read message status ==========
      // //  ========== Delete message status ==========
      if (listOfDeleteMessages.length) {
        const { failed } = await handleUpdateStatusMessage(
          listOfDeleteMessages,
          receiverid,
          4
        );

        if (failed === false) {
          updateMessageStatusFailed.deleteMessages = false;

          sendActionNotification({
            typeAction: 'ReadMessages',
            actionData: {
              UpdateUserProfile: false,
              ReadMessages: [
                {
                  messagestoupdate: listOfDeleteMessages,
                  receiverid,
                  status: 4,
                },
              ],
            },
          });

          console.log('🎈🎈🎈🎈🎈🎈🎈');

          for (const receivedMessagesToUpdate of listOfDeleteMessages) {
            dispatch(
              updateMessageStatus({
                id: receivedMessagesToUpdate,
                messagereadstatus: 4,
                receiverid,
              })
            );
          }

          dispatch(
            removeListMessagesToUpdateStatus({
              receiverid,
              listOfReadMessages,
              listOfReceivedMessages,
              listOfDeleteMessages: [],
            })
          );
        }
      }
      // //  ========== Delete message status ==========
    }
  }

  useEffect(() => {
    const timeOutToSendUpdate = setTimeout(() => {
      queueMessagesToUpdateStatus(messageToUpdateStatusList);
    }, 1000);

    return () => {
      clearTimeout(timeOutToSendUpdate);
    };
  }, [messageToUpdateStatusList]);

  return {};
}
