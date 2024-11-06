import { api } from "@/lib/api-client";
import { GetAllReviews } from "@/types/review";

class ReviewService {
  async getAllReviews(): Promise<GetAllReviews> {
    return api.get("reviews/get-all");
  }
}

export default new ReviewService();
