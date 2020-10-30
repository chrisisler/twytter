import { FC } from 'react';
import styled from 'styled-components';
import {
  VerifiedUser,
  ChatBubbleOutline,
  Repeat,
  FavoriteBorder,
  Publish,
} from '@material-ui/icons';

import { Columns, Rows, UserAvatar, Pad, Color } from './style';
import { Tweet } from './interfaces';

const TweetContainer = styled(Rows)`
  padding: ${Pad.Medium};
  border-bottom: 1px solid ${Color.twitterBackground};
`;

const Verified = styled(VerifiedUser)`
  color: ${Color.twitterBlue};
  font-size: 1.2em !important;
`;

const AuthorName = styled.h4`
  font-size: 0.95em;
`;

const TweetText = styled.p`
  font-size: 0.95em;
`;

const GrayText = styled.span`
  font-weight: 600;
  font-size: 0.8em;
  color: ${Color.darkGray};
`;

const Footer = styled(Rows).attrs(() => ({
  between: true,
}))`
  margin-top: ${Pad.Small};
  color: ${Color.darkGray};
  width: 80%;
`;

export const TweetView: FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <TweetContainer pad={Pad.Medium}>
      <UserAvatar src={tweet.authorImage} alt="" size={40} />
      <Columns pad={Pad.XSmall} maxWidth>
        <Rows pad={Pad.Small} center>
          <AuthorName>{tweet.authorName}</AuthorName>
          <Verified />
          <GrayText>@chrisisler</GrayText>
        </Rows>
        <TweetText>{tweet.text}</TweetText>
        <Footer>
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <Publish fontSize="small" />
        </Footer>
      </Columns>
    </TweetContainer>
  );
};
