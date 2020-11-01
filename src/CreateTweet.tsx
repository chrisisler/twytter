import { FC, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from 'firebase/app';
import { IconButton, CircularProgress } from '@material-ui/core';
import { ImageSearch, CancelOutlined } from '@material-ui/icons';

import { Columns, Pad, Color, TweetButton, Rows, UserAvatar } from './style';
import { db, DbPath, storage } from './firebase';
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
`;

const TimelineTweetButton = styled(TweetButton)`
  width: min-content;
  padding: 0 ${Pad.Medium};
  min-height: 35px;
  font-size: 0.9em;
  margin: 0;
`;

const TweetDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${Color.twitterBackground};
  margin: 0;
`;

const ImagePreview = styled.div`
  background-image: url(${(props: { src: string }) => props.src});
  /** This is a cool property. */
  background-size: cover;
  border-radius: 20px;
  width: 100%;
  min-height: 120px;
  height: 20vh;
`;

export const CreateTweet: FC = () => {
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const [tweet, setTweet] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');

  // TODO Loading UI
  const storeFile = async (mediaFile: File) =>
    new Promise<string | null>((resolve) => {
      storage
        .ref(`images/${mediaFile.name}`)
        .put(mediaFile)
        .on(
          'state_changed',
          () => {}, // Skip the progress callback
          (error) => {
            alert(error.message);
            resolve(null);
          },
          () => {
            storage
              .ref('images')
              .child(mediaFile.name)
              .getDownloadURL()
              .then((mediaUrl) => {
                if (typeof mediaUrl !== 'string') {
                  throw Error('Unreachable');
                }
                resolve(mediaUrl);
              });
          }
        );
    });

  const postTweet = async <E extends React.SyntheticEvent>(event: E) => {
    event.preventDefault();
    const mediaUrl = mediaFile ? await storeFile(mediaFile) : null;
    const entry: Omit<Tweet, 'id'> = {
      username: 'chrisisler',
      authorImage:
        'https://lh3.googleusercontent.com/a-/AOh14GiL7j8zjljc1x01-ho0vMwqj_P_SqdmpQVOhqOl=s96-c',
      authorName: 'Chris Isler',
      mediaUrl,
      text: tweet,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
    db.collection(DbPath.Tweets)
      .add(entry)
      .catch((error) => {
        if (error instanceof Error) alert(error.message);
      });
    setTweet('');
  };

  // If uploading an image, convert it to a string to show a preview
  // TODO Loading UI
  useEffect(() => {
    let reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setImagePreviewSrc(reader.result);
    };
    if (!mediaFile) return;
    reader.readAsDataURL(mediaFile);
    return reader.abort;
  }, [mediaFile]);

  return (
    <TweetContainer pad={Pad.Small}>
      <Rows pad={Pad.Medium}>
        <UserAvatar
          tabIndex={0}
          src="https://lh3.googleusercontent.com/a-/AOh14GiL7j8zjljc1x01-ho0vMwqj_P_SqdmpQVOhqOl=s96-c"
          alt=""
        />
        <Columns maxWidth pad={Pad.Small}>
          <form onSubmit={postTweet}>
            <TweetInput
              placeholder="What's happening?"
              maxLength={maxTweetLength}
              multiple={false}
              value={tweet}
              onChange={(event) => setTweet(event.target.value)}
            />
          </form>
          {imagePreviewSrc && mediaFile && (
            <Rows maxWidth>
              <ImagePreview src={imagePreviewSrc}>
                <IconButton
                  aria-label="Remove photo"
                  onClick={() => {
                    setMediaFile(null);
                    setImagePreviewSrc('');
                  }}
                >
                  <CancelOutlined style={{ color: '#fff' }} />
                </IconButton>
              </ImagePreview>
            </Rows>
          )}
          <TweetDivider />
          <Rows center between>
            <IconButton
              aria-label="Add photo"
              onClick={() => mediaInputRef.current?.click()}
            >
              <form>
                <ImageSearch style={{ color: Color.twitterBlue }} />
                <input
                  ref={mediaInputRef}
                  style={{ width: '0', height: '0' }}
                  tabIndex={-1}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const first = event.target.files?.[0];
                    if (!first) return;
                    setMediaFile(first);
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
              <TimelineTweetButton
                disabled={tweet.length === 0}
                onClick={postTweet}
              >
                Tweet
              </TimelineTweetButton>
            </Rows>
          </Rows>
        </Columns>
      </Rows>
    </TweetContainer>
  );
};
