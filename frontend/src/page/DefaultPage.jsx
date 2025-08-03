import React, { useState, useEffect } from "react";
import Reminder from "../components/Reminder";
import FormRegister from "../components/form/formRegister";
import ItemProduct from "../components/ItemProduct";
import FormLogin from "../components/form/formLogin";
import BannerSection from "../components/bannerSection";
import MidSection from "../components/midSection";

function DefaultPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  
  useEffect(() => {
    if (sessionStorage.getItem("isLogin")) setShowReminder(false);
  }, []);

  return (
    <>
      {showReminder && (
        <Reminder
          renderFormLogin={() => setShowLogin(true)}
          renderFormRegister={() => setShowRegister(true)}
          setShowReminder={() => setShowReminder(false)}
        />
      )}
      <BannerSection></BannerSection>
      <MidSection></MidSection>
      {showRegister && (
        <FormRegister renderForm={() => setShowRegister(false)}></FormRegister>
      )}
      {showLogin && (
        <FormLogin renderForm={() => setShowLogin(false)}></FormLogin>
      )}
      <ItemProduct></ItemProduct>
    </>
  );
}

export default DefaultPage;
