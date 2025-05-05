// const AmortizationTable = ({ schedule, currency }) => {
//     return (
//         <div className="overflow-x-auto max-h-96 overflow-y-auto shadow-lg rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Month
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Principal
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Interest
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                             Remaining Balance
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//                     {schedule.map((payment) => (
//                         <tr key={payment.month} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
//                                 {payment.month}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
//                                 {payment.principal.toFixed(2)} {currency}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
//                                 {payment.interest.toFixed(2)} {currency}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
//                                 {payment.balance.toFixed(2)} {currency}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AmortizationTable;





import { useApp } from '../context/AppContext';

const AmortizationTable = ({ schedule, currency }) => {
    const { convertCurrency } = useApp();

    // Format currency with proper symbols and formatting
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto max-h-96 overflow-y-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Principal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Interest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Remaining Balance
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {schedule.map((payment) => (
                        <tr key={payment.month} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {payment.month}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {formatCurrency(convertCurrency(payment.principal, 'USD', currency))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {formatCurrency(convertCurrency(payment.interest, 'USD', currency))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {formatCurrency(convertCurrency(payment.balance, 'USD', currency))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AmortizationTable;