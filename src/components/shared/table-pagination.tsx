import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "@/types/api";

export const TablePagination: React.FC<{ data: Meta }> = ({ data }) => {
  const { hasNextPage, hasPreviousPage, page, itemCount, take } = data;

  const totalPages = Math.ceil(itemCount / take);

  return (
    <div className="ml-auto">
      <Pagination>
        <PaginationContent>
          {hasPreviousPage && (
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#" isActive={index + 1 === page}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {hasNextPage && (
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
