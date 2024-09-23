import { IdCardIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { encode as base64EncodeR } from 'base-64';
import jwt_decode from 'jwt-decode';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAlerts } from '../../hooks';
import {
    RootState,
    setAuth,
    setPersistedCredentials,
    setUser,
} from '../../reducers';
import { useApi } from '../../services/api';
import { PROFILE_IMAGE_URL } from '../../services/config';
import { darkTheme } from '../../stitches.config';
import {
    AlertButton,
    AlertContent,
    AlertDialog,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertPortal,
    Flex,
    Overlay,
} from '../../styles/AlertDialog';
import { Loading } from '../../styles/Loading';
import { HTTP_CODES, HttpCodes } from '../../utils/constants/HttpCodes';
import * as S from './styles';

export default function Login() {
    const dispatch = useDispatch();
    const { handleUserLogin } = useApi();
    const { displayAlert } = useAlerts();
    const { isDarkTheme } = useSelector((state: RootState) => state.Theme);
    const { persistedName, persistedDocument, persistedPassword } = useSelector(
        (state: RootState) => state.User
    );
    const { alertText } = useSelector(
        (state: RootState) => state.UserInterface
    );

    const [document, setDocument] = useState<string>(persistedDocument);
    const [password, setPassword] = useState<string>(persistedPassword);
    const [name, setName] = useState<string>(persistedName);

    const [documentIsFocused, setDocumentIsFocused] = useState<boolean>(
        persistedDocument ? true : false
    );
    const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(
        persistedPassword ? true : false
    );
    const [nameIsFocused, setNameIsFocused] = useState<boolean>(
        persistedName ? true : false
    );

    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
    const [loginErrorStatus, setLoginErrorStatus] = useState<HttpCodes>(
        HTTP_CODES.UNKNOWN
    );

    function handleDocumentInput(event: string) {
        let text = event;
        for (let index = 0; index < text.length; index++) {
            text = text.replace('.', '');
            text = text.replace(':', '');
            text = text.replace(',', '');
            text = text.replace(';', '');
            text = text.replace('/', '');
            text = text.replace('-', '');
        }
        setDocument(text);
    }

    function handleEnterInput(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    async function handleLogin() {
        setLoginErrorStatus(HTTP_CODES.UNKNOWN);

        if (!name) {
            displayAlert('O Nome é Necessário!', 'login-alert-trigger');
        } else if (!document) {
            displayAlert(
                'O CNPJ da Empresa é Necessário!',
                'login-alert-trigger'
            );
        } else if (!password) {
            displayAlert('A Senha é Necessária!', 'login-alert-trigger');
        } else {
            setIsLoginLoading(true);

            const credentialsBase64 = base64EncodeR(
                `{"login":"${name}","senha":"${password}","cnpj":"${document}","software":"ChatEroSoft"}`
            );
            const { data, failed, status } = await handleUserLogin(
                credentialsBase64
            );

            if (failed) {
                setLoginErrorStatus(status as HttpCodes);
                setIsLoginLoading(false);
            } else {
                const userData: any = jwt_decode(data.token);
                dispatch(
                    setUser({
                        ...userData,
                    })
                );
                dispatch(
                    setPersistedCredentials({
                        persistedName: name,
                        persistedDocument: document,
                        persistedPassword: password,
                    })
                );
                dispatch(setAuth({ token: data.token, isLogged: true }));
            }
        }
    }

    return (
        <S.LoginWindow
            onKeyPress={(event) => handleEnterInput(event)}
            className={isDarkTheme ? darkTheme : ''}
        >
            <AlertDialog>
                <AlertDialogTrigger id="login-alert-trigger" />
                <AlertPortal>
                    <Overlay />
                    <Flex className={isDarkTheme ? darkTheme : ''}>
                        <AlertContent>
                            <AlertDialogDescription>
                                {alertText}
                            </AlertDialogDescription>
                            <AlertDialogCancel asChild>
                                <AlertButton>OK</AlertButton>
                            </AlertDialogCancel>
                        </AlertContent>
                    </Flex>
                </AlertPortal>
            </AlertDialog>

            <S.Wave src={'./images/wave_figure.png'} />

            <S.ContainerFigure>
                <S.LoginFigure src={'./images/svg/login_figure.svg'} />
            </S.ContainerFigure>

            <S.LoginContainer>
                <S.ErosoftLogo src={'./images/erochat_logo.png'} />

                <S.LoginTitle>Bem Vindo!</S.LoginTitle>

                <S.InputWrapper
                    focus={nameIsFocused}
                    onFocus={() => setNameIsFocused(true)}
                    onBlur={() =>
                        name === ''
                            ? setNameIsFocused(false)
                            : setNameIsFocused(true)
                    }
                >
                    <S.LoginInputIcon>
                        <PersonIcon
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </S.LoginInputIcon>

                    <S.InputContainer>
                        <S.InputTitle>Nome</S.InputTitle>
                        <S.LoginInput
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                            type={'text'}
                        />
                    </S.InputContainer>
                </S.InputWrapper>

                <S.InputWrapper
                    focus={documentIsFocused}
                    onFocus={() => setDocumentIsFocused(true)}
                    onBlur={() =>
                        document === ''
                            ? setDocumentIsFocused(false)
                            : setDocumentIsFocused(true)
                    }
                >
                    <S.LoginInputIcon>
                        <IdCardIcon
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </S.LoginInputIcon>

                    <S.InputContainer>
                        <S.InputTitle>CNPJ Empresa</S.InputTitle>
                        <S.LoginInput
                            maxLength={20}
                            value={document}
                            onChange={(event) =>
                                handleDocumentInput(event.target.value)
                            }
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            type={'tel'}
                            pattern="^-?[0-9]\d*\.?\d*$"
                        />
                    </S.InputContainer>
                </S.InputWrapper>

                <S.InputWrapper
                    focus={passwordIsFocused}
                    onFocus={() => setPasswordIsFocused(true)}
                    onBlur={() =>
                        password === ''
                            ? setPasswordIsFocused(false)
                            : setPasswordIsFocused(true)
                    }
                >
                    <S.LoginInputIcon id="input-icon">
                        <LockClosedIcon
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </S.LoginInputIcon>

                    <S.InputContainer>
                        <S.InputTitle>Senha</S.InputTitle>
                        <S.LoginInput
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                            type={'password'}
                        />
                    </S.InputContainer>
                </S.InputWrapper>

                <S.LoginContainerFooter>
                    {isLoginLoading && <Loading speed={'s1'} />}

                    {!isLoginLoading && (
                        <>
                            <S.LoginButton onClick={() => handleLogin()}>
                                Login
                            </S.LoginButton>
                            {loginErrorStatus === HTTP_CODES.UNAUTHORIZED && (
                                <S.ErroLogin>
                                    Credenciais de login incorretas!
                                </S.ErroLogin>
                            )}
                            {loginErrorStatus ===
                                HTTP_CODES.INTERNAL_SERVER_ERROR && (
                                <S.ErroLogin>
                                    Falha no servidor, tente mais tarde!
                                </S.ErroLogin>
                            )}
                            {loginErrorStatus === HTTP_CODES.NETWORK_ERROR && (
                                <S.ErroLogin>
                                    Falha na conexão com a Internet!
                                </S.ErroLogin>
                            )}
                            {loginErrorStatus === undefined && (
                                <S.ErroLogin>
                                    Algum erro inesperado ocorreu, tente mais
                                    tarde!
                                </S.ErroLogin>
                            )}
                        </>
                    )}
                </S.LoginContainerFooter>
            </S.LoginContainer>
        </S.LoginWindow>
    );
}
