import CryptoJS from 'crypto-js'
import { useDispatch, useSelector } from 'react-redux';
import { useIsMounted } from 'usehooks-ts';

import { RootState, clearMessageList, updateSearchMessageIndex } from '../../../reducers';
import { useFetchMessages } from '../../../services/api';
import { SECRET } from '../../../services/config';
import { ReferenceContainer, ReferenceText } from './MessageReference.styles'

interface MessageReferenceProps {
  reference: number;
  objmessage: { body: string }
  userIsAuthor: boolean
}

export function MessageReference({ objmessage, reference, userIsAuthor }: MessageReferenceProps) {

  const bytes = CryptoJS.AES.decrypt(objmessage.body, SECRET);
  const decryptedBody: string = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const dispatch = useDispatch()
  const currentChatId = useSelector((state: RootState) => state.CurrentChat.currentChatId)
  const { handleFetchMessages } = useFetchMessages();
  const isMounted = useIsMounted()


  async function fetchSearchMessage(index: number) {
    dispatch(updateSearchMessageIndex(index))
    if (currentChatId && isMounted()) {
      dispatch(clearMessageList({ receiverid: currentChatId }))
      const { FetchMessageFailed } =
        await handleFetchMessages(
          currentChatId,
          'searchMessage',
          {
            indexmessage: index,
            upwards: false,
            search: true
          }
        );

    }
  }

  return (
    <ReferenceContainer onClick={() => fetchSearchMessage(reference)} userIsAuthor={userIsAuthor}>
      <ReferenceText>{decryptedBody}</ReferenceText>
    </ReferenceContainer>
  );
}
