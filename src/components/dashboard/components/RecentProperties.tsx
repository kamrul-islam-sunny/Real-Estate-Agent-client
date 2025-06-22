"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, HomeIcon, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";



interface RecentPropertiesProps {
  properties: any[];
}

export default function RecentProperties({ properties }: RecentPropertiesProps) {
  if (!properties.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Recent Properties</CardTitle>
          <a href="#" className="text-sm text-primary hover:underline flex items-center">
            View All <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
        <CardDescription>
          Latest property listings in your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </CardContent>
    </Card>
  );
}

function PropertyCard({ property }: { property: any }) {
  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num}`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="relative h-24 sm:h-20 sm:w-28 rounded-md overflow-hidden">
        <Image
          src={property.image[0] || "https://via.placeholder.com/112x80?text=No+Image"}
          alt={property.name}
          fill
          className="object-cover"
        />
        <Badge 
          className={cn(
            "absolute top-1 left-1 text-xs capitalize",
            property.sale === "rent" ? "bg-blue-500 hover:bg-blue-600" : "bg-amber-500 hover:bg-amber-600"
          )}
        >
          {property.sale}
        </Badge>
      </div>

      <div className="flex-1">
        <h3 className="font-medium truncate">{property.name}</h3>
        <div className="flex items-center text-muted-foreground text-xs mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-3 w-3 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-3 w-3 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <HomeIcon className="h-3 w-3 mr-1" />
              <span>{property.squareFeet} ft²</span>
            </div>
          </div>
          <div className="font-semibold text-sm">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
    </div>
  );
}