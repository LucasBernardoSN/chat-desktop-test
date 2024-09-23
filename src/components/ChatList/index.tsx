import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useCreateContactElement from '../../hooks/useCreateContactElement';
import { RootState, setContactList } from '../../reducers';
import { useApi, useHasNetworkConnection } from '../../services/api';
import { ChatElement, ContactElement } from '../../types';
import ContactListElement from '../ContactList/ContactListElement';
import ChatListElement from './ChatListElement';
import * as S from './styles';

export type ChatListProps = {
  searchInput: string;
};

function ChatList({ searchInput }: ChatListProps) {
  const dispatch = useDispatch();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const { handleFetchContactList } = useApi();
  const { createContactElement } = useCreateContactElement();

  const currentChatList = useSelector((state: RootState) => state.ChatList);
  const { usertype } = useSelector((state: RootState) => state.User);
  const currentContactList = useSelector(
    (state: RootState) => state.ContactList
  );

  const [filteredChatList, setFilteredChatList] = useState<Array<ChatElement>>(
    []
  );
  const [filteredContactList, setFilteredContactList] = useState<
    Array<ContactElement>
  >([]);

  useEffect(() => {
    async function fetchContactList() {
      if (await checkConnectionWithServer()) {
        const { failed, data } = await handleFetchContactList();
        if (failed === false) {
          for (const contact of data) {
            dispatch(setContactList(await createContactElement(contact)));
          }
        }
      }
    }

    fetchContactList();
  }, []);

  useEffect(() => {
    const lowerSearch = searchInput.toLowerCase();

    const chatList = Object.values(currentChatList);

    const contactList = Object.values(currentContactList);
    chatList.sort((first, second) => {
      if (first.lastmessagedate === undefined) {
        return -1;
      }
      if (second.lastmessagedate === undefined) {
        return -1;
      }
      if (new Date(first.lastmessagedate) < new Date(second.lastmessagedate)) {
        return 1;
      } else {
        return -1;
      }
    });
    let chatListNullMessages: string[] = [];
    let clientChatListNames: string[] = [];

    chatList.forEach((chat) => {
      if (chat.lastmessage !== null) {
        chatListNullMessages.push(chat.name);
      }
      clientChatListNames.push(chat.name);
    });

    if (usertype === 'cliente') {
      const nameFilteredChatList = chatList.filter((chat) => {
        return (
          chat.name.toLowerCase().includes(lowerSearch) ||
          chat.company.toLowerCase().includes(lowerSearch)
        );
      });

      const newFilteredContactList = contactList.filter((contact) => {
        if (
          !clientChatListNames.includes(contact.name) &&
          (contact.name.toLowerCase().includes(lowerSearch) ||
            contact.company.toLowerCase().includes(lowerSearch))
        ) {
          return contact;
        }
      });

      setFilteredChatList(nameFilteredChatList);
      setFilteredContactList(newFilteredContactList);
    } else {
      const nullFilteredChatList = chatList.filter((chat) => {
        return chat.lastmessage !== null;
      });

      const nameFilteredChatList = nullFilteredChatList.filter((chat) => {
        return (
          chat.name.toLowerCase().includes(lowerSearch) ||
          chat.company.toLowerCase().includes(lowerSearch)
        );
      });

      const newFilteredContactList = contactList.filter((contact) => {
        if (
          !chatListNullMessages.includes(contact.name) &&
          (contact.name.toLowerCase().includes(lowerSearch) ||
            contact.company.toLowerCase().includes(lowerSearch))
        ) {
          return contact;
        }
      });

      setFilteredChatList(nameFilteredChatList);
      setFilteredContactList(newFilteredContactList);
    }
  }, [currentChatList, searchInput, currentContactList]);

  return (
    <S.ChatList id="contact-list">
      {searchInput.trim() !== '' && (
        <React.Fragment>
          <S.Title>Conversas</S.Title>
          {!filteredChatList.length && (
            <S.Text>Nenhuma conversa ou contato foi encontrado!</S.Text>
          )}
        </React.Fragment>
      )}

      {filteredChatList.map((chatListItem) => {
        return (
          <React.Fragment key={chatListItem.id}>
            <ChatListElement {...chatListItem} />
          </React.Fragment>
        );
      })}

      {searchInput.trim() !== '' && (
        <React.Fragment>
          <S.Title>Novos Contatos</S.Title>
          {!filteredContactList.length && (
            <S.Text>Nenhuma conversa ou contato foi encontrado!</S.Text>
          )}
          {filteredContactList.map((contactListItem) => {
            return (
              <React.Fragment key={contactListItem.id}>
                <ContactListElement {...contactListItem} />
              </React.Fragment>
            );
          })}
        </React.Fragment>
      )}
    </S.ChatList>
  );
}
export default memo(ChatList);
