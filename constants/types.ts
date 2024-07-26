export interface SendCodeResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: string;
}

export interface FinalOptionStat {
  percentage: number;
  finalOption: {
    _id: string;
    title: string;
  };
}
export interface SendCodeBody {
  phone: string;
}
export interface SignUpBody {
  phone: string;
  code: string;
}

interface ResponseType {
  code: number;
  locale: string;
  message: string;
  success: boolean;
}
export interface RegistrationResponse extends ResponseType {
  data: {
    token: string;
    user: {
      created_at: string;
      id: number;
      phone: string;
      updated_at: string;
    };
  };
}

export interface UserProfileLocation {
  lat: string;
  lng: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
}
export interface UserProfile {
  id: number;
  clerkUserId: string;
  name: string;
  userName: string;
  birthDate: string;
  phone: string;
  created_at: string;
  updated_at: string;
  gender: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  politicalPreference: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  racialIdentity: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  location: UserProfileLocation;
  fullAddress: string;
}
export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

// TODO: remove 'UserLocation' interface
export interface UserLocation {
  address: string;
  components: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
  };
}
export type ProfileSetUpOptions = {
  [key: string]: {
    title: string;
    items: {
      _id: string;
      name: string;
    }[];
  };
};
export interface ProfileResponse extends ResponseType {
  data: UserProfile;
}
export interface ProfileSetUpOptionsResponse extends ResponseType {
  data: ProfileSetUpOptions;
}
export interface ProfileUpdateResponse extends ResponseType {
  data: UserProfile;
}

export interface Topic {
  _id: string;
  title: string;
  colorTheme: string;
}
export interface TopicsResponse extends ResponseType {
  data: Topic[];
}
export interface Media {
  captionUrl: string;
  mediaType: "video" | "photo";
  mediaUrl: string;
  _id: string;
}
export interface SocialAttributes {
  comments: number;
  likes: number;
  shares: number;
  views: number;
  id: string;
}
export interface SourceType {
  _id: string;
  name: SocialMediasTypes;
  imageUrl: string;
  sourceUrl: string;
}
export enum SocialMediasTypes {
  Twitter = "Twitter",
  Instagram = "Instagram",
  TikTok = "TikTok",
  Facebook = "Facebook",
  LinkedIn = "Linkedin",
}
export interface Post {
  topicName: string;
  _id: string;
  active: boolean;
  authorImageUrl: string;
  authorFullName: string;
  authorName: string;
  authorBio: string;
  caption: string;
  createdAt: string;
  hashtags: string[];
  media: Media[];
  socialAttributes: SocialAttributes;
  postLocation: string;
  topic: string;
  infoJudgesView: string;
  originCreatedAt: string;
  updatedAt: string;
  sourceType: SourceType;
  vets_count: number;
  verified: boolean;
  additionalLink?: string[];
  hasVetted: boolean;
}
export interface PostsResponse extends ResponseType {
  data: Post[];
}
export interface TopicItem {
  id: number;
  title: string;
  color: string;
}
export interface ProfileUpdatePayload {
  name: string;
  gender: string;
  politicalPreference: string;
  racialIdentity: string;
  birthDate: string;
}
export interface SVGIconProps {
  fill?: string;
}

export type VettingOptions = {
  id: number;
  title: string;
  subtitle?: string;
  options?: {
    idx: number;
    text: string;
  }[];
  tips?: Tips;
};

export interface VettingInitData {
  [key: number]: string | string[];
}

export interface GoogleResponse extends ResponseType {
  data: {
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    results: {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address: string;
      place_id: string;
      types: string[];
    }[];
    status: string;
  };
}

export interface Option {
  title: string;
  _id: string;
}
export interface VettingStage {
  _id: string;
  title: string;
}
export interface Tips {
  title: string;
  text: string;
  points: string[];
  _id: string;
}
export enum QuestionType {
  single = "single",
  multiple = "multiple",
  slider = "slider",
}
export interface Question {
  _id: string;
  title: string;
  type: QuestionType;
  vettingStage: VettingStage;
  size?: number;
  tips: Tips;
  options: Option[];
  children: Question[];
}
export interface Questions {
  [key: string]: Question;
}
export interface QuestionsResponse extends ResponseType {
  data: {
    questions: Questions;
  };
}
export interface Answer {
  question: string;
  answer: string;
}
export interface AnswersState {
  [key: string]: Answer;
}
export interface VettingFinalResponse {
  [key: string]: Answer;
}

export interface SummaryData {
  _id: string;
  stages: {
    title: string;
    score: string;
    value?: number;
    max?: number;
  }[];
  infoJudgesView: string;
  createdAt: string;
  updatedAt: string;
}
export interface VettingResponse extends ResponseType {
  data: SummaryData;
}
export interface VettingResultResponse extends ResponseType {
  data: VettingFinalResponse;
}

export interface VettingPayload {
  post: string;
  answers: Answer[];
  location?: UserProfileLocation;
  finalResult: string;
}
export interface VettingResponsePayload {
  answers: Answer[];
}

export interface DropDownItem {
  label: string;
  value: string;
}

export type DataItem = {
  id: number;
  title: string;
  value: number;
  percent: number;
  color: string;
};
export type PieChartData = DataItem[];
export interface LinerChartData {
  label: string;
  data: DataItem[];
}

export type getResponseSizeProps = (
  dimension: number,
  isHeight?: boolean
) => number;

export type EventData = { [key: string]: string | undefined | null };
