import { ReviewStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { GetAllReviewData, GetAllReviews } from "@/types/review";

class ReviewService {
  async getAllReviews(
    { page, take }: Page,
    data: GetAllReviewData,
  ): Promise<GetAllReviews> {
    let url = `reviews/get-all?page=${page}&take=${take}`;
    if (data.date) {
      url += `&date=${data.date}`;
    }
    if (data.search) {
      url += `&search=${data.search}`;
    }
    if (data.rating.length > 0) {
      const ratingParams = data.rating
        .map((rating) => `rating[]=${rating}`)
        .join("&");
      url += `&${ratingParams}`;
    }
    if (data.state in ReviewStatus) {
      url += `&state=${data.state}`;
    }
    return api.get(url);
  }
}

export default new ReviewService();
