import { Cross1Icon, DownloadIcon } from '@radix-ui/react-icons';
import React, { memo, useEffect, useRef, useState } from 'react';

import { useDownloadFile } from '../../../services/api';
import { Loading } from '../../../styles/Loading';
import * as S from './ImageModal.styles';

export type ImageModalProps = {
  mainLink: string;
  setShowMessageImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SCALE = 2;

export function ImageModal(props: ImageModalProps) {
  const { mainLink, setShowMessageImageModal } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const { downloadFile, downloadInfo } = useDownloadFile();

  const [isDownloading, setIsDownloading] = useState(false);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setIsDownloading(downloadInfo.completed);
  }, [downloadInfo.completed]);

  function handleMouseMoveEvent(
    mouseMoveEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    let pageX = mouseMoveEvent.pageX;
    let pageY = mouseMoveEvent.pageY;

    let x0 = window.innerWidth / 2;
    let y0 = window.innerHeight / 2;

    if (imageRef.current) {
      if (imageRef.current.clientWidth * SCALE > window.innerWidth) {
        setMoveX(pageX - x0);
      } else {
        setMoveX(0);
      }
      if (imageRef.current.clientHeight * SCALE > window.innerHeight) {
        setMoveY(pageY - y0);
      } else {
        setMoveY(0);
      }
    }
  }

  return (
    <S.ImageModalContainer id="image-modal">
      <S.ModalBackground id="modal-background" />

      <S.Content
        cursor={zoom}
        onMouseMove={(mouseMoveEvent) => handleMouseMoveEvent(mouseMoveEvent)}
      >
        <S.ButtonsArea>
          {!zoom && (
            <>
              {!isDownloading ? (
                <S.ModalButton>
                  <DownloadIcon
                    onClick={() => {
                      downloadFile(mainLink);
                      setIsDownloading(true);
                    }}
                  />
                </S.ModalButton>
              ) : (
                <Loading />
              )}
              <S.ModalButton onClick={() => setShowMessageImageModal(false)}>
                <Cross1Icon />
              </S.ModalButton>
            </>
          )}
        </S.ButtonsArea>
        <S.ModalImage
          ref={imageRef}
          onClick={() => setZoom(!zoom)}
          cursor={zoom}
          style={{
            transform: zoom
              ? `scale(${SCALE})
								translate3d(
								${-moveX}px,
								${-moveY}px,
								0px)`
              : 'translate3d(0px,0px,0px)',
          }}
          alt="img"
          src={mainLink}
        />
      </S.Content>
    </S.ImageModalContainer>
  );
}
