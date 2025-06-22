import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: string) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  return (
    <div className="pt-5 lg:flex justify-center items-center gap-5">
      <div className="flex justify-center gap-5 items-center">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Pre
        </Button>
        <span className="text-gray-600">
          {`Page ${currentPage} of ${totalPages}`}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <div className="flex items-center justify-center mt-5 lg:mt-0 gap-5 flex-wrap">
        <Select
          value={currentPage.toString()}
          onValueChange={(value:any) => onPageChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={`Page ${currentPage}`} />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalPages }, (_, index) => (
              <SelectItem key={index + 1} value={(index + 1).toString()}>
                {index + 1}/Page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={onItemsPerPageChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={`${itemsPerPage} / Page`} />
          </SelectTrigger>
          <SelectContent>
            {[2, 10, 20, 50].map((limit) => (
              <SelectItem key={limit} value={limit.toString()}>
                {limit}/Limit
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;