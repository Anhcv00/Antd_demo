import React, { useEffect, useState } from "react";
import { fetchContracts } from "../services/contract.js";

const ContractComponents = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts().then((data) => {
      setContracts(data.content);
    });
  }, []);

  return <div></div>;
};

export default ContractComponents;
