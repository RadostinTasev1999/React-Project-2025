import { Link } from "react-router"
export default function footer(){
    return (
        <>
         (
    <footer className="bg-gray-800 text-white py-8 border-t-4 border-teal-500">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-wrap justify-between">
          
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <h3 className="text-2xl font-bold">TechForum</h3>
            <p className="text-sm mt-2">Your trusted forum for all things tech and gadgets.</p>
          </div>

         
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/policy" className="hover:text-gray-400">Privacy Policy</Link></li>
            </ul>
          </div>

        
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2025 TechForum. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </>
    )
}