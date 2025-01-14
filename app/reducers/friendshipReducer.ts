import { Friendship } from "@/types/Interfaces";


type FriendshipState = {
  friendships: Friendship[];
  loading: boolean;
  error: string | null;
};

export enum FriendshipActionType {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  ADD_FRIENDSHIP = "ADD_FRIENDSHIP",
  UPDATE_FRIENDSHIP = "UPDATE_FRIENDSHIP",
  DELETE_FRIENDSHIP = "DELETE_FRIENDSHIP",
}

export type FriendshipAction =
  | { type: FriendshipActionType.FETCH_START }
  | { type: FriendshipActionType.FETCH_SUCCESS; payload: Friendship[] }
  | { type: FriendshipActionType.FETCH_ERROR; payload: string }
  | { type: FriendshipActionType.ADD_FRIENDSHIP; payload: Friendship }
  | { type: FriendshipActionType.UPDATE_FRIENDSHIP; payload: Friendship }
  | { type: FriendshipActionType.DELETE_FRIENDSHIP; payload: string };

export const initialFriendshipState: FriendshipState = {
    friendships: [],
    loading: true,
    error: null,
};

export const friendshipReducer = (state: FriendshipState, action: FriendshipAction): FriendshipState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, friendships: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_FRIENDSHIP":
      return { ...state, friendships: [...state.friendships, action.payload] };
    case "UPDATE_FRIENDSHIP":
      return {
        ...state,
        friendships: state.friendships.map((f) =>
          f.friendship_id === action.payload.friendship_id ? action.payload : f
        ),
      };
    case "DELETE_FRIENDSHIP":
      return {
        ...state,
        friendships: state.friendships.filter((f) => f.friendship_id !== action.payload),
      };
    default:
      return state;
  }
};