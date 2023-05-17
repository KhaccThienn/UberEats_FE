import { createSearchParams, useNavigate } from "react-router-dom";

export const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname, params) => {
    console.log({ pathname, search: `?${createSearchParams(params)}` });
    navigate({ pathname, search: `?${createSearchParams(params)}` });
  };
};
