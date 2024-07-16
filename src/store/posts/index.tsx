import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

// Define the structure of a comment within a post
interface Comment {
  accountName: string;
  imageURL: string;
  commentText: string;
  timePosted: string;
  likeAmount: number;
}

// Define the structure of a post
interface Post {
  id?: string; // id might not initially exist for new posts
  accountName: string;
  imageURL: string;
  postText: string;
  timePosted: string;
  Recommended: boolean;
  Specialization:
    | 'strength'
    | 'nutrition'
    | 'wellbeing'
    | 'recovery'
    | 'endurance';
  articleTitle?: string;
  articleUrl?: string;
  thumbnailUrl?: string;
  replyAmount?: number;
  likeAmount?: number;
  coach?: boolean;
  athlete?: boolean;
  expert?: boolean;
  follower?: boolean;
  following?: boolean;
  comments?: Comment[];
  dateSaved?: string;
  updated?: string;
}

// Define the structure for the posts slice state
interface PostsState {
  posts: Post[];
}

// Define the type for the payload when adding or updating a post
interface AddOrUpdatePostPayload {
  id?: string;
  updatedPost?: Partial<Post>;
  dateSaved?: string;
}

const initialState: PostsState = {
  posts: [
    {
      accountName: 'Glenn Higgins',
      imageURL: 'RandomImage1.png',
      postText: 'Just finished a great strength training session!',
      timePosted: '1h',
      Recommended: true,
      Specialization: 'strength',
      articleTitle: 'The Ultimate Guide to Zone 4 Training',
      articleUrl: 'https://inscyd.com/zone-4-training',
      thumbnailUrl:
        'https://inscyd.com/wp-content/uploads/2023/11/Infographic-The-Ultimate-Guide-to-Zone-4-Training-.png',
      replyAmount: 12,
      likeAmount: 45,
      coach: true,
      athlete: true,
      expert: false,
      follower: true,
      following: false,
      comments: [
        {
          accountName: 'Michael',
          imageURL: 'RandomImage7.png',
          commentText: 'Great job!',
          timePosted: '1h',
          likeAmount: 2,
        },
        {
          accountName: 'Sarah',
          imageURL: 'RandomImage2.png',
          commentText: 'Keep it up!',
          timePosted: '1h',
          likeAmount: 3,
        },
      ],
    },
    {
      accountName: 'Sarah Johnson',
      imageURL: 'RandomImage2.png',
      postText: 'Sharing my top nutrition tips for the day.',
      timePosted: '2h',
      Recommended: true,
      Specialization: 'nutrition',
      follower: true,
      following: false,
    },
    {
      accountName: 'Josephine White',
      imageURL: 'RandomImage3.png',
      postText: 'A wonderful day for wellbeing.',
      timePosted: '10h',
      Recommended: false,
      Specialization: 'wellbeing',
      follower: true,
      following: false,
    },
    {
      accountName: 'Jessica Martin',
      imageURL: 'RandomImage4.png',
      postText: 'Crushed my strength goals today!',
      timePosted: '1d',
      Recommended: false,
      Specialization: 'strength',
      follower: false,
      following: true,
    },
    {
      accountName: 'Jennifer Garcia',
      imageURL: 'RandomImage5.png',
      postText: 'Eating right is just as important as lifting right!',
      timePosted: '1d',
      Recommended: false,
      Specialization: 'nutrition',
      follower: false,
      following: true,
    },
    {
      accountName: 'Thomas Martinez',
      imageURL: 'RandomImage6.png',
      postText: 'Early morning workouts set the tone for the day.',
      timePosted: '2d',
      Recommended: false,
      Specialization: 'strength',
      follower: false,
      following: true,
    },
    {
      accountName: 'Michael Rodriguez',
      imageURL: 'RandomImage7.png',
      postText: 'Endurance is not just physical, it’s mental.',
      timePosted: '2d',
      Recommended: false,
      Specialization: 'endurance',
    },
    {
      accountName: 'Patricia Lee',
      imageURL: 'RandomImage8.png',
      postText: 'Rest and recovery are vital for muscle growth.',
      timePosted: '3d',
      Recommended: false,
      Specialization: 'recovery',
    },
    {
      accountName: 'William Perez',
      imageURL: 'RandomImage9.png',
      postText: 'Finding peace in yoga and meditation.',
      timePosted: '3d',
      Recommended: false,
      Specialization: 'wellbeing',
    },
    {
      accountName: 'James Lopez',
      imageURL: 'RandomImage10.png',
      postText: 'It’s all about the recovery days.',
      timePosted: '4d',
      Recommended: false,
      Specialization: 'recovery',
    },
    {
      accountName: 'Susan Clark',
      imageURL: 'RandomImage11.png',
      postText: 'Nutrition is 80% of the fitness journey!',
      timePosted: '4d',
      Recommended: false,
      Specialization: 'nutrition',
    },
    {
      accountName: 'David Lewis',
      imageURL: 'RandomImage12.png',
      postText: 'Recovery run completed, feeling great!',
      timePosted: '5d',
      Recommended: false,
      Specialization: 'recovery',
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (post: Omit<Post, 'id' | 'updated'>) => {
        const id = nanoid();
        const now = new Date().toISOString();
        return {
          payload: {
            ...post,
            id,
            dateSaved: now,
            updated: now,
          } as Post,
        };
      },
    },
    updatePost: (state, action: PayloadAction<AddOrUpdatePostPayload>) => {
      const index = state.posts.findIndex(
        post => post.id === action.payload.id,
      );
      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          ...action.payload.updatedPost,
          updated: new Date().toISOString(),
        };
      }
    },
    updatePostDateSaved: (
      state,
      action: PayloadAction<AddOrUpdatePostPayload>,
    ) => {
      const post = state.posts.find(post => post.id === action.payload.id);
      if (post) {
        post.dateSaved = action.payload.dateSaved!;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

// Export actions
export const {addPost, updatePost, updatePostDateSaved, deletePost, setPosts} =
  postsSlice.actions;

export const selectFollowerPosts = createSelector(
  (state: PostsState) => state.posts,
  posts => posts.filter(post => post.follower),
);

export const selectFollowingPosts = createSelector(
  (state: PostsState) => state.posts,
  posts => posts.filter(post => post.following),
);

export default postsSlice.reducer;
