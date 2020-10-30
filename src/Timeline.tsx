import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Pad, Color } from './style';
import { DataState, DataStateView } from './DataState';
import { db, DbPath } from './firebase';
import { TweetView } from './TweetView';
import { CreateTweet } from './CreateTweet';
import { Tweet } from './interfaces';

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
  const [tweets, setTweets] = useState<DataState<Tweet[]>>(DataState.Loading);
  useEffect(() => {
    db.collection(DbPath.Tweets).onSnapshot(
      ({ docs }) =>
        setTweets(
          docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data as Tweet;
          })
        ),
      (error) => setTweets(DataState.error(error.message))
    );
  }, []);
  return (
    <TimelineContainer>
      <Sticky>
        <h3>Home</h3>
      </Sticky>
      <CreateTweet />
      <DataStateView data={tweets} error={() => null} loading={() => null}>
        {(tweets) => (
          <>
            {tweets.map((t) => (
              <TweetView key={t.id} tweet={t} />
            ))}
          </>
        )}
      </DataStateView>
    </TimelineContainer>
  );
};
