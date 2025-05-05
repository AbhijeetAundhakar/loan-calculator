import { useApp } from '../context/AppContext';

const ErrorPage = () => {
    const { error } = useApp();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Error</h1>
            <p className="mb-4">{error || 'An unexpected error occurred.'}</p>
            <p>Please try again later or contact support if the problem persists.</p>
        </div>
    );
};

export default ErrorPage;