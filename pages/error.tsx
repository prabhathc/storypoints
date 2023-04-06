import { NextPage } from 'next';
import { useRouter } from 'next/router';
// import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  const errorCode = router.query.errorCode || '';
  const errorMessage = router.query.message || '';

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <FaExclamationTriangle className="h-16 w-16 text-red-600" /> */}
      <h1 className="text-3xl font-bold mt-8">Error {errorCode}</h1>
      <p className="text-lg mt-4">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
