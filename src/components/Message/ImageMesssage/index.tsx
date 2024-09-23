import 'react-circular-progressbar/dist/styles.css';

import React, { memo, useState } from 'react';

import * as S from './styles';

export type ImageMessageProps = {
  thumbImageLink: string;
  mainLink: string;
  fileName: string;
  fileType: string;
  userIsAuthor: boolean;
  setShowMessageImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function ImageMessage(props: ImageMessageProps) {
  const { mainLink, thumbImageLink, fileName } = props;

  return (
    <>
      <S.ImageMessageContainer
        onClick={() => props.setShowMessageImageModal(true)}
      >
        <S.Image src={thumbImageLink} alt={fileName} />
      </S.ImageMessageContainer>
    </>
  );
}

export default memo(ImageMessage);
