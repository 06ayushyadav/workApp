import { useState, useEffect } from "react";

const PopupMessage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("popup");
    if (!shown) {
      setShow(true);
      localStorage.setItem("popup", "true");
    }
  }, []);

  const handleClose = () => setShow(false);
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative">
        <h2 className="text-2xl font-bold text-blue-700 mb-4"> Attention!</h2>
        <p className="text-gray-800 text-lg mb-6 leading-relaxed">
          Only <span className="font-semibold text-blue-600">Employers</span> are required to sign up or log in to post jobs or manage listings.<br />
          <br />
          If you are an <span className="font-semibold text-green-600">Employee</span>, you can freely browse and apply for jobs without creating an account.
        </p>
        <button
          onClick={handleClose}
          className="mt-2 px-5 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition"
        >
          Okay, I Understand
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
