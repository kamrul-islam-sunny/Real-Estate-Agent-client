import { PaginationGlobal } from '@/components/dashboard/users/pagination';
import PropertyCard from '@/components/layout/Shared/commonCard/PropertyCard';
import SkeletonCard from '@/components/layout/Shared/commonCard/SkeletonCard';
import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function PropertiesCard() {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
    const { data, isLoading, refetch } = useHandleGetPropertiesQuery({
        page: currentPage,
        limit: itemsPerPage,
    })

    const allProperties = data?.payload.data || [];
    console.log(data)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const handleItemsPerPageChange = async (value: string) => {
        setItemsPerPage(Number(value));
        setIsLoadingPage(true);
        await refetch();
        setIsLoadingPage(false);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (data) {
            setTotalPages(data?.payload?.pagination?.totalPages || 1);
            setCurrentPage(data?.payload?.pagination?.currentPage || 1);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    return (
        <div className="flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                    allProperties.map((product, i) =>
                        <Link href={`/properties/${product.slug}`} key={i}>
                            <PropertyCard product={product} />
                        </Link>
                    )
                }
                {isLoadingPage || isLoading
                    && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                }
            </div>
            {/* pagination */}
            <div className=" flex items-center justify-center mt-10">
                <select
                    onChange={(e) =>
                        handleItemsPerPageChange((e.target as HTMLSelectElement).value)
                    }
                    className="border border-gray-300 px-2 py-1.5 text-sm"
                >
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option selected value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
                <div className="">
                    <PaginationGlobal
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        className="sm:justify-end justify-center"
                    />
                </div>
            </div>
        </div>
    )
}

export default PropertiesCard