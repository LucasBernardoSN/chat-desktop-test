import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  clearMessageList,
  toggleUserInterfaceProp,
  updateSearchMessage,
  updateSearchMessageIndex,
} from '../../reducers';
import { useApi, useFetchMessages } from '../../services/api';
import { SECRET } from '../../services/config';
import { darkTheme } from '../../stitches.config';
import { Loading } from '../../styles/Loading';
import { formatDate } from '../../utils';
import * as S from './styles';

interface RetractableSideBarProps {
  headerName: string;
}

export type SearchedMessages = {
  body: 'string';
  index: number;
  datemessage: string;
};

export default function RetractableRightSideBar(
  props: RetractableSideBarProps
) {
  const { handleFetchMessages } = useFetchMessages();
  const dispatch = useDispatch();
  const { handleFetchSearchMessages } = useApi();
  const [searchInput, setSearchInput] = useState<string>('');
  const { currentChatId } = useSelector(
    (state: RootState) => state.CurrentChat
  );
  const [searchedMessages, setSearchedMessages] = useState<SearchedMessages[]>(
    []
  );
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function handleSearchMessage() {
      if (currentChatId) {
        const { data, failed } = await handleFetchSearchMessages(
          currentChatId,
          searchInput
        );
        if (failed) {
          alert('Erro: Pesquisa falhou!!');
        } else {
          if (data) {
            const decryptedList = data?.map((message) => {
              const bytes = CryptoJS.AES.decrypt(message.body, SECRET);
              const decryptedBody = JSON.parse(
                bytes.toString(CryptoJS.enc.Utf8)
              );
              return { ...message, body: decryptedBody };
            });
            setSearchedMessages(decryptedList);
          } else {
            setSearchedMessages([]);
          }

          dispatch(updateSearchMessage(searchInput));
        }
        setLoading(false);
      }
    }

    setLoading(true);
    const search = setTimeout(() => {
      handleSearchMessage();
    }, 1000);

    return () => {
      clearTimeout(search);
    };
  }, [searchInput]);

  async function fetchSearchMessage(index: number) {
    dispatch(updateSearchMessageIndex(index));
    if (currentChatId) {
      dispatch(clearMessageList({ receiverid: currentChatId }));
      const { FetchMessageFailed } = await handleFetchMessages(
        currentChatId,
        'searchMessage',
        {
          indexmessage: index,
          upwards: false,
          search: true,
        }
      );
    }
  }

  const { headerName } = props;
  return (
    <S.Container
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={isDarkTheme ? darkTheme : ''}
      id="retractable-sidebar"
    >
      <S.Header>
        <S.HeaderTitle>{headerName}</S.HeaderTitle>
      </S.Header>
      <S.SearchContainer>
        <S.SearchArea id="search-area">
          <MagnifyingGlassIcon />
          <S.SearchInput
            value={searchInput}
            placeholder={'Buscar mensagem'}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </S.SearchArea>
      </S.SearchContainer>
      <S.MessagesContainer>
        {loading && (
          <Loading speed={'s2'} style={{ margin: 'auto', marginTop: 20 }} />
        )}

        {searchInput !== '' && searchedMessages.length === 0 && !loading && (
          <div
            style={{
              color: isDarkTheme ? '#f9f8f9' : 'black',
              marginTop: 20,
              width: '100%',
              textAlign: 'center',
            }}
          >
            Nenhuma mensagem encontrada!
          </div>
        )}
        {!loading &&
          searchedMessages.map(({ index, body, datemessage }) => (
            <S.Message
              key={index}
              onClick={() => {
                fetchSearchMessage(index);
              }}
            >
              <S.TextMessage
                style={{ color: isDarkTheme ? '#f9f8f9' : 'black' }}
              >
                <S.DateMessage>
                  {`${formatDate(datemessage, true)}: `}
                </S.DateMessage>
                {body}
              </S.TextMessage>
            </S.Message>
          ))}
      </S.MessagesContainer>
    </S.Container>
  );
}
