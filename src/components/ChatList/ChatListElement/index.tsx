import CryptoJS from 'crypto-js';
import { memo, useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  addActiveUser,
  clearReference,
  setCurrentChatId,
  toggleUserInterfaceProp,
  updateSearchMessage,
} from '../../../reducers';
import { useFetchMessages } from '../../../services/api';
import { SECRET } from '../../../services/config';
import { useSocket } from '../../../services/socket';
import { ChatElement } from '../../../types';
import { formatDate } from '../../../utils';
import ProfileImage from '../../ProfileImage';
import * as S from './styles';
import { CircleBackslashIcon } from '@radix-ui/react-icons';

type MessageCountWrapper = '1' | '2' | '3' | '4' | '5';

function ChatListElement({
  name,
  receiverid,
  company,
  lastmessagedate,
  isWriting,
  messagecount,
  lastmessage,
  imageProfileUrl,
  messagereadstatus,
}: ChatElement) {
  const dispatch = useDispatch();
  const { usertype } = useSelector((state: RootState) => state.User);
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );

  let decryptedLastMessage = '';
  if (lastmessage) {
    const bytes = CryptoJS.AES.decrypt(lastmessage, SECRET);
    decryptedLastMessage = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const { handleFetchMessages } = useFetchMessages();
  const { sendChat } = useSocket({});

  const [countWrapper, setCountWrapper] = useState<MessageCountWrapper>('5');

  async function handleCurrentChat() {
    dispatch(setCurrentChatId({ currentChatId: receiverid }));
    await handleFetchMessages(receiverid, 'onClick', {
      messagecount,
      firstfetch: true,
    });
  }

  function handleOnClick() {
    dispatch(updateSearchMessage(''));
    dispatch(clearReference());
    dispatch(toggleUserInterfaceProp({ showSearchMessageModal: false }));
    handleCurrentChat();
    dispatch(addActiveUser({ receiverid }));
    sendChat(receiverid);

    setTimeout(() => {
      if (window.innerWidth < 640)
        dispatch(toggleUserInterfaceProp({ showChatList: false }));
    }, 100);
  }

  useEffect(() => {
    const messageCountString = messagecount.toString();
    const wrapperSize = messageCountString.length;
    setCountWrapper(wrapperSize.toString() as MessageCountWrapper);
  }, [messagecount]);

  return (
    <S.ChatListElementContainer
      userType={usertype}
      onClick={handleOnClick}
      color={currentChatId === receiverid ? 'active' : undefined}
    >
      <ProfileImage
        name={name}
        size={'small'}
        profileImageUrl={imageProfileUrl}
      />

      <S.Content>
        <S.LastMessageContent>
          <S.ChatName>{name}</S.ChatName>
          <S.LastMessageDate>
            {formatDate(lastmessagedate, true)}
          </S.LastMessageDate>
        </S.LastMessageContent>

        <S.LastMessageContent>
          <S.LastMessageArea>
            <S.LastMessageText>
              {isWriting ? (
                <S.IsWriting>Digitando...</S.IsWriting>
              ) : messagereadstatus === 4 ? (
                <S.DeleteMessage>
                  <CircleBackslashIcon id="block-icon" /> Mensagem apagada
                </S.DeleteMessage>
              ) : (
                decryptedLastMessage
              )}
            </S.LastMessageText>
          </S.LastMessageArea>

          {messagecount > 0 && (
            <S.NewMessageNotification countWrapperSize={countWrapper}>
              <S.NewMessageCount>{messagecount}</S.NewMessageCount>
            </S.NewMessageNotification>
          )}
        </S.LastMessageContent>

        {usertype === 'suporte' && (
          <S.SuportArea>
            <S.CompanyName>{company}</S.CompanyName>
            <S.ClientId>{receiverid}</S.ClientId>
          </S.SuportArea>
        )}
      </S.Content>
    </S.ChatListElementContainer>
  );
}

export default memo(ChatListElement);
