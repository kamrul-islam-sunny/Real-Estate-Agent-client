'use client'
import React, { useEffect, useState } from 'react'
import CustomBreadcrumb from '@/components/layout/Shared/CustomBreadcrumb'
import PropertyFilterForm from './components/PropertyFilterForm'
import PropertyCard from '@/components/layout/Shared/commonCard/PropertyCard'
import { ListFilterPlus } from 'lucide-react'

import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi'
import SkeletonCard from '@/components/layout/Shared/commonCard/SkeletonCard'
import { PaginationGlobal } from '@/components/dashboard/users/pagination'


function Page() {

    const [open, isOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [filterData, setFilterData] = useState([])


    const { data, refetch } = useHandleGetPropertiesQuery({
        page: currentPage,
        limit: itemsPerPage,
    })

    // const allProperties = data?.payload.data || [];
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
        <>
            <CustomBreadcrumb currentPage='Properties'
                BreadcrumbLinkFrom='Home'
            />

            <div className="px-[5%]">
                <div className='max-w-screen-xl mx-auto mt-12 relative z-[70]' >

                    <div className="w-full sm:max-w-5xl mx-auto grid sm:grid-cols-7 justify-center gap-8 py-10 relative z-10">
                        <button
                            className="sm:hidden flex items-center gap-2 text-lg font-nunito border border-gray-300 w-26 rounded px-4 py-1"
                            onClick={() => isOpen(!open)}
                        >
                            Filter <ListFilterPlus size={18} />
                        </button>

                        {/* Overlay */}
                        <div
                            className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                            onClick={() => isOpen(false)}
                        ></div>

                        {/* Overlay (Only visible on mobile when open) */}
                        {open && (
                            <div
                                className="fixed inset-0 bg-black/10 z-40 sm:hidden"
                                onClick={() => isOpen(false)}
                            />
                        )}

                        {/* Filter Panel: Drawer in mobile, Sidebar in desktop */}
                        <div
                            className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[70] shadow-lg transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:block sm:shadow-none sm:h-auto sm:w-full sm:col-span-2 overflow-y-auto`}
                        >
                            {/* Mobile header with close button */}
                            <div className="p-4 border-b flex justify-between items-center sm:hidden">
                                <h2 className="text-lg font-semibold">Filter Properties</h2>
                                <button onClick={() => isOpen(false)} className="text-gray-500 hover:text-black">
                                    ✕
                                </button>
                            </div>

                            {/* Filter Content Area */}
                            <div className="p-4 overflow-y-auto h-[calc(100%-60px)] sm:h-auto">
                                <PropertyFilterForm
                                    setIsLoading={setIsLoading}
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    setFilterData={setFilterData}
                                />
                            </div>
                        </div>


                        <div className="w-full sm:col-span-5 flex flex-col justify-between relative z-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                                {

                                    filterData?.map((product, i) =>
                                        <div className='w-full' key={i}>
                                            <PropertyCard product={product} />
                                        </div>
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

                    </div>

                </div>
            </div>

        </>
    )
}

export default Page