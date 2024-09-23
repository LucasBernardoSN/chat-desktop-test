import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useCreateChatElement,
  useCreateMessageListElement,
} from '../../../hooks';
import {
  RootState,
  addActiveUser,
  clearReference,
  setChatList,
  setCurrentChatId,
  setMessageList,
  toggleUserInterfaceProp,
  updateSearchMessage,
} from '../../../reducers';
import { useApi, useFetchMessages } from '../../../services/api';
import { useSocket } from '../../../services/socket';
import { darkTheme } from '../../../stitches.config';
import {
  AlertButton,
  AlertContent,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertPortal,
  Flex,
  Overlay,
} from '../../../styles/AlertDialog';
import { ContactElement } from '../../../types';
import { formatDate } from '../../../utils';
import ProfileImage from '../../ProfileImage';
import * as S from './styles';

export default function ContactListElement({
  company,
  id,
  name,
  imageProfileUrl,
  appversion,
  lastlogin,
}: ContactElement) {
  const app = window.require('electron');
  const ipcRenderer = app.ipcRenderer;
  const dispatch = useDispatch();
  const { usertype, userid } = useSelector((state: RootState) => state.User);
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const chatList = useSelector((state: RootState) => state.ChatList);
  const { handleFetchMessages } = useFetchMessages();
  const { sendChat, sendForceUpdate } = useSocket({});
  const { createChatElement } = useCreateChatElement();
  const { createMessageListElement } = useCreateMessageListElement();
  const { handleCreateNewChat } = useApi();

  async function handleContact() {
    if (Object.hasOwn(chatList, id)) {
      dispatch(setCurrentChatId({ currentChatId: id }));
      await handleFetchMessages(id, 'onClick', {
        messagecount: chatList[id].messagecount,
        firstfetch: true,
      });
    } else {
      const { failed } = await handleCreateNewChat(id);

      if (failed) {
        // Erro
      } else {
        dispatch(
          setChatList(
            await createChatElement({
              company,
              receiverid: id,
              name,
              id: `${userid}.${id}`,
            })
          )
        );

        dispatch(setMessageList({ [id]: createMessageListElement({}) }));

        dispatch(setCurrentChatId({ currentChatId: id }));
      }
    }
  }

  function handleClick() {
    dispatch(updateSearchMessage(''));
    dispatch(clearReference());
    dispatch(toggleUserInterfaceProp({ showSearchMessageModal: false }));
    handleContact();
    dispatch(addActiveUser({ receiverid: id }));
    sendChat(id);
    dispatch(toggleUserInterfaceProp({ showContactList: false }));
  }

  function handleForceUpdate(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    sendForceUpdate(id);
    const element = document.getElementById('update-force-alert');
    element?.click();
  }

  return (
    <S.ChatListElementContainer
      id="contact-list"
      onClick={handleClick}
      userType={usertype}
    >
      <ProfileImage
        name={name}
        size={'small'}
        profileImageUrl={imageProfileUrl}
      />

      <S.Content>
        <S.ChatName>{name}</S.ChatName>

        {usertype === 'suporte' && (
          <S.SuportArea>
            <S.CompanyName>{company}</S.CompanyName>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <S.ClientId>{id}</S.ClientId>
              <div>
                <S.ClientId>{formatDate(lastlogin, false)}</S.ClientId>
                <S.ClientId>{' - '}</S.ClientId>
                <S.ClientId>v{appversion}</S.ClientId>
                <AlertDialog>
                  <AlertDialogTrigger id="update-force-alert" />
                  <AlertPortal>
                    <Overlay />
                    <Flex className={isDarkTheme ? darkTheme : ''}>
                      <AlertContent>
                        <AlertDialogDescription>
                          O Update foi forçado!
                        </AlertDialogDescription>
                        <AlertDialogCancel asChild>
                          <AlertButton color="cancel">OK</AlertButton>
                        </AlertDialogCancel>
                      </AlertContent>
                    </Flex>
                  </AlertPortal>
                </AlertDialog>
                <S.ButtonUpdate onClick={handleForceUpdate}>
                  Forçar Update
                </S.ButtonUpdate>
              </div>
            </div>
          </S.SuportArea>
        )}
      </S.Content>
    </S.ChatListElementContainer>
  );
}
