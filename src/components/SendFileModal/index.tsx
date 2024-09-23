import { Cross1Icon, ImageIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import CryptoJS from 'crypto-js';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { useAlerts, useCreateMessageElement } from '../../hooks';
import {
  RootState,
  addMessages,
  clearMessageList,
  toggleUserInterfaceProp,
  updateLastMessage,
  updateMessageCount,
} from '../../reducers';
import { updateMessageIndex } from '../../reducers/MessageList.reducer';
import {
  useApi,
  useAsyncApiCall,
  useFetchMessages,
  useHasNetworkConnection,
} from '../../services/api';
import { SECRET } from '../../services/config';
import { MessageElement } from '../../types';
import {
  ARQUIVO_GRANDE,
  FILE_SIZE,
  MUITAS_IMAGENS,
  createHashMd5Id,
  formatFileSize,
  formatFileType,
} from '../../utils';
import RoundButton from '../RoundButton';
import * as S from './styles';

export interface FileElement {
  file: File;
  error: boolean;
  size: number;
  name: string;
  fileURL: string;
  fileExtension: string;
  fileId: string;
  receiverid: number;
}

export type SendFileModalProps = {
  setPastedFiles: Dispatch<SetStateAction<File[]>>;
  pastedFiles: File[];
};

export const SendFileModal = ({
  pastedFiles,
  setPastedFiles,
}: SendFileModalProps) => {
  const dispatch = useDispatch();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const { createMessageElement } = useCreateMessageElement();
  const { handleSendFile, handleUpdateStatusOfAllMessages } = useApi();
  const { setFileMessagesPostFailed } = useAsyncApiCall();
  const { displayAlert } = useAlerts();
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const { showSendFilesModal } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const [currentPreview, setCurrentPreview] = useState<number>(0);
  const [filesToSend, setFilesToSend] = useState<FileElement[]>([]);
  const { handleFetchMessages } = useFetchMessages();
  const messageList = useSelector((state: RootState) => state.MessageList);

  useEffect(() => {
    async function handlePasteFiles() {
      await onDrop(pastedFiles);
      setPastedFiles([]);
    }
    handlePasteFiles();
  }, [pastedFiles[0]]);

  const dragContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !showSendFilesModal &&
      filesToSend.filter((file) => file.receiverid === currentChatId).length
    ) {
      dragContainerRef.current?.focus();
    }
  }, [showSendFilesModal, filesToSend]);

  function handleInputKey(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendFiles();
    }
  }

  async function sendFile(newFileMessage: MessageElement, receiverid: number) {
    const incriptedMessage = {
      ...newFileMessage,
      body: CryptoJS.AES.encrypt(
        JSON.stringify(newFileMessage.body),
        SECRET
      ).toString(),
      index: 0,
    };

    const {
      author,
      body,
      chats,
      datemessage,
      device,
      id,
      messagereadstatus,
      reference,
      typemessage,
      file,
    } = incriptedMessage;

    const { hasMessagesBelow } = messageList[currentChatId as number];

    if (hasMessagesBelow && currentChatId) {
      if (await checkConnectionWithServer()) {
        dispatch(clearMessageList({ receiverid: currentChatId }));

        const { failed } = await handleUpdateStatusOfAllMessages(currentChatId);

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
    }

    let messageWithoutFile = incriptedMessage;
    delete messageWithoutFile['file'];

    dispatch(
      addMessages({
        messages: [messageWithoutFile],
        receiverid,
        addBelow: true,
      })
    );

    dispatch(
      updateLastMessage({
        lastmessage: body,
        lastmessagedate: datemessage,
        receiverid: receiverid,
      })
    );

    let message = new FormData();

    message.append(`id`, `${id}`);
    message.append(`typemessage`, `${typemessage}`);
    message.append(`body`, `${body}`);
    message.append(`datemessage`, `${datemessage}`);
    message.append(`messagereadstatus`, `${messagereadstatus}`);
    message.append(`device`, `${device}`);
    message.append(`author`, `${author}`);
    message.append(`chats`, `${chats}`);
    message.append(`reference`, `${reference}`);
    message.append(`file`, file!);

    if (await checkConnectionWithServer()) {
      const { failed, data } = await handleSendFile(message, receiverid);
      if (failed) {
        setFileMessagesPostFailed((curr) => [
          ...curr,
          { file: message, receiverid },
        ]);
      } else {
        dispatch(updateMessageIndex({ id, index: data.index, receiverid }));
      }
    } else {
      setFileMessagesPostFailed((curr) => [
        ...curr,
        { file: message, receiverid },
      ]);
    }
  }

  async function sendFiles() {
    const currentFilesToSend = filesToSend.filter(
      (file) => file.receiverid === currentChatId
    );

    if (currentFilesToSend.length < 0 || currentFilesToSend.length > 5) {
      displayAlert(MUITAS_IMAGENS, 'chat-alert-trigger');
    } else if (currentFilesToSend.find((file) => file.error === true)) {
      displayAlert(ARQUIVO_GRANDE, 'chat-alert-trigger');
    } else {
      closeDragModal();
      for (const fileToSend of currentFilesToSend) {
        const { file, fileExtension, name, fileURL } = fileToSend;

        // console.log('currentChatId', currentChatId);
        currentChatId &&
          (await sendFile(
            createMessageElement({
              typemessage: fileExtension,
              body: name,
              file,
              localTempFileURL: fileURL,
            }),
            currentChatId
          ));
      }
    }
  }

  function removeFile(fileToBeRemoved: FileElement) {
    const newFilesToSend = filesToSend.filter((file) => {
      return file.fileId !== fileToBeRemoved.fileId;
    });

    setFilesToSend(newFilesToSend);
  }

  function closeDragModal() {
    setCurrentPreview(0);
    dispatch(toggleUserInterfaceProp({ showSendFilesModal: false }));

    if (currentChatId) {
      const newFilesToSend = filesToSend.filter((file) => {
        return file.receiverid !== currentChatId;
      });

      setFilesToSend(newFilesToSend);
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      dispatch(toggleUserInterfaceProp({ showSendFilesModal: false }));
      const newFilesToSend: FileElement[] = [];

      if (currentChatId) {
        for (const file of acceptedFiles) {
          const error = file.size > FILE_SIZE.MAX_UPLOAD_SIZE;
          const fileURL = URL.createObjectURL(file);
          const fileExtension = file.name.substring(
            file.name.lastIndexOf('.') + 1
          );
          const name = file.name;
          const size = file.size;
          const fileId = createHashMd5Id();

          newFilesToSend.push({
            file,
            name,
            size,
            error,
            fileURL,
            fileExtension,
            fileId,
            receiverid: currentChatId,
          });
        }
      }

      setFilesToSend((currentFiles) => [...currentFiles, ...newFilesToSend]);
    },
    [currentChatId]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  if (
    !showSendFilesModal &&
    !filesToSend.filter((file) => file.receiverid === currentChatId).length
  ) {
    return (
      <div {...getRootProps()} id={'drop-zone-erochat'}>
        <button style={{ display: 'none' }} id="file-input-button">
          <input {...getInputProps()} />
        </button>
      </div>
    );
  }

  return (
    <S.DragContainer
      onDragLeave={() =>
        dispatch(toggleUserInterfaceProp({ showSendFilesModal: false }))
      }
    >
      {showSendFilesModal && (
        <S.DragContainer id="drag-container">
          <React.Fragment>
            <S.CloseModalButton
              style={{ top: 10, right: 10 }}
              onClick={closeDragModal}
            >
              <Cross1Icon />
            </S.CloseModalButton>
            <S.DragContent {...getRootProps()}>
              <input {...getInputProps()} />
              Solte as imagens e/ou arquivos aqui...
            </S.DragContent>
          </React.Fragment>
        </S.DragContainer>
      )}

      {!showSendFilesModal && (
        <React.Fragment>
          {filesToSend.filter((file) => file.receiverid === currentChatId)
            .length > 0 && (
            <S.DragContainer
              ref={dragContainerRef}
              tabIndex={-1}
              onKeyPress={(event) => handleInputKey(event)}
            >
              <S.PreviewContainer id="preview-container">
                <S.CloseModalButton onClick={closeDragModal}>
                  <Cross1Icon />
                </S.CloseModalButton>
                <S.WrapperPreview id="wrapper-preview">
                  {filesToSend
                    .filter((file) => file.receiverid === currentChatId)
                    .map(
                      (file, index) =>
                        index === currentPreview &&
                        (formatFileType(file.fileExtension) === 'image' ||
                        formatFileType(file.fileExtension) === 'thumb' ? (
                          <S.PreviewImage
                            key={index}
                            src={file.fileURL}
                            alt={file.name}
                          />
                        ) : (
                          <S.PreviewFileWrapper key={index}>
                            <S.FileInfo text={'title'}>{file.name}</S.FileInfo>
                            <S.PreviewFile
                              src={`./images/svg/${formatFileType(
                                file.fileExtension
                              )}.svg`}
                              alt={file.name}
                            />

                            <S.FileInfo text={'sub'}>
                              {formatFileSize(file.size)} -{' '}
                              {file.fileExtension.toUpperCase()}
                            </S.FileInfo>
                          </S.PreviewFileWrapper>
                        ))
                    )}
                </S.WrapperPreview>
                <S.Separator />
                <S.PreviewControler>
                  <div
                    style={{
                      borderRadius: '50%',
                      marginLeft: 10,
                    }}
                    {...getRootProps()}
                  >
                    <RoundButton size="large" color="grass">
                      <ImageIcon />
                    </RoundButton>
                  </div>

                  <S.WrapperControler>
                    <S.ControlerContent>
                      {filesToSend
                        .filter((file) => file.receiverid === currentChatId)
                        .map((file, index) => (
                          <S.FileControlerContainer key={index}>
                            {formatFileType(file.fileExtension) === 'image' ||
                            formatFileType(file.fileExtension) === 'thumb' ? (
                              <S.ControlerImage
                                validefile={file.error}
                                src={file.fileURL}
                                alt={file.name}
                                onClick={() => setCurrentPreview(index)}
                              />
                            ) : (
                              <S.ControlerFile
                                validefile={file.error}
                                src={`./images/svg/${formatFileType(
                                  file.fileExtension
                                )}.svg`}
                                alt={file.name}
                                onClick={() => setCurrentPreview(index)}
                              />
                            )}
                            <S.RemoveFileButton
                              onClick={() => {
                                removeFile(file);
                              }}
                            >
                              X
                            </S.RemoveFileButton>
                          </S.FileControlerContainer>
                        ))}
                    </S.ControlerContent>
                  </S.WrapperControler>

                  <S.SendIconWrapper>
                    <RoundButton
                      size="large"
                      color={'grass'}
                      onClick={() => sendFiles()}
                    >
                      <PaperPlaneIcon />
                    </RoundButton>
                  </S.SendIconWrapper>
                </S.PreviewControler>
              </S.PreviewContainer>
            </S.DragContainer>
          )}
        </React.Fragment>
      )}
    </S.DragContainer>
  );
};
