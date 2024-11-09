import { ReviewStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { GetAllReviewQueries, GetAllReviews, ResReview } from "@/types/review";

class ReviewService {
  async getAllReviews(
    { page, take }: Page,
    query: GetAllReviewQueries,
  ): Promise<GetAllReviews> {
    let url = `reviews/get-all?page=${page}&take=${take}`;
    if (query.date) {
      url += `&date=${query.date}`;
    }
    if (query.search) {
      url += `&search=${query.search}`;
    }
    if (query.rating.length > 0) {
      const ratingParams = query.rating
        .map((rating) => `rating[]=${rating}`)
        .join("&");
      url += `&${ratingParams}`;
    }
    if (query.state in ReviewStatus) {
      url += `&state=${query.state}`;
    }
    return api.get(url);
  }

  async getReviewById(id: string) {
    return api.get(`reviews/${id}`);
  }

  async reply(id: string, reply: string) {
    return api.post(`reviews/${id}/reply`, { reply: reply });
  }

  async getReviewsByOrderId(orderId: string): Promise<{ data: { data: ResReview[] } }> {
    return api.get(`reviews/get-review-by-order-id/${orderId}`)
  }
}

export default new ReviewService();
