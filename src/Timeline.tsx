import { FC } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

import { Rows, Pad, Color, Columns, TweetButton } from './style';

const TimelineContainer = styled.div`
  flex: 0.4;
  min-width: fit-content;
  width: 100%;
  border-right: 1px solid ${Color.twitterBackground};
  overflow-y: scroll;

  -ms-overflow-style: none; /** Hide IE & Edge scrollbar */
  scrollbar-width: none; /** Hide Firefox scrollbar */

  /** Hide Chrome, Safari, & Opera scrollbars */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sticky = styled.div`
  padding: ${Pad.Medium};
  width: 100%;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${Color.twitterBackground};
`;

export const Timeline: FC = () => {
  return (
    <TimelineContainer>
      <Sticky>
        <h3>Home</h3>
      </Sticky>
      <Tweet />
    </TimelineContainer>
  );
};

// Tweet

const TweetContainer = styled(Columns)`
  padding: ${Pad.Medium};
`;

const TweetInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  font-size: 1.15em;
  border: 0;
  border-bottom: 1px solid ${Color.twitterBackground};
  outline: none; /** Twitter does it! */
  padding: ${Pad.Medium} ${Pad.Small};
  height: fit-content;
  width: 100%;
`;

const StyledAvatar = styled(Avatar).attrs(() => ({
  src:
    'https://lh3.googleusercontent.com/a-/AOh14GiL7j8zjljc1x01-ho0vMwqj_P_SqdmpQVOhqOl=s96-c',
  alt: '',
}))`
  height: ${(props: { size?: number }) =>
    props.size ? `${props.size}px` : '50px'};
  width: ${(props: { size?: number }) =>
    props.size ? `${props.size}px` : '50px'};
  object-fit: contain;
`;

const TimelineTweetButton = styled(TweetButton)`
  align-self: flex-end;
  width: min-content;
  padding: 0 ${Pad.Large};
`;

const Tweet: FC = () => {
  return (
    <TweetContainer as="form">
      <Rows pad={Pad.Medium}>
        <StyledAvatar />
        <TweetInput placeholder="What's happening?" />
      </Rows>
      <TimelineTweetButton>Tweet</TimelineTweetButton>
    </TweetContainer>
  );
};
