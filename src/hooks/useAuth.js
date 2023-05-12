import { useState } from "react";

const useAuth = () => {
  const [authData, setAuthData] = useState(null);

  const updateAuthData = (data) => {
    setAuthData(data);
  };

  return {
    authData,
    updateAuthData,
  };
};

export default useAuth;
