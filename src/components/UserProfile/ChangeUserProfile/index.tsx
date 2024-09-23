import { Cross1Icon } from '@radix-ui/react-icons';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';

import { useAlerts, useGetCroppedImg } from '../../../hooks';
import {
  RootState,
  toggleUserInterfaceProp,
  updateUserImageProfile,
} from '../../../reducers';
import { useApi } from '../../../services/api';
import { FlexWrapper } from '../../../styles/FlexWrapper';
import { ModalBackground } from '../../../styles/ModalBackground';
import { Text } from '../../../styles/Text';
import {
  FORMATO_DE_IMAGEM_INVALIDO,
  FOTO_MUITO_PEQUENA,
  formatFileType,
} from '../../../utils';
import * as S from './styles';

export default function ChangeUserProfile() {
  const dispatch = useDispatch();
  const { showProfileImageChangeModal } = useSelector(
    (state: RootState) => state.UserInterface
  );
  const { getCroppedImg, createImage } = useGetCroppedImg();
  const { handleUpdateProfileImage } = useApi();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>();
  const [zoom, setZoom] = useState(1);
  const [imageLocalURL, setImageLocalURL] = useState('');
  const [showCropped, setShowCropped] = useState(false);
  const { displayAlert } = useAlerts();

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  async function dataUrlToFile(
    dataUrl: string,
    fileName: string
  ): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  }

  const sendProfileImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageLocalURL,
        croppedAreaPixels as Area
      );
      if (croppedImage) {
        const { urlProfileImage } = croppedImage;

        const newUserProfileImage = await dataUrlToFile(
          urlProfileImage,
          'userProfileImage'
        );

        const { failed } = await handleUpdateProfileImage(
          newUserProfileImage
        );

        if (failed) {
          displayAlert(
            'Erro: Não foi possível trocar a foto de perfil, tente mais tarde!',
            'chat-alert-trigger'
          );
        } else {
          dispatch(
            updateUserImageProfile({
              localTempUserImage: urlProfileImage,
            })
          );
          exitChangeUserProfile();
        }
      }
    } catch (erro) {
      // console.error(erro);
      alert('Erro Inesperado!');
    }
  }, [croppedAreaPixels, getCroppedImg, showCropped, imageLocalURL]);

  function exitChangeUserProfile() {
    setImageLocalURL('');
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setShowCropped(false);
    dispatch(
      toggleUserInterfaceProp({ showProfileImageChangeModal: false })
    );
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const fileExtension = acceptedFiles[0].name.substring(
      acceptedFiles[0].name.lastIndexOf('.') + 1
    );
    if (formatFileType(fileExtension) === 'thumb') {
      setImageLocalURL(URL.createObjectURL(acceptedFiles[0]));
      const newImage = await createImage(
        URL.createObjectURL(acceptedFiles[0])
      );

      if (newImage.width > 96 && newImage.height > 96) {
        setShowCropped(true);
      } else {
        displayAlert(FOTO_MUITO_PEQUENA, 'chat-alert-trigger');
      }
    } else {
      displayAlert(FORMATO_DE_IMAGEM_INVALIDO, 'chat-alert-trigger');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  return (
    <>
      {showProfileImageChangeModal && (
        <S.Container>
          <>
            {!showCropped && (
              <>
                <S.DragAndDropContainer>
                  <S.CloseModalButton
                    onClick={exitChangeUserProfile}
                  >
                    <Cross1Icon />
                  </S.CloseModalButton>
                  <S.DragContent {...getRootProps()}>
                    <input {...getInputProps()} />
                    Clique ou solte a imagem aqui...
                  </S.DragContent>
                </S.DragAndDropContainer>
              </>
            )}

            {showCropped && (
              <S.Container id="changeuserprofile-container">
                <ModalBackground id="modal-background" />
                <S.Content id="changeuserprofile-content">
                  <S.CropperWrapper>
                    <Cropper
                      image={imageLocalURL}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      style={{
                        containerStyle: {
                          borderRadius: 20,
                        },
                      }}
                    />
                  </S.CropperWrapper>
                  <S.CrontrollerContainer>
                    <FlexWrapper css={{ gap: 5 }}>
                      <Text>Zoom: </Text>
                      <FlexWrapper css={{ width: 50 }}>
                        <Text>
                          {(
                            (zoom - 1) *
                            100
                          ).toFixed() + '%'}
                        </Text>
                      </FlexWrapper>

                      <S.StyledSlider
                        defaultValue={[1]}
                        max={3}
                        min={1}
                        value={[zoom]}
                        step={0.01}
                        aria-label="Zoom"
                        onValueChange={(z) => {
                          setZoom(z[0]);
                        }}
                      >
                        <S.StyledTrack>
                          <S.StyledRange />
                        </S.StyledTrack>
                        <S.StyledThumb />
                      </S.StyledSlider>
                    </FlexWrapper>
                    <FlexWrapper css={{ gap: 20 }}>
                      <S.Button
                        color={'ok'}
                        onClick={sendProfileImage}
                      >
                        Enviar
                      </S.Button>
                      <S.Button
                        color={'cancel'}
                        onClick={exitChangeUserProfile}
                      >
                        Cancelar
                      </S.Button>
                    </FlexWrapper>
                  </S.CrontrollerContainer>
                </S.Content>
              </S.Container>
            )}
          </>
        </S.Container>
      )}
    </>
  );
}
