import { ImageIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAlerts, useCreateMessageElement } from '../../../hooks';
import { RootState, toggleUserInterfaceProp } from '../../../reducers';
import { useTransmissionMessage } from '../../../services/api';
import { Loading } from '../../../styles/Loading';
import { MessageElement } from '../../../types';
import { NENHUM_CHAT, NUMERO_MAXIMO_CARACTERES } from '../../../utils';
import RoundButton from '../../RoundButton';
import { SendFilesModalTransmission } from '../SendFilesModalTransmission/SendFilesModalTransmission.index';
import { TransmissionMessage } from '../TransmissionMessage/TransmissionMessage.index';
import * as S from './TransmissionMessageVisualizer.styles';

interface TransmissionMessageVisualizerProps {
  chatListToTransmitMessage: number[];
  disabled: boolean;
  setSending: (sending: boolean) => void;
  forwardedMessage: string;
  forwardedMessageFile: File | null;
}

export default function TransmissionMessageVisualizer({
  chatListToTransmitMessage,
  disabled,
  setSending,
  forwardedMessage,
  forwardedMessageFile,
}: TransmissionMessageVisualizerProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { displayAlert } = useAlerts();
  const [messageText, setMessageText] = useState('');
  const [pastedFiles, setPastedFiles] = useState<File[]>([]);
  const { createMessageElement } = useCreateMessageElement();
  const { transmissionMessage } = useTransmissionMessage();
  const [messagesTransmissed, setMessagesTransmissed] = useState<
    MessageElement[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (forwardedMessage !== '') {
      setMessageText(forwardedMessage);
    }
  }, [forwardedMessage]);
  useEffect(() => {
    if (forwardedMessageFile) {
      setPastedFiles([forwardedMessageFile]);
    }
  }, [forwardedMessageFile]);

  async function conveyMessage() {
    if (chatListToTransmitMessage.length === 0) {
      displayAlert(NENHUM_CHAT, 'chat-alert-trigger');
    } else {
      if (messageText) {
        let newMessageText = messageText.trimEnd();
        newMessageText = newMessageText.trimStart();

        if (newMessageText !== '') {
          setSending(true);
          for (const chatId of chatListToTransmitMessage) {
            await transmissionMessage(
              createMessageElement({
                typemessage: 'text',
                body: newMessageText,
              }),
              chatId
            );
          }
          setMessagesTransmissed((state) => [
            ...state,
            createMessageElement({
              typemessage: 'text',
              body: newMessageText,
            }),
          ]);
          setSending(false);
          setMessageText('');
          handleWriting('');
        }
      }
    }
  }

  function handleInputKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && messageText !== '') {
      event.preventDefault();
      conveyMessage();
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
  }

  function handleClickFileInput() {
    const fileInputButton = window.document.getElementById(
      'file-input-button-transmission'
    );
    if (fileInputButton) {
      fileInputButton.click();
    }
  }

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

  return (
    <S.CurrentChatContainer
      id="chat"
      onPaste={(e) => handlePasteInput(e)}
      currentTheme={isDarkTheme ? 'dark' : 'light'}
      onDragEnter={(e) => {
        if (e.nativeEvent?.dataTransfer?.items[0].kind === 'file') {
          dispatch(
            toggleUserInterfaceProp({ showSendFilesModalTransmission: true })
          );
        }
      }}
    >
      {disabled && (
        <S.SendingMessageContainer>
          <S.SendingMessageContent>
            <Loading speed={'s2'} />
            ENVIANDO
          </S.SendingMessageContent>
        </S.SendingMessageContainer>
      )}
      <SendFilesModalTransmission
        setPastedFiles={setPastedFiles}
        pastedFiles={pastedFiles}
        chatListToTransmitMessage={chatListToTransmitMessage}
        setMessagesTransmissed={setMessagesTransmissed}
        setSending={setSending}
      />
      <S.ChatContent id="chat-content">
        <S.MessageContainer>
          {messagesTransmissed.map((message, index) => (
            <React.Fragment key={message.id}>
              <TransmissionMessage {...message} />
            </React.Fragment>
          ))}
        </S.MessageContainer>
      </S.ChatContent>

      <S.FooterChat>
        <div style={{ display: 'flex' }}>
          <RoundButton
            disabled={disabled}
            color="grass"
            onClick={handleClickFileInput}
          >
            <>
              <ImageIcon />
            </>
          </RoundButton>
        </div>
        <S.InputContainer>
          <S.OnlyInput
            placeholder="Escreva a mensagem aqui..."
            onChange={(event) => {
              handleWriting(event.target.value);
            }}
            onKeyPress={(event) => handleInputKey(event)}
            ref={inputRef}
            value={messageText}
            lang="pt-br"
            spellCheck
            maxLength={10000}
            autoFocus
          />
        </S.InputContainer>

        <div style={{ display: 'flex' }}>
          <RoundButton
            disabled={disabled}
            color={'grass'}
            onClick={() => conveyMessage()}
          >
            <PaperPlaneIcon />
          </RoundButton>
        </div>
      </S.FooterChat>
    </S.CurrentChatContainer>
  );
}
