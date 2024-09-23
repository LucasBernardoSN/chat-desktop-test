import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  toggleUserInterfaceProp,
  updateSearchMessage,
} from '../../../reducers';
import { ChatElement } from '../../../types';
import { formatDate } from '../../../utils';
import ProfileImage from '../../ProfileImage';
import RoundButton from '../../RoundButton';
import * as S from './CurrentChatHeader.styles';

export default function CurrentChatHeader() {
  const chatList = useSelector((state: RootState) => state.ChatList);
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const { showChatList, showSearchMessageModal } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState<ChatElement | null>(null);

  useEffect(() => {
    if (currentChatId) {
      if (Object.hasOwn(chatList, currentChatId)) {
        const newCurrentChat = chatList[currentChatId];
        setCurrentChat(newCurrentChat);
      }
    }

    return () => {
      setCurrentChat(null);
    };
  }, [currentChatId, chatList[currentChatId!]]);

  if (currentChat) {
    return (
      <S.CurrentChatHeader style={{ justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginLeft: showChatList === true ? 0 : 50,
            }}
          >
            <ProfileImage
              name={currentChat.name}
              profileImageUrl={currentChat.imageProfileUrl}
            />
          </div>

          <S.HeaderTextArea>
            <S.ChatName>{currentChat!.name}</S.ChatName>
            <S.ChatStatus>
              {currentChat.isWriting === true ? (
                <S.IsWriting>Digitando...</S.IsWriting>
              ) : currentChat.isOnline === 'Online' ? (
                <S.ChatStatus> {currentChat.isOnline} </S.ChatStatus>
              ) : (
                <S.ChatStatus>
                  {currentChat.isOnline !== '' &&
                    `Visto por último ${formatDate(
                      currentChat.isOnline,
                      false,
                      true
                    )}`}
                </S.ChatStatus>
              )}
            </S.ChatStatus>
          </S.HeaderTextArea>
        </div>
        <S.ChatHeaderActions
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              toggleUserInterfaceProp({
                showSearchMessageModal: !showSearchMessageModal,
              })
            );
            dispatch(updateSearchMessage(''));
          }}
        >
          {showSearchMessageModal ? (
            <>
              <Cross2Icon id="cross-icon" /> <span>Fechar Pesquisa</span>
            </>
          ) : (
            <>
              <MagnifyingGlassIcon id="search-icon" />
              <span>Abrir Pesquisa</span>
            </>
          )}
        </S.ChatHeaderActions>
      </S.CurrentChatHeader>
    );
  } else {
    return <S.CurrentChatHeader />;
  }
}
