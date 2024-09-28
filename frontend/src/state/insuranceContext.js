import React, { createContext, useState, useContext } from 'react';

const InsuranceContext = createContext();

export const useInsurance = () => useContext(InsuranceContext);

export const InsuranceProvider = ({ children }) => {
  const [insuranceData, setInsuranceData] = useState(null);

  const updateInsuranceData = (data) => {
    setInsuranceData(data);
  };

  return (
    <InsuranceContext.Provider value={{ insuranceData, updateInsuranceData }}>
      {children}
    </InsuranceContext.Provider>
  );
};