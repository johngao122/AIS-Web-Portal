import React from "react";
import Alert from "./Alert";

interface AutoLoginNotificationProps {
    username: string;
}

/**
 * A notification to be displayed when the user is already logged in.
 *
 * It displays the username of the logged in user and a message indicating
 * that the user is being redirected to the dashboard.
 *
 * @param {AutoLoginNotificationProps} props the props of the component
 * @param {string} props.username the username of the logged in user
 * @returns {React.ReactElement} the component
 */
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
