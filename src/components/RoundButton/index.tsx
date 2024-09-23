import React from 'react';

import * as S from './styles';

interface RoundButtonProps {
  children: JSX.Element;
  color: 'slate' | 'grass';
  fixed?: boolean;
  onClick?: (event: any) => any;
  scrollButton?: boolean;
  size?: 'large';
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function RoundButton(props: RoundButtonProps) {
  return <S.Container {...props}>{props.children}</S.Container>;
}
