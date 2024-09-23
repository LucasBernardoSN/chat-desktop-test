import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

import * as S from './SearchInput.styles';

export type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchInput(props: SearchInputProps) {
    const { onChange, value } = props;

    return (
        <S.SearchArea id="search-area">
            <MagnifyingGlassIcon />
            <S.SearchInput
                placeholder={'Procurar uma conversa...'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </S.SearchArea>
    );
}
