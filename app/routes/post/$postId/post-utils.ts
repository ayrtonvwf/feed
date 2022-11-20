import { Comment, Feed, Post, User } from "@prisma/client";

export const mergeComments = <T extends Comment>(
  comments: T[],
  newComments: T[],
  removeIds?: string[]
): T[] => {
  return [...comments, ...newComments]
    .sort(
      // order cronologically
      (a, b) => a.id.localeCompare(b.id)
    )
    .reduce((acc, cur) => {
      if (!acc.length) {
        return [cur];
      }
      // remove duplicates or those that should be removed
      if (acc[acc.length - 1].id === cur.id || removeIds?.includes(cur.id)) {
        return acc;
      }
      return [...acc, cur];
    }, [] as T[]);
};

export type PostState = {
  data: Post & { _count: { Comment: number }; User: User; Feed: Feed };

  /**
   * The comments created on this session/page view.
   */
  createdComments: (Comment & { User: User })[];

  /**
   * All the loaded comments. Not directly shown in the UI.
   */
  loadedComments: (Comment & { User: User })[];

  /**
   * The loaded comments excluding the ones that were created on this session/page view.
   */
  thirdPartyComments: (Comment & { User: User })[];

  lastLoadedCommentId: string | null;
  lastCommentIdToLoad: string | null;
};
