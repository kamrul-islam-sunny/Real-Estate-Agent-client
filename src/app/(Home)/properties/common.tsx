// import React from 'react'

// function common() {
//   return (
//     <div>
//         <div className="w-full sm:max-w-5xl mx-auto grid sm:grid-cols-7 justify-center gap-8 py-10">
//                         <button
//                             className="sm:hidden flex items-center gap-2 text-lg font-nunito border border-gray-300 w-26 rounded px-4 py-1"
//                             onClick={() => isOpen(!open)}
//                         >
//                             Filter <ListFilterPlus size={18} />
//                         </button>

//                         {/* Overlay */}
//                         <div
//                             className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
//                                 }`}
//                             onClick={() => isOpen(false)}
//                         ></div>

//                         {/* Slide-in Drawer - From Left Side */}
//                         <div
//                             className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-lg transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
//                                 }`}
//                         >
//                             <div className="p-4 border-b flex justify-between items-center">
//                                 <h2 className="text-lg font-semibold">Filter Properties</h2>
//                                 <button onClick={() => isOpen(false)} className="text-gray-500 hover:text-black">✕</button>
//                             </div>
//                             <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
//                                 <PropertyFilterForm setIsLoading={setIsLoading} currentPage={currentPage} itemsPerPage={itemsPerPage} setFilterData={setFilterData} />
//                             </div>
//                         </div>

//                         <div className="hidden sm:block sm:col-span-2 ">
//                             <PropertyFilterForm setIsLoading={setIsLoading} currentPage={currentPage} itemsPerPage={itemsPerPage} setFilterData={setFilterData}  />
//                         </div>

//                         <div className="sm:col-span-5 flex flex-col justify-between">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 {
//                                     filterData?.map((product, i) =>
//                                         <div key={i}>
//                                             <PropertyCard product={product} />
//                                         </div>
//                                     )
//                                 }
//                                 {isLoadingPage || isLoading
//                                     && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
//                                 }
//                             </div>
//                             {/* pagination */}
//                             <div className=" flex items-center justify-center mt-10">
//                                 <select
//                                     onChange={(e) =>
//                                         handleItemsPerPageChange((e.target as HTMLSelectElement).value)
//                                     }
//                                     className="border border-gray-300 px-2 py-1.5 text-sm"
//                                 >
//                                     <option value={1}>1</option>
//                                     <option value={5}>5</option>
//                                     <option selected value={10}>10</option>
//                                     <option value={25}>25</option>
//                                     <option value={50}>50</option>
//                                 </select>
//                                 <div className="">
//                                     <PaginationGlobal
//                                         currentPage={currentPage}
//                                         totalPages={totalPages}
//                                         handlePageChange={handlePageChange}
//                                         className="sm:justify-end justify-center"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//     </div>
//   )
// }

// export default common