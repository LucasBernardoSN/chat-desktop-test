import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  clearReference,
  toggleUserInterfaceProp,
  updateSearchMessage,
} from '../../../reducers';
import { ChatElement } from '../../../types';
import ProfileImage from '../../ProfileImage';
import * as S from './TransmissionMessageChatElement.styles';

interface TransmissionMessageChatElementProps extends ChatElement {
  chatListToTransmitMessage: number[];
  disabled: boolean;
  setChatListToTransmitMessage: Dispatch<React.SetStateAction<number[]>>;
}

export default function TransmissionMessageChatElement({
  company,
  name,
  imageProfileUrl,
  receiverid,
  chatListToTransmitMessage,
  setChatListToTransmitMessage,
  disabled,
}: TransmissionMessageChatElementProps) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(updateSearchMessage(''));
    dispatch(clearReference());
    dispatch(toggleUserInterfaceProp({ showSearchMessageModal: false }));
    dispatch(toggleUserInterfaceProp({ showContactList: false }));
  }

  function handleChecked(checkState: boolean) {
    if (checkState) {
      setChatListToTransmitMessage((state) => [...state, receiverid]);
    } else {
      setChatListToTransmitMessage((state) =>
        state.filter((id) => id !== receiverid)
      );
    }
  }

  return (
    <S.ChatListElementContainer id="contact-list" onClick={handleClick}>
      <S.Checkbox
        type="checkbox"
        checked={chatListToTransmitMessage.includes(receiverid)}
        onChange={(e) => {
          handleChecked(e.target.checked);
        }}
        disabled={disabled}
      />
      <ProfileImage
        name={name}
        size={'small'}
        profileImageUrl={imageProfileUrl}
      />

      <S.Content>
        <S.ChatName>{name}</S.ChatName>

        <S.SuportArea>
          <S.CompanyName>{company}</S.CompanyName>
        </S.SuportArea>
      </S.Content>
    </S.ChatListElementContainer>
  );
}
