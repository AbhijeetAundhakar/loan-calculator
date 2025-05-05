const About = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">About Loan Calculator</h1>
            <p className="mb-4">
                This loan calculator helps you determine your monthly EMI payments and provides
                a detailed amortization schedule for your loan.
            </p>
            <p className="mb-4">
                Features include:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>EMI calculation using standard formula</li>
                <li>Amortization schedule showing principal and interest breakdown</li>
                <li>Live exchange rates for currency conversion</li>
                <li>Dark and light mode themes</li>
            </ul>
            <p>
                Live deployment: <a href="https://abhijeetaundhakar.github.io/loan-calculator/" className="text-blue-600 hover:underline">Click here</a>
            </p>
        </div>
    );
};

export default About;