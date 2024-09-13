"use client";
import {
  ConnectButton,
  SolanaChain,
  useAccount,
  useParticleAuth,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { PublicKey } from "@solana/web3.js";
import React, { useCallback, useEffect } from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import bs58 from "bs58";

const AuthButton = () => {
  const { data: session, status } = useSession();
  console.log("session", session, status);
  const { isConnected, address, chainId } = useAccount();
  const { getUserInfo } = useParticleAuth();
  const publicClient = usePublicClient<SolanaChain>();
  const [primaryWallet] = useWallets();

  const login = useCallback(async () => {
    console.log({ primaryWallet });
    if (!primaryWallet) return;
    const walletClient = primaryWallet.getWalletClient<SolanaChain>();
    const crsf = await getCsrfToken();
    const message = `By signing this message, you are logging into ${process.env.NEXT_PUBLIC_APP_NAME}\n${crsf}`;
    const nonce = new TextEncoder().encode(message);
    const { signature } = await walletClient.signMessage(nonce);
    const serializedSignature = bs58.encode(signature);
    const response = await signIn("credentials", {
      signature: serializedSignature,
      publicKey: address,
      redirect: false,
    });

    console.log("response", response);
    if (response?.ok) {
      console.log("Login successful");
    }
  }, [primaryWallet, address]);

  // const logout = useCallback(async () => {
  //   await signOut();
  // }, []);

  useEffect(() => {
    if (isConnected && status === "unauthenticated") {
      console.log("logging in");
      login();
    }
  }, [isConnected, status, login]);

  return (
    <div>
      <ConnectButton />
      <div>
        {isConnected && address ? (
          <div>
            {/* <button onClick={logout}>Logout</button> */}
            <div>Connected to {chainId}</div>
            <div>Address: {address}</div>
            <div>
              <button
                onClick={async () => {
                  const userInfo = await getUserInfo();
                  console.log(JSON.stringify(userInfo, null, 2));
                }}
              >
                Get User Info
              </button>
            </div>
            <div>
              <button
                onClick={async () => {
                  const balance = await publicClient?.getBalance(
                    new PublicKey(address)
                  );
                  console.log(balance);
                }}
              >
                Get balance
              </button>
            </div>
            <div>
              <button
                onClick={async () => {
                  const solanaClient =
                    await primaryWallet.getWalletClient<SolanaChain>();
                  console.log({ solanaClient, publicClient });
                }}
              >
                Get solana client
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AuthButton;
