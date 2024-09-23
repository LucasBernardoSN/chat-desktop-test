import React, { useEffect, useState } from 'react';

import * as S from './styles';

interface ProfileImageProps {
    clickable?: boolean;
    localTempUserImage?: string;
    name: string;
    profileImageUrl: string;
    size?: 'small' | 'large' | undefined;
}

export default function ProfileImage(props: ProfileImageProps) {
    const { name, clickable, size, profileImageUrl, localTempUserImage } =
        props;

    const [firstLetter, setFirstLetter] = useState<string>('');

    useEffect(() => {
        if (name) {
            let newName: string = name.toLowerCase();
            if (newName.includes('erosoft-')) {
                newName = newName.replace('erosoft-', '');
            }
            setFirstLetter(newName[0].toUpperCase());
        }
    }, [name]);

    return (
        <S.AvatarContainer>
            <S.Avatar clickable={clickable} size={size}>
                <S.ProfileImageImage
                    src={
                        localTempUserImage
                            ? localTempUserImage
                            : profileImageUrl
                    }
                />
                <S.ProfileImageFallback delayMs={500}>
                    {firstLetter}
                </S.ProfileImageFallback>
            </S.Avatar>
        </S.AvatarContainer>
    );
}
