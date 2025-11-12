import React, { useState, useEffect } from "react";

const PhotoURL = ({ keyval, url }) => {
  const [error, setError] = useState(false);
  const [show, setShowPhoto] = useState(false);
  const [loading, setLoading] = useState(true);

  // rerender image when url changes
  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [url]);

  return (
    <>
      <img
        key={keyval}
        src={url}
        onLoad={() => setLoading(false)}
        onClick={() => setShowPhoto(true)}
        onError={() => setError(!loading && true)} // only error when loading is completed and there is an error
        className="w-1/2 h-full rounded-lg object-cover"
      />
      {!loading && show && !error && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowPhoto(false)}
        >
          <img
            key={keyval}
            src={url}
            className="absolute z-20 max-w-4xl max-h-[90vh] rounded-lg object-contain shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default PhotoURL;
