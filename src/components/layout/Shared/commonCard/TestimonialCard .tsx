import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import the star icon
// { quote, author, rating }
const TestimonialCard = () => {
  return (
    <div className="w-full bg-white p-6 rounded shadow-md text-black">
      <p className="text-sm sm:text-base lg:text-lg italic mb-4 font-nunito">
        &ldquo;{'Renting through them has been an absolute breeze. The application process was straightforward, and their team was incredibly responsive and helpful whenever I had questions. The property itself is exactly as described, and any minor maintenance requests have been handled swiftly. Highly recommend for a stress-free rental experience!'}&rdquo;
      </p>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-lg">{'Michael P.'}</p>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-5 w-5 ${
                i < 4 ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;