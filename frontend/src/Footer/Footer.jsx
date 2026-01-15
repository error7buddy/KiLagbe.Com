import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t  ">
      <div className="max-w-100% mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pl-100">
          
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About us</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Accessibility</a></li>
              <li><a href="#" className="hover:text-gray-900">Feedback</a></li>
              <li><a href="#" className="hover:text-gray-900">Media room</a></li>
              <li><a href="#" className="hover:text-gray-900">Ad Choices</a></li>
              <li><a href="#" className="hover:text-gray-900">Advertise with us</a></li>
              <li><a href="#" className="hover:text-gray-900">Agent support</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Home Made</a></li>
              <li><a href="#" className="hover:text-gray-900">Tech Blog</a></li>
              <li><a href="#" className="hover:text-gray-900">Agent Blog</a></li>
              <li><a href="#" className="hover:text-gray-900">Sitemap</a></li> {/* fixed typo */}
              <li><a href="#" className="hover:text-gray-900">Do Not Sell or Share My Personal Information</a></li>
            </ul>
          </div>

          {/* Column 3 - Mobile Apps */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Get the app</h3>
            <div className="flex space-x-4">
              <a href="#" className="block">
                <div className="bg-black text-white px-4 py-3 rounded-lg w-32 text-center hover:bg-gray-900 transition">
                  <span className="text-xs font-medium">App Store</span>
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-black text-white px-4 py-3 rounded-lg w-32 text-center hover:bg-gray-900 transition">
                  <span className="text-xs font-medium">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div></div>
        </div>

        {/* Legal Text */}
    <div className="border-t pt-6 text-xs text-gray-600 space-y-3 text-center">
  <p>
    This project was developed collaboratively by <span className="font-medium">Osman Aziz, , Atiur Rahman, and Maisha Maliha</span> — students of 
    <span className="font-medium"> Vadrendra University</span>.
  </p>

  <p>
    Developed as part of the <span className="font-medium">Web Development Final Year Project (2024–2025)</span> 
    under the supervision of the Department of Computer Science.
  </p>

  <p>
    All content and data used in this project are for **educational purposes only** and do not represent any real commercial entity.
  </p>

  <p>
    © 2024–2025 <span className="font-medium">Vadrendra University Project Team</span>. All rights reserved.
  </p>
</div>

      </div>
    </footer>
  );
};

export default Footer;
