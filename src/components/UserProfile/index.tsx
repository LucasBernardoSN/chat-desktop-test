import { AvatarIcon, ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import app from '../../../package.json';
import {
  RootState,
  toggleEnableNotificantionSound,
  toggleTheme,
  toggleUserInterfaceProp,
} from '../../reducers';
import { userLogout } from '../../reducers/Auth.reducer';
import ProfileImage from '../ProfileImage';
import RetractableSideBar from '../RetractableSideBar';
import ChangeUserProfile from './ChangeUserProfile';
import * as S from './styles';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const { showUserProfile } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const {
    name,
    userProfileImage,
    localTempUserImage,
    enableNotificantionSound,
  } = useSelector((state: RootState) => state.User);

  function handleSwitchCheck(checkEvent: boolean) {
    dispatch(
      toggleEnableNotificantionSound({
        enableNotificantionSound: checkEvent,
      })
    );
  }

  return (
    <RetractableSideBar
      headerName="Perfil de Usuário"
      active={showUserProfile}
      showFalse={{ showUserProfile: false }}
    >
      <S.Container id="user-profile">
        <div style={{ flexGrow: 1 }}>
          <S.ProfileImageWrapper>
            <ProfileImage
              size={'large'}
              name={name}
              profileImageUrl={userProfileImage}
              localTempUserImage={localTempUserImage}
            />
            <S.UserName>{name}</S.UserName>
          </S.ProfileImageWrapper>
          <S.Separator />
          <S.UserProfileItem>
            <S.ItemTitle>Tema</S.ItemTitle>
            <S.UserProfileButton
              onClick={() =>
                dispatch(toggleTheme({ isDarkTheme: !isDarkTheme }))
              }
            >
              Trocar Tema
              {isDarkTheme && (
                <S.IconWrapper color={'light'}>
                  <SunIcon />
                </S.IconWrapper>
              )}
              {!isDarkTheme && (
                <S.IconWrapper color={'dark'}>
                  <MoonIcon />
                </S.IconWrapper>
              )}
            </S.UserProfileButton>
          </S.UserProfileItem>
          <S.Separator />
          <S.UserProfileItem>
            <ChangeUserProfile />
            <S.ItemTitle>Foto de Perfil</S.ItemTitle>
            <S.UserProfileButton
              onClick={() =>
                dispatch(
                  toggleUserInterfaceProp({
                    showProfileImageChangeModal: true,
                  })
                )
              }
            >
              Trocar Foto
              <S.IconWrapper>
                <AvatarIcon />
              </S.IconWrapper>
            </S.UserProfileButton>
          </S.UserProfileItem>
          <S.Separator />
          <S.UserProfileItem>
            <S.ItemTitle>Notificação com Som</S.ItemTitle>
            <S.Switch
              defaultChecked={enableNotificantionSound}
              onCheckedChange={(checkEvent) => handleSwitchCheck(checkEvent)}
            >
              <S.SwitchThumb />
            </S.Switch>
          </S.UserProfileItem>
          <S.Separator />
        </div>
        <div>
          <S.Separator />
          <S.UserProfileItem>
            <S.ItemTitle
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#3d9a50',
              }}
            >
              Versão {app.version}
            </S.ItemTitle>
          </S.UserProfileItem>
          <S.Separator />
          <S.UserProfileItem color={'logout'} style={{ alignSelf: 'flex-end' }}>
            <S.ItemTitle>Sair</S.ItemTitle>
            <S.UserProfileButton
              color={'logout'}
              onClick={() => dispatch(userLogout())}
            >
              Sair do Chat
              <S.IconWrapper>
                <ExitIcon />
              </S.IconWrapper>
            </S.UserProfileButton>
          </S.UserProfileItem>
        </div>
      </S.Container>
    </RetractableSideBar>
  );
}
