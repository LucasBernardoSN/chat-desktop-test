import React from 'react';
import { useSelector } from 'react-redux';

import app from '../../../package.json';
import { RootState } from '../../reducers';
import * as S from './styles';

export default function ChatHome() {
  const { isUpdatedVersion } = useSelector((state: RootState) => state.User);

  return (
    <S.HomeContainer>
      <S.HomeText>EroSoft Chat</S.HomeText>
      <S.HomeText textType={'subtitle'}>Seja Bem Vindo!</S.HomeText>
      {isUpdatedVersion ? (
        <S.NewVersionContent>
          <S.NewVersionTitle>
            NOVA VERSÃO LANÇADA: v{app.version}
          </S.NewVersionTitle>
          <h3 style={{ margin: 10 }}>Atualizações dessa versão: </h3>
          <ul>
            <li>Adicionada a funcionalidade de enviar mensagens em massa.</li>
            <li>Adicionada a funcionalidade de encaminhar uma mensagem.</li>
            <li>Adicionada a funcionalidade de apagar uma mensagem.</li>
            <li>
              Adicionada a funcionalidade de adicionar emojis nas mensagens.
            </li>
            <li>
              Adicionada a visualização das etapas de carregamento na tela
              inicial.
            </li>
          </ul>
          <S.ContainerFigure>
            <S.Logo src={'./images/erochat_logo.png'} />
          </S.ContainerFigure>
        </S.NewVersionContent>
      ) : (
        <S.ContainerFigure>
          <S.LoginFigure src={'./images/svg/login_figure.svg'} />
        </S.ContainerFigure>
      )}
    </S.HomeContainer>
  );
}
