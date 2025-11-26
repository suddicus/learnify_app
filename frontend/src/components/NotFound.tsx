// import { Link } from 'react-router-dom'

// export const NotFound: React.FC<{ 
//   message: string; 
//   redirectTo?: string;
//   redirectText?: string;
// }> = ({ 
//   message, 
//   redirectTo = "/", 
//   redirectText = "Go back home" 
// }) => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-96 text-center">
//       <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-6 max-w-md">
//         <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
//           Not Found
//         </h2>
//         <p className="text-red-600 dark:text-red-300 mb-4">{message}</p>
//         <Link 
//           to={redirectTo}
//           className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
//         >
//           {redirectText}
//         </Link>
//       </div>
//     </div>
//   )
// }

// // components/LoadingSpinner.tsx
// export const LoadingSpinner: React.FC = () => {
//   return (
//     <div className="flex justify-center items-center min-h-96">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
//     </div>
//   )
// }

// components/NotFound.tsx
import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'

export const NotFound: React.FC<{ 
  message?: string;
  redirectTo?: string;
  redirectText?: string;
}> = ({ 
  message = "Oops, the page you are looking for does not exist.",
  redirectTo = "/",
  redirectText = "Back to Home",
}) => {
  const { darkMode } = useDarkMode()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto">

        {/* Error Code */}
        <div className="mb-4">
          <h1 className={`text-6xl font-bold ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className={`text-xl font-semibold mb-3 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Page Not Found
        </h2>

        {/* Message */}
        <p className={`mb-8 leading-relaxed ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={redirectTo}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            }`}
          >
            {redirectText}
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className={`px-6 py-3 rounded-lg font-medium border transition-all duration-300 ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className={`mt-8 text-sm ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}