import { Comment, Feed, Post, User } from "@prisma/client";

export type FeedWithDetails = Feed & {
  Post: (Post & {
    User: User;
    Comment: (Comment & {
      User: User;
    })[];
  })[];
};

export type FeedLoaderData = {
  feed: FeedWithDetails;
};
