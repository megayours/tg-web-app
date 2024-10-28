"use client";

import { ConnectKitButton } from "connectkit";
import { Key, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import { useChromia } from "./chromia-context";
import { Button, Divider } from "@telegram-apps/telegram-ui";

import './styles.css';

const User: React.FunctionComponent<{
  username: string | undefined;
  onLogout: () => void;
}> = ({ username, onLogout }) => (
  <div className="flex items-center gap-2" data-testid="metamask">
    <Button mode="outline" onClick={onLogout}>
      <span className="auth-buttons-text">{username}</span>
      <LogOut className="auth-buttons-icon" />
    </Button>
  </div>
);

const UserButtons = () => {
  const { authStatus, connectToChromia, disconnectFromChromia, isLoading } =
    useChromia();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect(undefined, {
      onSettled: () => {
        disconnectFromChromia();
        // Delete FT_LOGIN_KEY_STORE from session storage
        sessionStorage.removeItem("FT_LOGIN_KEY_STORE");
      },
    });

    router.push("/");
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName, isConnecting }) => {
        if (!isConnected) {
          return (
            <Button className="sm:w-44" onClick={show}>
              Connect wallet
            </Button>
          );
        }

        const username = ensName ?? truncatedAddress;

        if (authStatus === "connected") {
          return (
            <>
              <div className="hidden h-full items-center gap-6 border-0 border-l border-solid border-border/20 pl-6 sm:flex">
                <div className="h-full w-px bg-border/20" />
                <User username={username} onLogout={handleLogout} />
              </div>
            </>
          );
        }

        return (
          <div className="flex flex-row space-x-2">
            {authStatus !== "notRegistered" && (
              <>
              <Button mode="filled" onClick={connectToChromia}>
              <span className="auth-buttons-text">Authenticate</span>
            </Button>
            </>
            )}
            <Divider className="login-divider" />
            <>
              <p>Want to use a different wallet?</p>
              <div className="hidden h-full items-center gap-6 border-0 border-l border-solid border-border/20 pl-6 sm:flex">
                <div className="h-full w-px bg-border/20" />
                <User username={username} onLogout={handleLogout} />
              </div>
            </>
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default UserButtons;
