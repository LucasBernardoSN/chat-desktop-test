import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsMounted } from 'usehooks-ts';

import useCreateContactElement from '../../hooks/useCreateContactElement';
import { RootState, clearContactList, setContactList } from '../../reducers';
import { useApi, useHasNetworkConnection } from '../../services/api';
import { ContactElement } from '../../types';
import RetractableSideBar from '../RetractableSideBar';
import SearchInput from '../SearchInput/SearchInput.index';
import ContactListElement from './ContactListElement';
import * as S from './styles';

export default function ContactList() {
  const { showContactList } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const contactList = useSelector((state: RootState) => state.ContactList);

  const dispatch = useDispatch();
  const { createContactElement } = useCreateContactElement();
  const { checkConnectionWithServer } = useHasNetworkConnection();
  const { handleFetchContactList } = useApi();
  const isMounted = useIsMounted();

  const [filteredContacts, setFilteredContacts] = useState<ContactElement[]>(
    []
  );
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    async function fetchContactList() {
      if (await checkConnectionWithServer()) {
        const { failed, data } = await handleFetchContactList();
        if (failed === false) {
          dispatch(clearContactList());
          for (const contact of data) {
            dispatch(setContactList(await createContactElement(contact)));
          }
        }
      }
    }

    if (showContactList) {
      fetchContactList();
    }

    return () => {
      setTimeout(() => {
        isMounted() && setSearchInput('');
      }, 500);
    };
  }, [showContactList]);

  useEffect(() => {
    const lowerSearch = searchInput.toLowerCase();
    const newContactList = Object.values(contactList);

    const filtered = newContactList.filter((contact) => {
      if (contact.name.toLowerCase().includes(lowerSearch)) {
        return true;
      } else if (contact.appversion.toLowerCase().includes(lowerSearch)) {
        return true;
      } else if (contact.company.toLowerCase().includes(lowerSearch)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredContacts(filtered);
  }, [searchInput, contactList]);

  return (
    <RetractableSideBar
      headerName="Lista de Novos Contatos"
      active={showContactList}
      showFalse={{ showContactList: false }}
    >
      <React.Fragment>
        <S.SearchContainer>
          <SearchInput onChange={setSearchInput} value={searchInput} />
        </S.SearchContainer>
        <S.ContactListContainer id="contact-list">
          {!filteredContacts.length && (
            <S.Text>Nenhuma contato foi encontrado!</S.Text>
          )}
          {filteredContacts.map((contactListItem, index) => {
            return (
              <React.Fragment key={contactListItem.id}>
                <ContactListElement {...contactListItem} />
              </React.Fragment>
            );
          })}
        </S.ContactListContainer>
      </React.Fragment>
    </RetractableSideBar>
  );
}
