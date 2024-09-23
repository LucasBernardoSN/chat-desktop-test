import { } from '../../../hooks';

import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowFocus from 'use-window-focus';
import { useIntersectionObserver, useIsMounted, useUpdateEffect } from 'usehooks-ts';

import { updateHasMoreMessages } from '../../../reducers/MessageList.reducer';
import {
  addMessageToUpdateStatus,
  createListMessagesToUpdateStatus,
} from '../../../reducers/MessagesToUpdateStatus.reducer';
import { RootState } from '../../../reducers/store';
import { useFetchMessages } from '../../../services/api';
import { Loading } from '../../../styles/Loading';
import { MessageElement } from '../../../types/reducers.types';
import { MessageStatus } from '../../../utils/constants/MessageStatus';
import * as S from './MessageVisualizeController.styles';

interface MessageVisualizeControllerProps extends MessageElement {
  isLastMessage: {
    above: boolean;
    below: boolean;
  };
  auxScrollControlIsVisible: boolean;
  previousMessageStatus: MessageStatus | undefined;
  children: JSX.Element;
  currentReceiverId: number;
}
function MessageVisualizeController({
  author,
  messagereadstatus,
  id,
  currentReceiverId,
  isLastMessage,
  index,
  body,
  children,
  auxScrollControlIsVisible
}: MessageVisualizeControllerProps) {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { userid } = useSelector((state: RootState) => state.User);
  const { searchMessageIndex } = useSelector((state: RootState) => state.CurrentChat);
  const messageList = useSelector((state: RootState) => state.MessageList);
  const windowFocused = useWindowFocus();
  const isMounted = useIsMounted()

  const messageRefEntry = useIntersectionObserver(messageRef, {
    freezeOnceVisible: true,
    rootMargin: '-100px'
  });
  const isVisible = !!messageRefEntry?.isIntersecting;

  const { handleFetchMessages, loading } = useFetchMessages();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  function dispatchUpdateMessageStatus() {
    dispatch(createListMessagesToUpdateStatus({ receiverid: author }));
    dispatch(
      addMessageToUpdateStatus({
        id,
        receiverid: author,
        status: 3,
      })
    );
  }

  useEffect(() => {
    if (
      author !== userid && windowFocused && isVisible && messagereadstatus < 3 && isMounted()
    ) {
      dispatchUpdateMessageStatus();
    }
  }, [windowFocused, isMounted]);

  useEffect(() => {
    function handleUpdateMessageStatus() {
      if (author !== userid && messagereadstatus < 3) {
        dispatchUpdateMessageStatus();
      }
    }

    async function handleMessageVisualise() {
      if (Object.hasOwn(messageList, currentReceiverId)) {
        handleUpdateMessageStatus();

        const { hasMessagesAbove, hasMessagesBelow, messages } =
          messageList[currentReceiverId];

        if (index && (messages.length > 19 || (hasMessagesBelow && hasMessagesAbove))) {
          if (
            (isLastMessage.below && hasMessagesBelow) ||
            (isLastMessage.above && hasMessagesAbove)
          ) {
            let previousScrollHeightMinusScrollTop: number = 0;

            const chatContent =
              window.document.getElementById('chat-content');

            if (chatContent && isMounted()) {
              previousScrollHeightMinusScrollTop =
                chatContent.scrollHeight -
                chatContent.scrollTop;

              const { FetchMessageFailed } =
                await handleFetchMessages(
                  currentReceiverId,
                  'onScroll',
                  {
                    indexmessage: index,
                    upwards: isLastMessage.above,
                  }
                );

              if (
                isLastMessage.above &&
                FetchMessageFailed === false
              ) {
                chatContent.scrollTop =
                  chatContent.scrollHeight -
                  previousScrollHeightMinusScrollTop;
              }
            }
          }
        }
      }
    }

    if (messageList && messageRef.current && isVisible && isMounted()) {
      handleMessageVisualise();
    }
  }, [isVisible, isMounted]);


  useUpdateEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        isMounted() && setHasNewMessage(false);
      }, 500);

    }
  }, [isVisible, isMounted])

  useLayoutEffect(() => {
    const chatContent = window.document.getElementById('chat-content');
    const messageNotRead = window.document.getElementById('message-not-read');
    if (
      chatContent &&
      messageRef.current &&
      Object.hasOwn(messageList, currentReceiverId)
    ) {

      const currentMessageList = messageList[currentReceiverId].messages;
      const isUserMessage = author === userid;
      const messageRead = messagereadstatus === 3;
      const isLastMessageBelowNoMoreFetch =
        isLastMessage.below &&
        messageList[currentReceiverId].hasMessagesBelow === false;


      if (isUserMessage && isLastMessageBelowNoMoreFetch) {
        chatContent.scrollTop =
          chatContent.scrollHeight - chatContent.offsetHeight;

      } else if (messageRead && isLastMessageBelowNoMoreFetch) {
        chatContent.scrollTop =
          chatContent.scrollHeight - chatContent.offsetHeight;
      }

      else if (
        windowFocused &&
        isLastMessageBelowNoMoreFetch &&
        auxScrollControlIsVisible
      ) {
        chatContent.scrollTop =
          chatContent.scrollHeight - chatContent.offsetHeight;
      }
      else if (messageRead === false) {
        const messageIndex = currentMessageList.findIndex(
          (item) => item.id === id
        );

        const newCurrentMessageList = currentMessageList.filter(message => message.author !== userid)

        if (messageIndex > -1 && newCurrentMessageList.length) {


          let isFirstUnreadMessage = true;

          for (
            let i = messageIndex + 1;
            i < newCurrentMessageList.length;
            i++
          ) {

            // console.log(newCurrentMessageList[i].messagereadstatus)

            const isAnUnreadMessage =
              newCurrentMessageList[i].messagereadstatus === 1 ||
              newCurrentMessageList[i].messagereadstatus === 2;

            if (isAnUnreadMessage) {
              isFirstUnreadMessage = false;
              return;
            }
          }
          for (let i = 0; i < messageIndex; i++) {
            const isAReadMessage =
              newCurrentMessageList[i].messagereadstatus === 3 ||
              newCurrentMessageList[i].author === userid;

            if (isAReadMessage) {
              isFirstUnreadMessage = false;
              return;
            }
          }

          if (isFirstUnreadMessage && windowFocused === false && !messageNotRead) {
            setHasNewMessage(true);
          }
        }
      }
    }
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const chatContent = window.document.getElementById('chat-content');
      if (chatContent) {
        chatContent.scrollTo({ top: chatContent.scrollTop + 75 });
      }
    }
  }, [hasNewMessage]);

  useEffect(() => {
    const chatContent = window.document.getElementById('chat-content');

    if (searchMessageIndex === index && chatContent && messageRef.current) {
      chatContent.scrollTo({ top: messageRef.current.offsetTop - chatContent.offsetHeight / 2 });
    }
  }, [searchMessageIndex]);

  return (


    <div style={{ marginTop: 5 }}>
      {hasNewMessage && (
        <S.NewMessagesWarningArea ref={ref} id={'message-not-read'} style={{ marginBottom: 20, marginTop: 20 }}>
          <S.NewMessagesWarningText>
            Mensagens não lidas!
          </S.NewMessagesWarningText>
        </S.NewMessagesWarningArea>
      )}

      <S.MessageVisualizeControllerContainer ref={messageRef}>
        {loading && isLastMessage.above && (
          <S.LoadingContainer   >
            <Loading speed={'s0'} />
          </S.LoadingContainer>
        )}
        {children}
        {loading && isLastMessage.below && (
          <S.LoadingContainer >
            <Loading speed={'s0'} />
          </S.LoadingContainer>
        )}

      </S.MessageVisualizeControllerContainer>

    </div >
  );
}

export default memo(MessageVisualizeController);
