import { Comment, Feed, Post, User } from "@prisma/client";

export type FeedWithDetails = Feed & {
  Post: (Post & {
    _count: { Comment: number };
    User: User;
    Feed: Feed;
    Comment: (Comment & {
      User: User;
    })[];
  })[];
};

export type FeedLoaderData = {
  feed: FeedWithDetails;
};
