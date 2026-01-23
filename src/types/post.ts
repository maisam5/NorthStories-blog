

export interface FetchPostsParams {
    pageParam?: string | null;
    limit?: number;
}
export interface PostAuthor {
    name?: string | null;
    image?: string;
}
export interface Post {
    id: string;
    title: string;
    slug:string;
    description:string | null;
    coverImageUrl: string;
    createdAt: string;
    author: PostAuthor;
}
export interface FetchPostsResponse {
    posts: Post[];
    nextCursor:string | null
}