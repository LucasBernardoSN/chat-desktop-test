import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useWindowFocus from 'use-window-focus';
import packagejson from '../../../package.json';

import ChatHome from '../../components/ChatHome';
import ChatList from '../../components/ChatList';
import ContactList from '../../components/ContactList';
import CurrentChat from '../../components/CurrentChat';
import ProfileImage from '../../components/ProfileImage';
import RoundButton from '../../components/RoundButton';
import SearchInput from '../../components/SearchInput/SearchInput.index';
import { TransmissionMessageModal } from '../../components/TransmissionMessageModal/TransmissionMessageModal.index';
import UserProfile from '../../components/UserProfile';
import { useSendFileTransmissionContext } from '../../contexts/SendFileTransmissionContext';
import { useCreateChatElement } from '../../hooks';
import {
  RootState,
  clearChatList,
  setChatList,
  toggleIsUpdatedVersion,
  toggleUserInterfaceProp,
  updateUserImageProfile,
  userLogout,
} from '../../reducers';
import {
  useApi,
  useAsyncApiCall,
  useHasNetworkConnection,
  useUpdateMessageStatus,
} from '../../services/api';
import { DEV, DEVICE, PROFILE_IMAGE_URL } from '../../services/config';
import { useSocket } from '../../services/socket';
import { darkTheme } from '../../stitches.config';
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
} from '../../styles/AlertDialog';
import LoadingScreen, {
  ConnectedProps,
} from '../LoadingScreen/LoadingScreen.index';
import NetworkErrorScreen from '../NetworkErrorScreen/NetworkErrorScreen.index';
import * as S from './styles';

export default function ChatScreen() {
  const app = window.require('electron');
  const ipcRenderer = app.ipcRenderer;
  useAsyncApiCall();
  useUpdateMessageStatus();
  const [connectionStages, setConnectionStages] = useState<ConnectedProps[]>([
    {
      display: 'Autenticado',
      value: 'ok',
      id: 1,
    },
    {
      display: 'Conexão com a internet',
      value: 'loading',
      id: 2,
    },
    {
      display: 'Servidor online',
      value: 'loading',
      id: 3,
    },
    {
      display: 'Token válido',
      value: 'loading',
      id: 4,
    },
    {
      display: 'Usuário atualizado',
      value: 'loading',
      id: 5,
    },
    {
      display: 'Lista de chats recuperada',
      value: 'loading',
      id: 6,
    },
    {
      display: 'Socket conectado',
      value: 'loading',
      id: 7,
    },
  ]);
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { currentChatId, forwardedMessage } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const {
    name,
    userProfileImage,
    localTempUserImage,
    userid,
    usertype,
    company,
  } = useSelector((state: RootState) => state.User);
  const { showChatList, alertText, showTransmissionMessageModal } = useSelector(
    (state: RootState) => state.UserInterface
  );

  const { forwardedMessageFile } = useSendFileTransmissionContext();
  function updateStage(stageId: number, value: boolean) {
    setConnectionStages((state) => {
      return state.map((stage) => {
        if (stage.id === stageId) {
          return { ...stage, value: value ? 'ok' : 'error' };
        }
        return stage;
      });
    });
  }

  const { handleSocketIO, sendSetUserStatus, sendWriting } = useSocket({
    updateStage,
  });
  const { createChatElement } = useCreateChatElement();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const isFocused = useWindowFocus();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isValidatedUser, setIsValidatedUser] = useState<boolean | null>(null);
  const {
    handleTokenValidation,
    handleServerPing,
    handleCreateUpdateUser,
    handleFetchChatList,
  } = useApi();

  useEffect(() => {
    ipcRenderer.on(
      'update-available',
      (
        _: any,
        {
          message,
          updateDownloaded,
        }: { message: string; updateDownloaded?: any }
      ) => {
        console.log('🔵 ' + message);

        if (DEV === false) {
          axios
            .post('http://erosoft.com.br:3980/logupdate', {
              sistema: 'EroChat',
              cnpj: localStorage.getItem('erochat-cnpj'),
              empresa: localStorage.getItem('erochat-empresa') || company,
              usuario: localStorage.getItem('erochat-usuario') || name + userid,
              versionold: packagejson.version,
              versionnew: updateDownloaded?.version || 'sem dados',
              executefunction: message,
            })
            .catch((err) => {
              console.log('🐞' + err);
            });
        }
      }
    );
    ipcRenderer.on(
      'update-available-error',
      (
        _: any,
        {
          message,
          updateDownloaded,
        }: { message: string; updateDownloaded?: any }
      ) => {
        console.log('🔴 ' + message);

        if (DEV === false) {
          axios
            .post('http://erosoft.com.br:3980/logupdate', {
              sistema: 'EroChat',
              cnpj: localStorage.getItem('erochat-cnpj'),
              empresa: localStorage.getItem('erochat-empresa'),
              usuario: localStorage.getItem('erochat-usuario'),
              versionold: packagejson.version,
              versionnew: updateDownloaded?.version || 'sem dados',
              executefunction: message,
            })
            .catch((err) => {
              console.log('🐞' + err);
            });
        }
      }
    );
    ipcRenderer.on(
      'update-error',
      (_: any, { message }: { message: object }) => {
        console.log('🔵 ' + message);

        if (DEV === false) {
          axios
            .post('http://erosoft.com.br:3980/logerror', {
              sistema: 'EroChat',
              cnpj: localStorage.getItem('erochat-cnpj'),
              empresa: localStorage.getItem('erochat-empresa') || company,
              usuario: localStorage.getItem('erochat-usuario') || name + userid,
              data: new Date(),
              tela: 'Erro interno',
              erro: JSON.stringify(message),
            })
            .catch((err) => {
              console.log('🐞' + err);
            });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (connectionStages[6].value === 'ok') {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [connectionStages]);

  useEffect(() => {
    if (isFocused) {
      sendSetUserStatus('Online', DEVICE);
    } else {
      sendSetUserStatus(new Date().toJSON(), DEVICE);
    }
  }, [isFocused]);

  useBeforeunload(() => {
    sendSetUserStatus(new Date().toJSON(), DEVICE);
    currentChatId && sendWriting(currentChatId, false);
  });

  useEffect(() => {
    async function checkFetchChatList() {
      dispatch(clearChatList());
      const { failed, data } = await handleFetchChatList();

      if (failed === false) {
        updateStage(6, true);

        for (const chatElement of data) {
          dispatch(setChatList(await createChatElement(chatElement)));
        }
        ipcRenderer.send('newMessage');
        let messageCount = 0;
        for (const chatItem of data) {
          messageCount = messageCount + chatItem.messagecount;
        }
        ipcRenderer.sendSync(
          'update-badge',
          messageCount <= 0 ? null : messageCount
        );
        handleSocketIO();
      } else {
        updateStage(6, false);
      }
    }

    async function checkUserValidation() {
      const { failed, status, data } = await handleCreateUpdateUser();

      if (failed === false) {
        updateStage(5, true);

        if (status === 200) {
          if (data.updateversion) {
            dispatch(toggleIsUpdatedVersion(true));
          } else {
            dispatch(toggleIsUpdatedVersion(false));
          }
        }

        checkFetchChatList();
      } else {
        updateStage(5, false);
        setTimeout(() => {
          dispatch(userLogout());
        }, 2000);
      }
    }

    async function checkTokenValidation() {
      const { failed } = await handleTokenValidation();
      if (failed === false) {
        updateStage(4, true);
        setIsValidatedUser(true);
        checkUserValidation();
      } else {
        updateStage(4, false);
        setTimeout(() => {
          dispatch(userLogout());
        }, 2000);
      }
    }

    async function checkServerIsOnline() {
      if (await checkConnectionWithServer()) {
        setIsValidatedUser(false);
        updateStage(3, true);
        checkTokenValidation();
      } else {
        updateStage(3, false);
        setInterval(async () => {
          console.log('✨ => checkServerIsOnline');
          const { failed } = await handleServerPing();
          if (failed === false) {
            window.location.reload();
          }
        }, 10000);
      }
    }

    async function checkConnectionWithInternet() {
      if (navigator.onLine) {
        await fetch('https://www.google.com/', {
          mode: 'no-cors',
        })
          .then(() => {
            updateStage(2, true);
            checkServerIsOnline();
          })
          .catch(() => {
            updateStage(2, false);
            setInterval(async () => {
              const { failed } = await handleServerPing();
              if (failed === false) {
                window.location.reload();
              }
            }, 10000);
          });
      } else {
        updateStage(2, false);
        setInterval(async () => {
          console.log('✨ => checkConnectionWithInternet');
          const { failed } = await handleServerPing();
          if (failed === false) {
            window.location.reload();
          }
        }, 10000);
      }
    }

    async function userValidationAndStartup() {
      dispatch(
        updateUserImageProfile({
          localTempUserImage: '',
          userProfileImage: `${PROFILE_IMAGE_URL}/${userid}.png`,
        })
      );

      checkConnectionWithInternet();
    }

    userValidationAndStartup();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen connectionStages={connectionStages} />}
      {!isLoading && !isValidatedUser && <NetworkErrorScreen />}

      {isValidatedUser && (
        <>
          <ToastContainer />

          <AlertDialog>
            <AlertDialogTrigger id="chat-alert-trigger" />
            <AlertPortal>
              <Overlay />
              <Flex className={isDarkTheme ? darkTheme : ''}>
                <AlertContent>
                  <AlertDialogDescription>{alertText}</AlertDialogDescription>
                  <AlertDialogCancel asChild>
                    <AlertButton>OK</AlertButton>
                  </AlertDialogCancel>
                </AlertContent>
              </Flex>
            </AlertPortal>
          </AlertDialog>

          <S.AppContainer className={isDarkTheme ? darkTheme : ''}>
            <audio>
              <source src={'./sounds/notification.mp3'} type="audio/mpeg" />
            </audio>
            <ContactList />
            <UserProfile />
            {showTransmissionMessageModal && (
              <TransmissionMessageModal
                forwardedMessage={forwardedMessage}
                forwardedMessageFile={forwardedMessageFile}
              />
            )}

            <S.SideBar active={showChatList}>
              <S.SideBarHeader>
                <S.Wrapper
                  onClick={() => {
                    dispatch(
                      toggleUserInterfaceProp({
                        showUserProfile: true,
                      })
                    );
                  }}
                >
                  <ProfileImage
                    profileImageUrl={userProfileImage}
                    clickable={true}
                    name={name}
                    localTempUserImage={localTempUserImage}
                  />
                </S.Wrapper>

                <S.Wrapper>
                  <RoundButton
                    color={'grass'}
                    onClick={() => {
                      dispatch(
                        toggleUserInterfaceProp({
                          showTransmissionMessageModal: true,
                        })
                      );
                    }}
                  >
                    <DoubleArrowRightIcon />
                  </RoundButton>
                  <RoundButton
                    color={'grass'}
                    onClick={() => {
                      dispatch(
                        toggleUserInterfaceProp({
                          showContactList: true,
                        })
                      );
                    }}
                  >
                    <ChatBubbleIcon />
                  </RoundButton>
                  <RoundButton
                    color={'slate'}
                    onClick={() => {
                      dispatch(
                        toggleUserInterfaceProp({
                          showChatList: false,
                        })
                      );
                    }}
                  >
                    <ArrowLeftIcon />
                  </RoundButton>
                </S.Wrapper>
              </S.SideBarHeader>

              <S.SearchContainer>
                <SearchInput onChange={setSearchInput} value={searchInput} />
              </S.SearchContainer>

              <ChatList searchInput={searchInput} />
            </S.SideBar>

            <S.ChatArea hide={showChatList}>
              {!showChatList && (
                <RoundButton
                  onClick={() =>
                    dispatch(
                      toggleUserInterfaceProp({
                        showChatList: true,
                      })
                    )
                  }
                  fixed={true}
                  color={'slate'}
                  style={{ marginTop: 20 }}
                >
                  <ArrowRightIcon />
                </RoundButton>
              )}
              {currentChatId !== undefined && <CurrentChat />}
              {currentChatId === undefined && <ChatHome />}
            </S.ChatArea>
          </S.AppContainer>
        </>
      )}
    </>
  );
}
