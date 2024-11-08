import { ReviewStatus } from "@/common/enums";
import { ResBookDetail } from "./book";
import { Meta } from "./api";
import { ResUser } from "./user";

export interface Review {
  book?: ResBookDetail;
  orderId: string;
  orderDetailId: string;
  bookId: string;
  star: number;
  description: string | undefined;
  title: string;
}

export interface ResReview {
  book_id: string;
  created_at: string;
  description: string;
  id: string;
  rating: number;
  reply_review_id: null;
  state: ReviewStatus;
  title: string;
  user_id: string;
  order_id: string;
  book: ResBookDetail;
  user: ResUser
}

export interface GetAllReviews {
  data: {
    data: ResReview[];
    meta: Meta;
  };
}

export interface GetAllReviewQueries {
  search?: string;
  rating: number[];
  date: Date | null;
  state: string;
}
