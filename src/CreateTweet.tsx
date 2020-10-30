import styled from 'styled-components';
import { firestore } from 'firebase/app';
import { IconButton, CircularProgress } from '@material-ui/core';
import { FC, useRef, useState } from 'react';
import { ImageSearch } from '@material-ui/icons';

import { Columns, Pad, Color, TweetButton, Rows, UserAvatar } from './style';
import { db, DbPath } from './firebase';
import { Tweet } from './interfaces';

const maxTweetLength = 140;

const TweetContainer = styled(Columns)`
  padding: ${Pad.Medium};
  border-bottom: 9px solid ${Color.twitterBackground};
`;

const TweetInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  font-size: 1.2em;
  border: 0;
  outline: none; /** Twitter does it! */
  padding: ${Pad.Small} 0 ${Pad.Large} 0;
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid ${Color.twitterBackground};
`;

const TimelineTweetButton = styled(TweetButton)`
  width: min-content;
  padding: 0 ${Pad.Medium};
  min-height: 40px;
  font-size: 0.9em;
  margin: 0;
`;

export const CreateTweet: FC = () => {
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const [tweet, setTweet] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  return (
    <TweetContainer pad={Pad.Small}>
      <Rows pad={Pad.Medium}>
        <UserAvatar
          tabIndex={0}
          src="https://lh3.googleusercontent.com/a-/AOh14GiL7j8zjljc1x01-ho0vMwqj_P_SqdmpQVOhqOl=s96-c"
          alt=""
        />
        <Columns maxWidth pad={Pad.Medium}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO
              const entry: Omit<Tweet, 'id'> = {
                username: 'chrisisler',
                authorImage:
                  'https://lh3.googleusercontent.com/a-/AOh14GiL7j8zjljc1x01-ho0vMwqj_P_SqdmpQVOhqOl=s96-c',
                authorName: 'Chris Isler',
                mediaUrl: null,
                text: tweet,
                timestamp: firestore.FieldValue.serverTimestamp(),
              };
              db.collection(DbPath.Tweets)
                .add(entry)
                .catch(() => {
                  // TODO
                });
              setTweet('');
            }}
          >
            <TweetInput
              placeholder="What's happening?"
              maxLength={maxTweetLength}
              multiple={false}
              value={tweet}
              onChange={(event) => setTweet(event.target.value)}
            />
          </form>
          <Rows center between>
            <IconButton
              aria-label="Add photo"
              onClick={() => mediaInputRef.current?.click()}
            >
              <form>
                <ImageSearch
                  style={{ color: Color.twitterBlue, fontSize: '1em' }}
                />
                <input
                  ref={mediaInputRef}
                  style={{ width: '0', height: '0' }}
                  tabIndex={-1}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const fileList = event.target.files;
                    if (fileList) setMediaFile(fileList[0]);
                  }}
                />
              </form>
            </IconButton>
            <Rows pad={Pad.Small} center>
              <CircularProgress
                size="1.4em"
                variant="static"
                value={Math.floor((tweet.length / maxTweetLength) * 100)}
              />
              <TimelineTweetButton>Tweet</TimelineTweetButton>
            </Rows>
          </Rows>
        </Columns>
      </Rows>
    </TweetContainer>
  );
};
