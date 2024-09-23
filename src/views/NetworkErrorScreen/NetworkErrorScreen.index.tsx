import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { darkTheme } from '../../stitches.config';
import { AnimatedDots, AnimatedDotsContainer } from '../../styles/LoadingDots';
import { Text } from '../../styles/Text';
import * as S from './NetworkErrorScreen.styles';

export default function NetworkErrorScreen() {
    const { isDarkTheme } = useSelector((state: RootState) => state.Theme);

    return (
        <S.Container className={isDarkTheme ? darkTheme : ''}>
            <S.NetworkErrorIcon>
                <ExclamationTriangleIcon />
            </S.NetworkErrorIcon>

            <Text size={'largetitle'} highcContrast>
                EroChat tentou se conectar ao servidor, mas ocorreu algum erro!
            </Text>
            <Text size={'largetitle'} highcContrast>
                Certifique-se de que você tem conexão com a internet.
            </Text>
            <Text size={'largetitle'} highcContrast>
                Tentando conectar novamente...
            </Text>

            <AnimatedDotsContainer>
                {[...Array(7).keys()].map((i, index) => (
                    <AnimatedDots key={index} color={'yellow'} />
                ))}
            </AnimatedDotsContainer>
        </S.Container>
    );
}
