import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
            <p className="mb-6">The page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;