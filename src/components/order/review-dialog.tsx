import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Dispatch,
  FormEvent,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "../ui/button";
import ReviewPerProduct from "./review-per-product";
import orderService from "@/services/order.service";
import { ResReview, Review } from "@/types/review";
import reviewService from "@/services/review.service";
import { ReviewStatus } from "@/common/enums";

export interface ReviewDialogRef {
  onOpen: (id: string, action: ReviewStatus) => Promise<void>;
  onClose: () => void;
}

interface ReviewDialogProps {
  onRefetch: () => Promise<void>;
}

const ReviewDialog = forwardRef<ReviewDialogRef, ReviewDialogProps>(
  function ReviewDialog({ onRefetch }, ref) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[] | ResReview[]>([]);
    const [action, setAction] = useState<ReviewStatus>(ReviewStatus.UNREVIEW);

    const getOrderById = async (id: string) => {
      try {
        const response = await orderService.getOrderDetail(id);
        setReviews(
          response.data.data.OrderItems.map((item) => {
            return {
              orderId: id,
              orderDetailId: item.id,
              bookId: item.book_id,
              rating: 0,
              description: undefined,
              title: "comment",
              book: item.book,
            };
          })
        );
        setIsOpen(true);
      } catch (err) {
        console.log(err);
      }
    };

    const getReviewsByOrderId = async (id: string) => {
      try {
        const response = await reviewService.getReviewsByOrderId(id);
        console.log("getReviewsByOrderId", response);

        (setReviews as Dispatch<SetStateAction<ResReview[]>>)(
          response.data.data
        );
        setIsOpen(true);
      } catch (err) {
        console.log(err);
      }
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          async onOpen(id: string, action: ReviewStatus) {
            setAction(action);
            if (action === ReviewStatus.UNREVIEW) {
              await getOrderById(id);
            } else {
              await getReviewsByOrderId(id);
            }
          },
          onClose() {
            setIsOpen(false);
            setReviews([]);
          },
        };
      },
      []
    );
    const reviewBook = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await Promise.all(
          (reviews as Review[]).map((reivew) => orderService.reviewBook(reivew))
        );
        setIsOpen(false);
        setReviews([]);
        await onRefetch();
      } catch (err) {
        console.log(err);
      }
    };

    const handleOnChangeInput = (
      bookId: string,
      name: string,
      value: string | number
    ) => {
      (setReviews as Dispatch<SetStateAction<Review[]>>)((preState) =>
        preState.map((review) =>
          review.bookId === bookId ? { ...review, [name]: value } : review
        )
      );
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đánh Giá</DialogTitle>
          </DialogHeader>
          <form className="space-y-6" onSubmit={reviewBook}>
            {reviews.map((item, index) => {
              return (
                <ReviewPerProduct
                  key={index}
                  data={item}
                  onChange={handleOnChangeInput}
                  action={action}
                />
              );
            })}
            <div className="flex flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={() => {
                  setReviews([]);
                  setIsOpen(false);
                }}
              >
                Trở lại
              </Button>

              {action === ReviewStatus.UNREVIEW && (
                <Button type="submit" className="w-1/2">
                  Hoàn thành
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

export default ReviewDialog;
