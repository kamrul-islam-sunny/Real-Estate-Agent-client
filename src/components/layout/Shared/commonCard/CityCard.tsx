import Image from "next/image";
import cityImage from '@/../public/asset/city.jpg'

// interface CityCardProps {
//   imageSrc: string;
//   city: string;
//   forSale: number;
//   forRent: number;
// }
// { imageSrc, city, forSale, forRent }: CityCardProps
export default function CityCard() {
  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-sm border">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image
          src={cityImage}
          alt="city card"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="px-4 py-6 text-center space-y-2">
        <h3 className="text-xl font-semibold text-dark-true">{'New York'}</h3>
        <div className="flex justify-center items-center gap-6 mt-1 text-sm font-normal text-gray-600">
          <span>for sale <strong className="text-gray-700 font-semibold">{'1234'}</strong></span>
          <span className="h-10 bg-gray-300 border-r"></span>
          <span>for rent <strong className="text-gray-700 font-semibold">{'3412'}</strong></span>
        </div>
      </div>
    </div>
  );
}
