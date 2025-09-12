import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white relative overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">

                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-lg font-bold text-white">Q</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Quickshell
                            </h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-md">
                            Your premium marketplace for buying and selling second-hand products.
                            Discover amazing deals and connect with trusted buyers and sellers.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links and Support in one row */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-white border-b border-purple-500 pb-2 inline-block">
                                    Quick Links
                                </h4>
                                <div className="space-y-2">
                                    <Link to="/" className="block text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                        Home
                                    </Link>
                                    <Link to="/login" className="block text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                        Login
                                    </Link>
                                    <Link to="/register" className="block text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                        Register
                                    </Link>
                                    <Link to="/profile" className="block text-gray-300 hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                        Profile
                                    </Link>
                                </div>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-white border-b border-pink-500 pb-2 inline-block">
                                    Support
                                </h4>
                                <div className="space-y-2">
                                    <a href="#" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                                        Contact Us
                                    </a>
                                    <a href="#" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                                        Help Center
                                    </a>
                                    <a href="#" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                                        Terms of Service
                                    </a>
                                    <a href="#" className="block text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:translate-x-2 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                    <p className="text-gray-400 text-xs">
                        © {currentYear} <span className="font-semibold text-purple-400">Quickshell</span>. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-500 text-xs">Made with ❤ for you</span>
                        <div className="flex space-x-2">
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-xs">
                                Privacy
                            </a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-xs">
                                Terms
                            </a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-xs">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;