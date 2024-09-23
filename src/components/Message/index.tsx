import {
  CircleBackslashIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  ResetIcon,
} from '@radix-ui/react-icons';
import CryptoJS from 'crypto-js';
import { format, isSameDay } from 'date-fns';
import React, { memo, useEffect, useRef, useState } from 'react';
import { BiCheck, BiCheckDouble, BiTimeFive } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useIntersectionObserver } from 'usehooks-ts';

import { RootState, setReference } from '../../reducers';
import { CHAT_IMAGES_URL, SECRET } from '../../services/config';
import { MessageElement } from '../../types';
import {
  MessageStatus,
  formatDate,
  formatFileType,
  formatMessageType,
} from '../../utils';
import FileMessage from './FileMessage';
import ImageMessage from './ImageMesssage';
import { ImageModal } from './ImageModal/ImageModal.index';
import { MessageActions } from './MessageActions/MessageActions.index';
import { MessageReference } from './MessageReference/MessageReference.index';
import MessageVisualizeController from './MessageVisualizeController/MessageVisualizeController.index';
import * as S from './styles';

interface MessageProps extends MessageElement {
  previousMessageDate: string | undefined;
  previousMessageStatus: MessageStatus | undefined;
  auxScrollControlIsVisible: boolean;
  isLastMessage: {
    above: boolean;
    below: boolean;
  };
  receiverid: number;
}

function Message(props: MessageProps) {
  const {
    previousMessageDate,
    datemessage,
    author,
    body,
    id,
    chats,
    typemessage,
    localTempFileURL,
    messagereadstatus,
    isLastMessage,
    auxScrollControlIsVisible,
    reference,
    objmessage,
    index,
    receiverid,
  } = props;

  const bytes = CryptoJS.AES.decrypt(body, SECRET);
  const decryptedBody: string = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const dispatch = useDispatch();
  const firstMessageDateRef = useRef<HTMLDivElement | null>(null);

  const { userid } = useSelector((state: RootState) => state.User);
  const { currentChatId, searchMessage } = useSelector(
    (state: RootState) => state.CurrentChat
  );

  const [firstMessageDate, setFirstMessageDate] = useState<string>('');
  const [isFirstMessageOfDay, setIsFirstMessageOfDay] =
    useState<boolean>(false);

  const messageType = formatMessageType(typemessage);
  const userIsAuthor = author === userid;
  const includesSearch =
    searchMessage !== '' &&
    decryptedBody.toLowerCase().includes(searchMessage.toLowerCase());
  function setLink(type: '_thumb' | '') {
    if (currentChatId) {
      return `${CHAT_IMAGES_URL}/${chats}/${id}${type}.${typemessage}`;
    } else {
      return '';
    }
  }

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (previousMessageDate === undefined) {
      setIsFirstMessageOfDay(true);
      setFirstMessageDate(formatDate(datemessage, false));
    }

    if (previousMessageDate) {
      const newDateMessage = datemessage.slice(0, 10);
      const newPreviousMessageDate = previousMessageDate.slice(0, 10);
      const thisIsFirstMessageOfDay = !isSameDay(
        new Date(newDateMessage),
        new Date(newPreviousMessageDate)
      );
      if (thisIsFirstMessageOfDay) {
        setIsFirstMessageOfDay(true);
        setFirstMessageDate(formatDate(datemessage, false));
      } else {
        setIsFirstMessageOfDay(false);
      }
    }
  }, [previousMessageDate]);

  const [hoverMessage, setHoverMessage] = useState(false);
  const [showMessageImageModal, setShowMessageImageModal] = useState(false);

  return (
    <React.Fragment>
      {showMessageImageModal && (
        <ImageModal
          mainLink={localTempFileURL ? localTempFileURL : setLink('')}
          setShowMessageImageModal={setShowMessageImageModal}
        />
      )}

      {messagereadstatus === 4 && (
        <MessageVisualizeController
          currentReceiverId={currentChatId!}
          {...props}
        >
          <S.MessageLine
            ref={firstMessageDateRef}
            userIsAuthor={userIsAuthor}
            onMouseEnter={() => {
              setHoverMessage(true);
            }}
            onMouseLeave={() => {
              setHoverMessage(false);
            }}
          >
            <S.MessageContainer
              includesSearch={includesSearch}
              userIsAuthor={userIsAuthor}
            >
              <S.DeleteMessage>
                <CircleBackslashIcon id="block-icon" /> Mensagem apagada
              </S.DeleteMessage>
            </S.MessageContainer>
          </S.MessageLine>
        </MessageVisualizeController>
      )}

      {messagereadstatus !== 4 && (
        <MessageVisualizeController
          currentReceiverId={currentChatId!}
          {...props}
        >
          <S.MessageLine
            ref={firstMessageDateRef}
            userIsAuthor={userIsAuthor}
            onMouseEnter={() => {
              setHoverMessage(true);
            }}
            onMouseLeave={() => {
              setHoverMessage(false);
            }}
          >
            {userIsAuthor && hoverMessage && (
              <MessageActions
                messageType={messageType}
                index={index}
                messageProps={props}
                textMessage={decryptedBody}
                mainLink={localTempFileURL ? localTempFileURL : setLink('')}
                receiverid={receiverid}
              />
            )}

            <S.MessageContainer
              includesSearch={includesSearch}
              userIsAuthor={userIsAuthor}
            >
              {reference > 0 && objmessage !== null && (
                <MessageReference
                  userIsAuthor={userIsAuthor}
                  reference={reference}
                  objmessage={objmessage}
                />
              )}
              {messageType === 'text' && (
                <S.TextMessage userIsAuthor={userIsAuthor}>
                  {decryptedBody.length > 300 && readMore === false ? (
                    <div>
                      {`${decryptedBody.slice(0, 300)}...`}
                      <S.ReadMoreButton onClick={() => setReadMore(true)}>
                        Ler mais
                      </S.ReadMoreButton>
                    </div>
                  ) : (
                    <div>
                      {decryptedBody}
                      {readMore && (
                        <S.ReadMoreButton onClick={() => setReadMore(false)}>
                          Ler menos
                        </S.ReadMoreButton>
                      )}
                    </div>
                  )}
                </S.TextMessage>
              )}

              {messageType === 'thumb' && (
                <ImageMessage
                  setShowMessageImageModal={setShowMessageImageModal}
                  thumbImageLink={
                    localTempFileURL ? localTempFileURL : setLink('_thumb')
                  }
                  mainLink={localTempFileURL ? localTempFileURL : setLink('')}
                  fileName={decryptedBody}
                  userIsAuthor={userIsAuthor}
                  fileType={formatFileType(typemessage)}
                />
              )}

              {messageType === 'file' && (
                <FileMessage
                  mainLink={localTempFileURL ? localTempFileURL : setLink('')}
                  fileName={decryptedBody}
                  userIsAuthor={userIsAuthor}
                  fileType={formatFileType(typemessage)}
                />
              )}

              <S.MessageInfoArea>
                <S.MessageTime>
                  {format(new Date(datemessage), 'HH:mm')}
                </S.MessageTime>

                {userIsAuthor && (
                  <S.MessageStatus status={messagereadstatus}>
                    {messagereadstatus === undefined && (
                      <BiTimeFive style={{ height: 15, width: 15 }} />
                    )}
                    {messagereadstatus === 0 && (
                      <BiTimeFive style={{ height: 15, width: 15 }} />
                    )}
                    {messagereadstatus === 1 && (
                      <BiCheck style={{ height: 25, width: 25 }} />
                    )}
                    {messagereadstatus === 2 && (
                      <BiCheckDouble style={{ height: 25, width: 25 }} />
                    )}
                    {messagereadstatus === 3 && (
                      <BiCheckDouble style={{ height: 25, width: 25 }} />
                    )}
                  </S.MessageStatus>
                )}
              </S.MessageInfoArea>
            </S.MessageContainer>
            {!userIsAuthor && hoverMessage && (
              <MessageActions
                messageType={messageType}
                index={index}
                messageProps={props}
                textMessage={decryptedBody}
                mainLink={localTempFileURL ? localTempFileURL : setLink('')}
                receiverid={receiverid}
              />
            )}
          </S.MessageLine>
        </MessageVisualizeController>
      )}

      {isFirstMessageOfDay && firstMessageDate && (
        <>
          <S.FirstMessageDateArea>
            <S.FirstMessageDateText>{firstMessageDate}</S.FirstMessageDateText>
          </S.FirstMessageDateArea>
        </>
      )}
    </React.Fragment>
  );
}

export default memo(Message);
