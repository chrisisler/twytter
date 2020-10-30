import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export enum Color {
  twitterBlue = '#50b7f5',
  twitterBackground = '#e6ecf0',
  inactive = '#1da1f2',
  darkGray = '#657786',
}

export enum Pad {
  None = '0',
  XSmall = '0.25rem',
  Small = '0.5rem',
  Medium = '1rem',
  Large = '2rem',
  XLarge = '3rem',
}

interface Props {
  center?: boolean;
  padding?: Pad | string;
  between?: boolean;
  maxWidth?: boolean;
}

export const UserAvatar = styled(Avatar)`
  height: ${(props: { size?: number }) =>
    props.size ? `${props.size}px` : '50px'} !important;
  width: ${(props: { size?: number }) =>
    props.size ? `${props.size}px` : '50px'} !important;
  object-fit: contain;
`;

export const TweetButton = styled.button`
  background-color: ${Color.twitterBlue};
  color: #fff;
  border: 0;
  font-weight: 900;
  border-radius: 30px;
  min-height: 49px;
  cursor: pointer;
  max-width: 250px;
  user-select: none;
  font-size: 1em;
  margin-top: ${Pad.Small};
  transition: background-color 100ms ease;

  &:disabled {
    background-color: ${Color.inactive};
  }
`;

const Div = styled.div`
  width: ${({ maxWidth }: Props) => (maxWidth ? '100%' : 'auto')};
  align-items: ${({ center }: Props) => (center ? 'center' : 'initial')};
  padding: ${({ padding }: Props) => padding};
  justify-content: ${({ between }: Props) =>
    between ? 'space-between' : 'initial'};
`;

export const Columns = styled(Div)`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: ${(props: { pad?: Pad }) => props?.pad ?? Pad.None};
  }
`;

export const Rows = styled(Div)`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${(props: { pad?: Pad }) => props?.pad ?? Pad.None};
  }
`;
