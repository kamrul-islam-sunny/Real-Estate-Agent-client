import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#131414] text-white py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid  lg:grid-cols-3 gap-10">

        {/* Left: Logo and Description */}
        <div className="">
          <div className=" flex items-center gap-2 text-white text-3xl font-semibold mb-3">
            <span className="bg-accent-gold text-black p-2 rounded-full">
              🏠
            </span>
            Logo
          </div>
          <p className="max-w-xl text-sm font-normal text-zinc-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>

          {/* Newsletter */}
          <h4 className="text-white text-2xl font-semibold mb-4">Subscribe Newsletter</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="px-4 py-2 rounded border border-zinc-700 bg-zinc-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-gold placeholder:text-xs"
            />
            <button className="bg-accent-gold text-white px-4 py-2 rounded text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2">
          {/* Center: Pages */}
          <div className="lg:place-items-center">
            <h4 className="text-accent-gold text-2xl font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li><a href="#">About</a></li>
              <li><a href="#">Properties</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Right: Social Media */}
          <div className="lg:place-items-center">
            <h4 className="text-accent-gold text-2xl font-semibold mb-4">Social Media</h4>
            <ul className="space-y-3 text-zinc-300 text-sm">
              <li className="flex items-center gap-3">
                <FaFacebookF className="bg-zinc-800 p-2 rounded-full w-8 h-8 text-white" />
                Facebook
              </li>
              <li className="flex items-center gap-3">
                <FaXTwitter className="bg-zinc-800 p-2 rounded-full w-8 h-8 text-white" />
                Twitter
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedinIn className="bg-zinc-800 p-2 rounded-full w-8 h-8 text-white" />
                LinkedIn
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="bg-zinc-800 p-2 rounded-full w-8 h-8 text-white" />
                Instagram
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-zinc-700" />

      <p className="text-center text-sm text-zinc-400">
        © Copyright <span className="text-accent-gold">Lorem ipsum</span> - Powered by <span className="text-accent-gold">Qrinux</span>
      </p>
    </footer>
  );
}
