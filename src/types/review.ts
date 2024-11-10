import { ReviewStatus } from "@/common/enums";
import { ResBookDetail } from "./book";
import { Meta } from "./api";
import { ResUser } from "./user";

export interface Review {
  book?: ResBookDetail;
  orderId: string;
  orderDetailId: string;
  bookId: string;
  rating: number;
  description: string | undefined;
  title: string;
}

export interface ResReview {
  book_id: string;
  created_at: string;
  description: string;
  id: string;
  rating: number;
  reply_review_id: string | null;
  state: ReviewStatus;
  title: string;
  user_id: string;
  order_item_id: string;
  book: ResBookDetail;
  user: ResUser;
  ReplyReviews: ReplyReviews | null;
}

export interface ReplyReviews {
  created_at: string;
  id: string;
  reply: string;
  review_id: string;
}

export interface ResReviewOfAdmin extends ResReview {
  OrderItem: {
    order_id: string
  };
}

export interface GetAllReviews {
  data: {
    data: ResReviewOfAdmin[];
    meta: Meta;
  };
}

export interface GetAllReviewQueries {
  search?: string;
  rating: number[];
  date: Date | null;
  state: string;
}

export interface GetReviewByBookId {
  data: {
    data: ResReview[],
    meta: Meta
  }
}
