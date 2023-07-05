export interface DiscussionModel {
  topic: string;
  active: boolean;
  collapsed?: boolean;
  startedAt?: string;
  endedAt?: string;
  duration: string;
  posts: DiscussionPostModel[];
}

export interface DiscussionPostModel {
  content: string;
  author: any;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionPostCreateModel {
  content: string;
}
