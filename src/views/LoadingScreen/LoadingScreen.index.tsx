import {
  CheckCircledIcon,
  CrossCircledIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { darkTheme } from '../../stitches.config';
import { AnimatedDots, AnimatedDotsContainer } from '../../styles/LoadingDots';
import * as S from './LoadingScreen.styles';

export type ConnectedProps = {
  display: string;
  value: 'ok' | 'error' | 'loading';
  id: number;
};

interface LoadingScreenProps {
  connectionStages: ConnectedProps[];
}

export default function LoadingScreen({
  connectionStages,
}: LoadingScreenProps) {
  const { isDarkTheme } = useSelector((state: RootState) => state.Theme);

  return (
    <S.LoadingScreenWindow className={isDarkTheme ? darkTheme : ''}>
      <S.CardsContainer>
        <S.Image src={'./images/erochat_logo.png'} />
        <AnimatedDotsContainer curved>
          {[...Array(7).keys()].map((item, index) => (
            <AnimatedDots key={index} color={'grass'} />
          ))}
        </AnimatedDotsContainer>
        <S.Image src={'./images/pc_figure.png'} />
      </S.CardsContainer>
      <S.Text style={{ margin: 20 }}>
        EroChat está se conectando ao servidor!
      </S.Text>
      <S.ConectionStagesContainer>
        {connectionStages.map(({ display, value }) => (
          <React.Fragment key={display}>
            <S.Text textAlign={'left'}>{display}</S.Text>
            <S.Text textAlign={'right'}>
              {value === 'ok' && <CheckCircledIcon id="ok" />}
              {value === 'error' && <CrossCircledIcon id="error" />}
              {value === 'loading' && <ReloadIcon id="update" />}
            </S.Text>
          </React.Fragment>
        ))}
      </S.ConectionStagesContainer>
    </S.LoadingScreenWindow>
  );
}
