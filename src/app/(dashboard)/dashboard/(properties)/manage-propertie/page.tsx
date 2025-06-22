"use client";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useHandleDeletePropertiesMutation,
  useHandleGetPropertiesQuery,
} from "@/redux/features/properties/propertiesApi";
import React, { useEffect, useState } from "react";
import PropertyTable from "./table";

import toast from "react-hot-toast";
import Heading from "@/components/dashboard/shared/Heading";
import Search from "@/components/dashboard/inputs/Search";
import { PaginationGlobal } from "@/components/dashboard/users/pagination";


const ManageProperties = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [type, setType] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const { data, isLoading, isError, refetch } = useHandleGetPropertiesQuery({
    page: currentPage, 
    limit: itemsPerPage,
    name: searchTerm,
    type: type,
  });
  const properties = data?.payload?.data || [];
  console.log(properties);
  useEffect(() => {
    if (data) {
      setTotalPages(data?.payload?.pagination?.totalPages || 1);
      setCurrentPage(data?.payload?.pagination?.currentPage || 1);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const [deleteProperty, { isLoading: deleteLoading }] =
    useHandleDeletePropertiesMutation();

  const handleDeleteProperty = async (deleteId: any) => {
    try {
      await deleteProperty(deleteId);
      refetch();
      toast.success("Deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSearchClick = async () => {
    setIsSearching(true);
    setSearchTerm(inputValue);
    await refetch();
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleItemsPerPageChange = async (value: string) => {
    setItemsPerPage(Number(value));
    setIsLoadingPage(true);
    await refetch();
    setIsLoadingPage(false);
    setCurrentPage(1);
  };

  const handleApartmentChange = async (value: string) => {
    setType(value);
    setIsLoadingPage(true);
    await refetch();
    setIsLoadingPage(false);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 mt-5">
      <div className="flex justify-between flex-wrap gap-4 lg:gap-0">
        <Heading
          title="Properties"
          subTitle="Manage your properties. You can edit or delete properties."
        />
        <div className="flex items-center gap-5 flex-wrap">
          <Search
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSearchClick={handleSearchClick}
            isSearching={isSearching}
          />

          <div>
            <select onChange={(e)=>{handleApartmentChange((e.target as HTMLSelectElement).value)}} className="form-select w-full p-2 border outline-none text-sm">    
              <option value="">Property Apartment</option>
              <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="duplex">Duplex</option>
                <option value="triplex">Triplex</option>
                <option value="loft">Loft</option>
                <option value="studio">Studio</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
                <option value="cottage">Cottage</option>
                <option value="manufactured">Manufactured</option>
                <option value="mobile home">Mobile Home</option>
                <option value="co-op">Co-op</option>
                <option value="farm">Farm</option>
                <option value="land">Land</option>
                <option value="lot">Lot</option>
                <option value="multi-family">Multi-family</option>
                <option value="single-family">Single-family</option>
                <option value="commercial">Commercial</option>
                <option value="warehouse">Warehouse</option>
                <option value="office">Office</option>
                <option value="industrial">Industrial</option>
                <option value="retail">Retail</option>
                <option value="mixed-use">Mixed-use</option>
            </select>
          </div>

          <div className="">
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
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <PropertyTable
            handleDeleteProperty={handleDeleteProperty}
            deleteLoading={deleteLoading}
            isError={isError}
            isLoading={isLoading}
            properties={properties}
            isLoadingPage={isLoadingPage}
          />
        </Table>
      </div>

      <div className="mt-3">
        <PaginationGlobal
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          className="sm:justify-end justify-center"
        />
      </div>
    </div>
  );
};

export default ManageProperties;
