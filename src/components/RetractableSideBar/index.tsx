import { ArrowLeftIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleUserInterfaceProp } from '../../reducers/UserInterface.reducer';
import { UserInterface } from '../../types';
import RoundButton from '../RoundButton';
import * as S from './styles';

interface RetractableSideBarProps {
    active: boolean;
    headerName: string;
    showFalse: Partial<UserInterface>;
    children: JSX.Element;
}

export default function RetractableSideBar(props: RetractableSideBarProps) {
    const { active, headerName, showFalse, children } = props;
    const dispatch = useDispatch();
    return (
        <S.Container id="retractable-sidebar" active={active}>
            <S.Header>
                <RoundButton
                    color={'slate'}
                    onClick={() => dispatch(toggleUserInterfaceProp(showFalse))}
                >
                    <ArrowLeftIcon />
                </RoundButton>
                <S.HeaderTitle>{headerName}</S.HeaderTitle>
            </S.Header>
            {children}
        </S.Container>
    );
}
