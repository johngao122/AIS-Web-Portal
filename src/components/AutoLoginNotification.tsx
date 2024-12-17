import React from "react";
import Alert from "./Alert";

interface AutoLoginNotificationProps {
    username: string;
}

const AutoLoginNotification = ({ username }: AutoLoginNotificationProps) => {
    const message = (
        <>
            You are already logged in,{" "}
            <span className="font-medium">{username}</span>! Redirecting to
            dashboard...
        </>
    );

    return <Alert message={message} type="success" position="top" />;
};

export default AutoLoginNotification;
