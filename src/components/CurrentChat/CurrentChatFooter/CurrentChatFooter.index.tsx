import {
  Cross2Icon,
  FaceIcon,
  ImageIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons';
import CryptoJS from 'crypto-js';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';

import { useAlerts, useCreateMessageElement } from '../../../hooks';
import {
  RootState,
  clearReference,
  setReference,
  updateMessageText,
  useAppSelector,
} from '../../../reducers';
import { useSendMessage } from '../../../services/api';
import { SECRET } from '../../../services/config';
import { useSocket } from '../../../services/socket';
import { NUMERO_MAXIMO_CARACTERES } from '../../../utils';
import RoundButton from '../../RoundButton';
import * as S from './CurrentChatFooter.styles';

export const CurrentChatFooter = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();
  const chatList = useSelector((state: RootState) => state.ChatList);
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { displayAlert } = useAlerts();
  const { createMessageElement } = useCreateMessageElement();
  const { sendMessage } = useSendMessage();
  const { sendWriting } = useSocket({});
  const reference = useAppSelector(
    (state: RootState) => state.CurrentChat.currentReference
  );
  const [userIsWriting, setUserIsWriting] = useState<boolean>(true);
  const [messageText, setMessageText] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  async function prepararSendMessage() {
    if (messageText && currentChatId) {
      let newMessageText = messageText.trimEnd();
      newMessageText = newMessageText.trimStart();

      if (newMessageText !== '') {
        setUserIsWriting(true);
        sendMessage(
          createMessageElement({
            typemessage: 'text',
            body: newMessageText,
            reference: reference?.index || 0,
            objmessage: reference && { body: reference?.body },
          }),
          currentChatId
        );
        setMessageText('');
        handleWriting('');
        setEmojiPickerVisible(false);
      }
    }
  }

  function handleInputKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && messageText !== '') {
      event.preventDefault();
      prepararSendMessage();
    }
    console.log(event);
    if (event.key === 'Escape') {
      setEmojiPickerVisible(false);
    }
  }

  function handleWriting(event: string) {
    if (event.length === 1) {
      setMessageText(event.toUpperCase());
    } else {
      setMessageText(event);
    }
    if (event.length >= 10000) {
      displayAlert(NUMERO_MAXIMO_CARACTERES, 'chat-alert-trigger');
    }
    if (userIsWriting && currentChatId) {
      setUserIsWriting(false);
      sendWriting(currentChatId, userIsWriting);
    } else if (event === '' && currentChatId) {
      setUserIsWriting(true);
      sendWriting(currentChatId, userIsWriting);
    }
  }

  useEffect(() => {
    if (currentChatId && inputRef.current) {
      setMessageText(chatList[currentChatId].messageText);
      inputRef.current.focus();
    }
    return () => {
      if (currentChatId && inputRef.current) {
        dispatch(
          updateMessageText({
            receiverid: currentChatId,
            messageText: inputRef.current.value,
          })
        );
      }
    };
  }, [currentChatId]);

  function handleClickFileInput() {
    const fileInputButton = window.document.getElementById('file-input-button');
    if (fileInputButton) {
      fileInputButton.click();
    }
  }

  const onEmojiClick = (event: any, emojiObject: any) => {
    handleWriting(messageText + emojiObject.emoji);
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [reference]);

  return (
    <>
      {emojiPickerVisible && (
        <S.StyledEmojiPickerBox>
          <Picker
            native
            disableSearchBar
            onEmojiClick={onEmojiClick}
            groupVisibility={{
              flags: false,
            }}
            groupNames={{
              smileys_people: 'Expressões',
              animals_nature: 'Animais e Plantas',
              food_drink: 'Comida e Bebida',
              travel_places: 'Meios de Transporte',
              activities: 'Atividades',
              objects: 'Objetos',
              symbols: 'Símbolos',
              flags: 'Bandeiras',
              recently_used: 'Usados recentemente',
            }}
          />
        </S.StyledEmojiPickerBox>
      )}
      <S.FooterChat>
        <div
          style={{ display: 'flex' }}
          onKeyUp={(event: any) => handleInputKey(event)}
        >
          <RoundButton
            color="grass"
            onClick={() => setEmojiPickerVisible((state) => !state)}
          >
            {emojiPickerVisible ? <Cross2Icon /> : <FaceIcon />}
          </RoundButton>
        </div>

        <div style={{ display: 'flex' }}>
          <RoundButton
            color="grass"
            onClick={() => {
              setEmojiPickerVisible(false);
              handleClickFileInput();
            }}
          >
            <>
              <ImageIcon />
            </>
          </RoundButton>
        </div>
        <S.InputContainer>
          {reference && currentChatId && (
            <S.ReferenceContainer>
              <S.ReferenceTextContainer>
                <S.ReferenceText>
                  {JSON.parse(
                    CryptoJS.AES.decrypt(reference.body, SECRET).toString(
                      CryptoJS.enc.Utf8
                    )
                  )}
                </S.ReferenceText>
              </S.ReferenceTextContainer>
              <Cross2Icon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(clearReference());
                }}
                id="cross-icon"
              />
            </S.ReferenceContainer>
          )}

          <S.OnlyInput
            placeholder="Escreva a mensagem aqui..."
            onChange={(event) => {
              handleWriting(event.target.value);
            }}
            onKeyPress={(event) => handleInputKey(event)}
            onKeyUp={(event) => handleInputKey(event)}
            ref={inputRef}
            value={messageText}
            lang="pt-br"
            spellCheck
            maxLength={10000}
            autoFocus
          />
        </S.InputContainer>

        <div style={{ display: 'flex' }}>
          <RoundButton color={'grass'} onClick={() => prepararSendMessage()}>
            <PaperPlaneIcon />
          </RoundButton>
        </div>
      </S.FooterChat>
    </>
  );
};
