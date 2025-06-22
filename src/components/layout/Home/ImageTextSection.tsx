import Image from "next/image";
import windowImage from '@/../public/asset/window.png'

export default function ImageTextSection() {
    return (
        <div className="px-[5%]">
            <section className="max-w-screen-xl mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                    {/* Left: Image */}
                    <div className="sm:col-span-2 h-[300px] md:h-[500px] relative rounded overflow-hidden shadow-md">
                        <Image
                            src={windowImage} // Change this path as needed
                            alt="Building View"
                            fill
                            className="object-cover"
                        /> 
                    </div>

                    {/* Right: Text */}
                    <div className="sm:col-span-3 bg-light-bg py-10 px-6 sm:py-16 sm:px-8 rounded border border-gray-200 h-full">
                        <p className="text-sm text-gray-500 mb-2">Lorem ipsum dolor</p>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-snug text-gray-900 font-anton">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        </h2>
                    </div>
                </div>
            </section>
        </div>
    );
}
