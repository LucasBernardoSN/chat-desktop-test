import CryptoJS from 'crypto-js';
import { useState } from 'react';

import { SECRET } from '../../../services/config';
import { MessageElement } from '../../../types';
import { formatFileType, formatMessageType } from '../../../utils';
import * as S from './TransmissionMessage.styles'

export function TransmissionMessage({ body, typemessage, localTempFileURL }: MessageElement) {

  const [readMore, setReadMore] = useState(false);
  const messageType = formatMessageType(typemessage);

  return (
    <S.MessageLine  >
      <S.MessageContainer>

        {messageType === 'text' && (
          <S.TextMessage >
            {body.length > 300 && readMore === false ? (
              <div>
                {`${body.slice(0, 300)}...`}
                <S.ReadMoreButton onClick={() => setReadMore(true)}>
                  Ler mais
                </S.ReadMoreButton>
              </div>
            ) : (
              <div>
                {body}
                {readMore && (
                  <S.ReadMoreButton onClick={() => setReadMore(false)}>
                    Ler menos
                  </S.ReadMoreButton>
                )}
              </div>
            )}
          </S.TextMessage>
        )}

        {messageType === 'thumb' && (
          <S.ImageMessageContainer
          >
            <S.Image src={localTempFileURL} alt={body} />
          </S.ImageMessageContainer>
        )}

        {messageType === 'file' && (
          <S.FileMessageContainer >
            <S.FlexWrapper>
              <S.FileIcon src={`./images/svg/${formatFileType(typemessage)}.svg`} />
              <S.FileMessage>{body}</S.FileMessage>
            </S.FlexWrapper>
          </S.FileMessageContainer>
        )}
      </S.MessageContainer>
    </S.MessageLine>
  );
}
