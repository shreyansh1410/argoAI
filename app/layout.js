import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Blog App",
  description: "A modern blog application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50">

          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  {/* Logo/Home Link */}
                  <Link
                    href="/posts"
                    className="flex items-center px-2 text-gray-900 font-bold text-xl"
                  >
                    Blog App
                  </Link>
                </div>


                <div className="flex items-center space-x-4">
                  <Link
                    href="/posts"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/posts/create"
                    className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Create Post
                  </Link>
                </div>
              </div>
            </div>
          </nav>

 
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
            {children}
          </main>


          <footer className="bg-white border-t h-auto mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Blog App by Shreyansh Shukla. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
