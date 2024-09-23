import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowFocus from 'use-window-focus';
import { useIntersectionObserver } from 'usehooks-ts';

import {
  RootState,
  clearMessageList,
  toggleUserInterfaceProp,
  updateMessageCount,
} from '../../reducers';
import {
  useApi,
  useFetchMessages,
  useHasNetworkConnection,
} from '../../services/api';
import { useSocket } from '../../services/socket';
import { Loading } from '../../styles/Loading';
import { MessageElement } from '../../types';
import Message from '../Message';
import RetractableRightSideBar from '../RetractableRightSideBar';
import RoundButton from '../RoundButton';
import { SendFileModal } from '../SendFileModal';
import { CurrentChatFooter } from './CurrentChatFooter/CurrentChatFooter.index';
import CurrentChatHeader from './CurrentChatHeader/CurrentChatHeader.index';
import * as S from './styles';

export default function CurrentChat() {
  const dispatch = useDispatch();

  const messageList = useSelector((state: RootState) => state.MessageList);
  const chatList = useSelector((state: RootState) => state.ChatList);
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { currentChatLoading, showSearchMessageModal } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const [currentMessageList, setCurrentMessageList] = useState<
    Array<MessageElement>
  >([]);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const { handleFetchMessages } = useFetchMessages();
  const { handleUpdateStatusOfAllMessages } = useApi();
  const auxScrollControlRef = useRef<HTMLDivElement | null>(null);

  const auxScrollControlRefEntry = useIntersectionObserver(
    auxScrollControlRef,
    {}
  );
  const auxScrollControlIsVisible = !!auxScrollControlRefEntry?.isIntersecting;

  const [messageCount, setMessageCount] = useState(0);
  const { sendGetUserStatus } = useSocket({});

  const isFocused = useWindowFocus();

  useEffect(() => {
    if (currentChatId && isFocused) {
      sendGetUserStatus(currentChatId);
      var getUserStatus = setInterval(() => {
        sendGetUserStatus(currentChatId);
      }, 5000);
    }
    return () => {
      clearInterval(getUserStatus);
    };
  }, [currentChatId, isFocused]);

  useEffect(() => {
    if (currentChatId) {
      if (Object.hasOwn(messageList, currentChatId)) {
        const newMessageList = messageList[currentChatId].messages;
        setCurrentMessageList(newMessageList);
      }

      if (Object.hasOwn(chatList, currentChatId)) {
        setMessageCount(chatList[currentChatId].messagecount);
      }
    }

    return () => {
      setCurrentMessageList([]);
    };
  }, [messageList[currentChatId!]]);

  function handleIsLastMessage(index: number, length: number) {
    return { below: index === 0, above: index === length - 1 };
  }

  async function handleScrollToBottom() {
    if (
      currentChatId &&
      auxScrollControlRef.current &&
      Object.hasOwn(messageList, currentChatId)
    ) {
      const { hasMessagesBelow } = messageList[currentChatId];

      if (hasMessagesBelow) {
        if (await checkConnectionWithServer()) {
          dispatch(clearMessageList({ receiverid: currentChatId }));

          const { failed } = await handleUpdateStatusOfAllMessages(
            currentChatId
          );

          if (failed) {
            window.location.reload();
          } else {
            dispatch(
              updateMessageCount({
                messagecount: -1,
                receiverid: currentChatId,
              })
            );
            const { FetchMessageFailed } = await handleFetchMessages(
              currentChatId,
              'onScrollAll',
              {
                firstfetch: true,
                messagecount: 0,
              }
            );

            FetchMessageFailed && window.location.reload();
          }
        }
      } else {
        auxScrollControlRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  const [pastedFiles, setPastedFiles] = useState<File[]>([]);

  function handlePasteInput(e: React.ClipboardEvent<HTMLDivElement>) {
    const files = e.clipboardData.files;
    const pastedFilesList: File[] = [];

    if (files) {
      for (let index = 0; index < files.length; index++) {
        pastedFilesList.push(files[index]);
      }
    }

    if (e.clipboardData.files.length) {
      setPastedFiles(pastedFilesList);
    }
  }

  function handleClick() {
    if (window.innerWidth <= 512) {
      dispatch(toggleUserInterfaceProp({ showSearchMessageModal: false }));
    }
  }

  return (
    <div style={{ display: 'flex' }} onClick={handleClick}>
      <S.CurrentChatContainer
        id="chat"
        onPaste={(e) => handlePasteInput(e)}
        currentTheme={isDarkTheme ? 'dark' : 'light'}
        onDragEnter={(e) => {
          if (e.nativeEvent?.dataTransfer?.items[0].kind === 'file') {
            dispatch(toggleUserInterfaceProp({ showSendFilesModal: true }));
          }
        }}
      >
        <SendFileModal
          setPastedFiles={setPastedFiles}
          pastedFiles={pastedFiles}
        />

        <CurrentChatHeader />

        <S.ChatContent id="chat-content" ref={chatContentRef}>
          <S.MessageContainer>
            {currentMessageList.map((message, index) => {
              return (
                <React.Fragment key={message.id}>
                  <Message
                    receiverid={currentChatId as number}
                    isLastMessage={handleIsLastMessage(
                      index,
                      currentMessageList.length
                    )}
                    previousMessageDate={
                      currentMessageList[index + 1]?.datemessage
                    }
                    previousMessageStatus={
                      currentMessageList[index + 1]?.messagereadstatus
                    }
                    auxScrollControlIsVisible={auxScrollControlIsVisible}
                    {...message}
                  />
                </React.Fragment>
              );
            })}
          </S.MessageContainer>

          {!auxScrollControlIsVisible && (
            <div
              style={{
                bottom: '150px',
                right: '20px',
                position: 'absolute',
              }}
            >
              {messageCount > 0 && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    transform: 'translateX(30px) translateY(-5px)',
                    border: 'none',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 10 }}>{messageCount}</span>
                </div>
              )}

              <RoundButton color="grass" onClick={handleScrollToBottom}>
                <ChevronDownIcon />
              </RoundButton>
            </div>
          )}

          {!false ||
            (!false && (
              <S.NetworkErrorContainer>
                <Loading />
                <ExclamationTriangleIcon />
              </S.NetworkErrorContainer>
            ))}

          <div ref={auxScrollControlRef} />
        </S.ChatContent>

        <CurrentChatFooter />
      </S.CurrentChatContainer>
      {showSearchMessageModal && (
        <RetractableRightSideBar headerName="Pesquisar Mensagem" />
      )}
    </div>
  );
}
