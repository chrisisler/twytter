import { firestore } from 'firebase';

export interface Tweet {
  /** ID from Firebase. */
  id: string;

  /** The image URL for the avatar of the author. */
  authorImage: string;

  /** Non-unique, changeable title of the author. */
  authorName: string;

  /** The unique account name of the author. */
  username: string;

  /** The content of the tweet. */
  text: string;

  /**
   * When the tweet was posted to the server.
   * @see firestore.FieldValue.serverTimestamp()
   */
  timestamp: firestore.FieldValue | null;

  /** If any, the image or video location. */
  mediaUrl: string | null;

  // verified: boolean;
  // authorId: string;
  // inReplyToAuthorId: string;
  // source: 'desktop' | 'mobile';
  // retweetCount: number;
  // replyCount: number;
  // likeCount: number;
  // quoteCount: number;
}
