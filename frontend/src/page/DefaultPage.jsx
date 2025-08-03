import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
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

  return (
    <>
      {showReminder && (
        <Reminder
          renderFormLogin={() => setShowLogin(true)}
          renderFormRegister={() => setShowRegister(true)}
        />
      )}
      <NavbarComponent></NavbarComponent>
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
