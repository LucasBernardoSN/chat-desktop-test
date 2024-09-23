import { ExternalLinkIcon, ResetIcon, TrashIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSendFileTransmissionContext } from '../../../contexts/SendFileTransmissionContext';
import {
  addMessageToUpdateStatus,
  createListMessagesToUpdateStatus,
  RootState,
  setForwardedMessage,
  setReference,
  toggleUserInterfaceProp,
} from '../../../reducers';
import { darkTheme } from '../../../stitches.config';
import { MessageElement } from '../../../types';
import * as S from './MessageActions.styles';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {
  AlertButton,
  AlertContent,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertPortal,
  Flex,
  Overlay,
} from '../../../styles/AlertDialog';

interface MessageActionsProps {
  index: number;
  messageProps: MessageElement;
  textMessage: string;
  messageType: string;
  mainLink?: string;
  receiverid: number;
}

export function MessageActions({
  index,
  messageProps,
  textMessage,
  messageType,
  mainLink,
  receiverid,
}: MessageActionsProps) {
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { userid } = useSelector((state: RootState) => state.User);
  const { setForwardedMessageFile } = useSendFileTransmissionContext();
  const [deleted, setDeleted] = useState(messageProps.messagereadstatus === 4);
  const dispatch = useDispatch();

  function dispatchUpdateMessageStatus() {
    setDeleted(true);
    dispatch(createListMessagesToUpdateStatus({ receiverid: receiverid }));
    dispatch(
      addMessageToUpdateStatus({
        id: messageProps.id,
        receiverid,
        status: 4,
      })
    );
  }

  async function handleForwardFile() {
    let erro = false;

    const file = await fetch(mainLink as string)
      .then((response) => response.blob())
      .then((blobFile) => new File([blobFile], textMessage))
      .catch(() => {
        erro = true;
        toast.error(
          'Erro! Verifique sua conexão com a internet ou tente mais tarde.',
          {
            position: 'bottom-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: isDarkTheme ? 'dark' : 'light',
            transition: Slide,
          }
        );
      });
    if (!erro) {
      setForwardedMessageFile(file as File);
      dispatch(toggleUserInterfaceProp({ showTransmissionMessageModal: true }));
    }
  }

  return (
    <S.Container className={isDarkTheme ? darkTheme : ''}>
      {index !== 0 && !deleted && (
        <>
          <S.ActionButton
            color="blue"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setReference(messageProps));
            }}
          >
            <ResetIcon />
          </S.ActionButton>

          {messageType === 'text' ? (
            <S.ActionButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  toggleUserInterfaceProp({
                    showTransmissionMessageModal: true,
                  })
                );

                dispatch(setForwardedMessage(textMessage));
              }}
            >
              <ExternalLinkIcon />
            </S.ActionButton>
          ) : (
            <S.ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handleForwardFile();
              }}
            >
              <ExternalLinkIcon />
            </S.ActionButton>
          )}

          {messageProps.author === userid && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <S.ActionButton color="tomato">
                  <TrashIcon />
                </S.ActionButton>
              </AlertDialogTrigger>
              <AlertPortal>
                <Overlay />
                <Flex className={isDarkTheme ? darkTheme : ''}>
                  <AlertContent>
                    <AlertDialogDescription>
                      Tem certeza que deseja apagar esta mensagem?
                    </AlertDialogDescription>
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'end',
                      }}
                    >
                      <AlertDialogCancel asChild>
                        <AlertButton color={'cancel'}>Cancelar</AlertButton>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <AlertButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!deleted) {
                              dispatchUpdateMessageStatus();
                            }
                          }}
                        >
                          Apagar
                        </AlertButton>
                      </AlertDialogAction>
                    </div>
                  </AlertContent>
                </Flex>
              </AlertPortal>
            </AlertDialog>
          )}
        </>
      )}
    </S.Container>
  );
}
