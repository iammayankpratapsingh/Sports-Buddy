import React from 'react';
import { Activity, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SportsBuddy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting sports enthusiasts and building active communities since 2025.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-blue-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/buddies" className="text-gray-400 hover:text-blue-400 transition-colors">Find Buddies</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Popular Sports</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?sport=Basketball" className="text-gray-400 hover:text-blue-400 transition-colors">Basketball</Link>
              </li>
              <li>
                <Link to="/events?sport=Football" className="text-gray-400 hover:text-blue-400 transition-colors">Football</Link>
              </li>
              <li>
                <Link to="/events?sport=Tennis" className="text-gray-400 hover:text-blue-400 transition-colors">Tennis</Link>
              </li>
              <li>
                <Link to="/events?sport=Volleyball" className="text-gray-400 hover:text-blue-400 transition-colors">Volleyball</Link>
              </li>
              <li>
                <Link to="/events?sport=Cycling" className="text-gray-400 hover:text-blue-400 transition-colors">Cycling</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Sports Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@sportsbuddy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SportsBuddy. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/help" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;