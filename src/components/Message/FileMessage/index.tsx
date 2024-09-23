import 'react-circular-progressbar/dist/styles.css';

import { DownloadIcon } from '@radix-ui/react-icons';
import React, { memo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { useDownloadFile } from '../../../services/api';
import * as S from './styles';

export type FileMessageProps = {
    mainLink: string;
    fileName: string;
    fileType: string;
    userIsAuthor: boolean;
};

function FileMessage({
    fileName,
    fileType,
    mainLink,
    userIsAuthor,
}: FileMessageProps) {
    const { downloadFile, downloadInfo, istDowloading } = useDownloadFile();

    return (
        <S.FileMEssageContainer
            onClick={() => downloadFile(mainLink, fileName)}
            style={{
                pointerEvents: istDowloading ? 'none' : 'auto',
            }}
            userIsAuthor={userIsAuthor}
        >
            <S.FlexWrapper>
                <S.FileIcon src={`./images/svg/${fileType}.svg`} />
                <S.FileMessage>{fileName}</S.FileMessage>
            </S.FlexWrapper>

            <S.IconWrapper>
                {istDowloading ? (
                    <S.DownloadProgressContainer>
                        <CircularProgressbar
                            value={downloadInfo.progress}
                            text={`${downloadInfo.progress}%`}
                            styles={buildStyles({
                                textSize: '1.5rem',
                                textColor: '#ffffff',
                                trailColor: '#ffffff',
                                pathColor:
                                    userIsAuthor === true
                                        ? '#4c5155'
                                        : '#2f6e3b',
                                backgroundColor:
                                    userIsAuthor === true
                                        ? '#4c5155'
                                        : '#2f6e3b',
                            })}
                        />
                    </S.DownloadProgressContainer>
                ) : (
                    <DownloadIcon />
                )}
            </S.IconWrapper>
        </S.FileMEssageContainer>
    );
}

export default memo(FileMessage);
