"use client";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import AuthForm from "@/components/AuthForm";
import { useEffect, useState } from "react";
import useSFAAuthCheck from "@/hooks/useSFAAuthCheck";
import { decodeToken } from "@web3auth/single-factor-auth";

export default function Home() {
  const { loginWithRedirect } = useAuth0();
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { user, getIdTokenClaims } = useAuth0();

  // useSFAAuthCheck();
  const handleRedirectToSky = async () => {
    if (!user) return;
    const idToken = (await getIdTokenClaims())?.__raw;
    if (!idToken) {
      console.error("No Auth0 ID token found");
      return;
    }

    // Decode token to get user info
    const { payload } = decodeToken(idToken);
    console.log({ idToken });
    window.location.href = `http://localhost:3001?token=${encodeURIComponent(
      idToken
    )}`;
  };

  // useEffect(() => {
  //   if (user) handleRedirectToSky();
  // }, [user]);

  return (
    <div className="flex flex-col gap-8 px-12">
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isNewsletterChecked={isNewsletterChecked}
        setIsNewsletterChecked={setIsNewsletterChecked}
        handleRedirectToSky={handleRedirectToSky}
      />
    </div>
  );
}
