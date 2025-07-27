import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import LOGO from "../assets/images/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 pt-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1: Logo & Description */}
        <div>
          <img
            src={LOGO}
            alt="TravelTales Logo"
            className="h-24 sm:h-28 md:h-32 w-auto mb-5"
          />

          {/* <p className="text-sm leading-relaxed">
            Discover and share breathtaking travel stories from around the world.
            Connect with travelers. Get inspired.
          </p> */}
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-cyan-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-600 transition">
                Browse Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-600 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide">
            Legal
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-cyan-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-600 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide">
            Connect
          </h4>
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-500 hover:text-cyan-500 transition-colors"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-slate-500 hover:text-cyan-500 transition-colors"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-slate-500 hover:text-cyan-500 transition-colors"
            >
              <FaFacebookF size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="text-center text-xs text-slate-400 mt-12 pt-6 border-t border-slate-100">
        © 2025 TravelStory — Built with passion by{" "}
        <span className="text-slate-600 font-medium">Lakshay Joshi</span>.
      </div>
    </footer>
  );
};

export default Footer;
