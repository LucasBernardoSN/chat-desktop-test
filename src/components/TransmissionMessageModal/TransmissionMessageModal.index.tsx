import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, toggleUserInterfaceProp } from '../../reducers';
import { darkTheme } from '../../stitches.config';
import { Loading } from '../../styles/Loading';
import { ChatElement } from '../../types';
import TransmissionMessageChatElement from './TransmissionMessageChatElement/TransmissionMessageChatElement.index';
import * as S from './TransmissionMessageModal.styles';
import TransmissionMessageVisualizer from './TransmissionMessageVisualizer/TransmissionMessageVisualizer.index';

interface TransmissionMessageModalProps {
  forwardedMessage: string;
  forwardedMessageFile: File | null;
}

export function TransmissionMessageModal({
  forwardedMessage,
  forwardedMessageFile,
}: TransmissionMessageModalProps) {
  const dispatch = useDispatch();
  const chatList = useSelector((state: RootState) => state.ChatList);
  const [sending, setSending] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredChatList, setFilteredChatList] = useState<ChatElement[]>(
    Object.values([])
  );
  const [chatListToTransmitMessage, setChatListToTransmitMessage] = useState<
    number[]
  >([]);

  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);

  useEffect(() => {
    const lowerSearch = searchInput.toLowerCase();
    const nameFilteredChatList = Object.values(chatList).filter((chat) => {
      return (
        chat.name.toLowerCase().includes(lowerSearch) ||
        chat.company.toLowerCase().includes(lowerSearch)
      );
    });
    setFilteredChatList(nameFilteredChatList);
  }, [searchInput]);

  function handleCheckAll(state: boolean) {
    if (state) {
      setChatListToTransmitMessage(
        Object.values(filteredChatList).map((chat) => chat.receiverid)
      );
    } else {
      setChatListToTransmitMessage([]);
    }
  }

  return (
    <S.Modal className={isDarkTheme ? darkTheme : ''}>
      <S.ModalBackground />
      <S.Container>
        <S.CloseModalButton
          disabled={sending}
          onClick={() => {
            dispatch(
              toggleUserInterfaceProp({ showTransmissionMessageModal: false })
            );
          }}
        >
          <Cross2Icon />
        </S.CloseModalButton>

        <S.ModalTitle>{'Transmissão de Mensagem'}</S.ModalTitle>
        <S.Content>
          <S.TransmissionChatsContainer>
            <S.SearchContainer>
              <S.SearchArea>
                <MagnifyingGlassIcon />
                <S.SearchInput
                  value={searchInput}
                  placeholder={'Buscar mensagem'}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </S.SearchArea>
            </S.SearchContainer>

            <S.CheckboxWrapper>
              <S.Checkbox
                disabled={sending}
                name="checkbox"
                id="checkbox"
                type="checkbox"
                checked={
                  chatListToTransmitMessage.length ===
                    filteredChatList.length &&
                  chatListToTransmitMessage.length !== 0
                }
                onChange={(e) => handleCheckAll(e.target.checked)}
              />
              <S.Label disabled={sending} htmlFor="checkbox">
                Selecionar Todos
              </S.Label>
            </S.CheckboxWrapper>

            <S.TransmissionChats>
              {filteredChatList.map((chat) => (
                <TransmissionMessageChatElement
                  setChatListToTransmitMessage={setChatListToTransmitMessage}
                  chatListToTransmitMessage={chatListToTransmitMessage}
                  key={chat.id}
                  disabled={sending}
                  {...chat}
                />
              ))}
            </S.TransmissionChats>
          </S.TransmissionChatsContainer>
          <S.TransmissionMessageContainer>
            <TransmissionMessageVisualizer
              forwardedMessageFile={forwardedMessageFile}
              setSending={setSending}
              forwardedMessage={forwardedMessage}
              chatListToTransmitMessage={chatListToTransmitMessage}
              disabled={sending}
            />
          </S.TransmissionMessageContainer>
        </S.Content>
      </S.Container>
    </S.Modal>
  );
}
