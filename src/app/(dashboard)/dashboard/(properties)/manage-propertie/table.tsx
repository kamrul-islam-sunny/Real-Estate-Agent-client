"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { EditIcon, Ellipsis, ImageIcon, Trash2,  } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import PonropertyTableSkelet from "./PropertyTableSkelet";
import { IProperty } from "@/redux/features/properties/propertiesType";

interface TableProps {
  isLoading: boolean;
  isError: boolean;
  properties: IProperty[];
  handleDeleteProperty: any;
  deleteLoading: any;
  isLoadingPage: boolean;
}
const PropertyTable = ({
  isLoading,
  isError,
  properties,
  isLoadingPage,
  handleDeleteProperty,
  deleteLoading,
}: TableProps) => {
  if (!properties || isLoading|| isLoadingPage) {
    return <PonropertyTableSkelet />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="default">Available</Badge>;
      case 'sold':
        return <Badge variant="destructive">Sold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'house':
        return <Badge variant="outline">House</Badge>;
      case 'apartment':
        return <Badge variant="outline">Apartment</Badge>;
      case 'condo':
        return <Badge variant="outline">Condo</Badge>;
      case 'land':
        return <Badge variant="outline">Land</Badge>;
      case 'commercial':
        return <Badge variant="outline">Commercial</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  if (properties.length === 0 ) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-gray-500 py-10">
         No properties found.
        </TableCell>
      </TableRow>
    );
  }
  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-gray-500 py-10">
        No properties found.
        </TableCell>
      </TableRow>
    );
  }

 
  return (
    <TableBody>
      {properties.map((property) => (
        <TableRow key={property._id} className="hover:bg-gray-100">
          {/* Image */}
          <TableCell>
            <div className="flex items-center gap-2">
              {property.image?.length > 0 ? (
                <Image
                  src={property.image[0]}
                  width={500}
                  height={500}
                  className="w-[50px] h-[50px] object-cover rounded"
                  alt={property.name}
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-100 flex items-center justify-center rounded">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          </TableCell>

          {/* Basic Info */}
          <TableCell>
            <div className="space-y-1">
              <p className="font-medium">{property.name}</p>
              <div className="flex gap-2">
                {getTypeBadge(property.type)}
              </div>
            </div>
          </TableCell>

          {/* Location */}
          <TableCell>
            <div className="space-y-1">
              <p>{property.location}</p>
            </div>
          </TableCell>

          {/*  Status */}
          <TableCell>
            <div className="space-y-2">
  
              <div className="flex flex-col  gap-2 uppercase">
                
                {getStatusBadge(property.sale)}
              </div>
            </div>
          </TableCell>

          {/* Details */}
          <TableCell>
            <div className="flex gap-4">
            <p className="font-medium">${property.price.toLocaleString()}</p>
            </div>
          </TableCell>

          

          {/* Actions */}
          <TableCell className="text-right">
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-gray-200">
                    <Ellipsis className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link
                    href={`/dashboard/update-property/${property?.slug}`}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <EditIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center gap-2 text-red-600 p-2 hover:bg-gray-100 rounded w-full">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this property?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>{handleDeleteProperty(property._id)}} className="bg-red-600 hover:bg-red-700">
                       {deleteLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default PropertyTable;