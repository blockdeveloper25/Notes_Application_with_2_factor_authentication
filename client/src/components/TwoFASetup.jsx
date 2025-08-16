import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";

const TwoFASetup = ({ onSetupComplete }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const fetchQRCode = async () => {
    const { data } = await setup2FA();
    console.log(data);
    setResponse(data);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);
  const copyClipBoard = (e) => {
  navigator.clipboard.writeText(response.secret)
    .then(() => alert("Copied!"))
    .catch(err => console.error("Failed to copy:", err));
};
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="text-gray-200 my-6" />
      <p className="text-center text-gray-600 text-lg font-light px-2">
        Scan the QR code code below with Authenticator
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          {response.QRCode ? (
            <img src={response.QRCode} alt="2FA QR code" className="mb-4" />
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center mt-3 mb-3">
          <div className="border-t border-gray-200 flex-grow"></div>
          <div className="text-gray-600 text-sm text-center font-light pr-2 pl-2">
            OR Enter the code Manually
          </div>
          <div className="border-t border-1 border-gray-200 flex-grow">
            {message && (
              <p className="text-green-600 text-sm mb-3"> {message}</p>
            )}
          </div>
        </div>
        <input
          readOnly
          defaultValue=""
          value={response.secret}
          className="w-full border rounded mt-2 text-sm text-gray-600 p-4"
          onClick={copyClipBoard}
        />
        <button
          onClick={onSetupComplete}
          className="w-full bg-blue-500 py-2 text-white rounded-md"
        >
          Continue to verification
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
