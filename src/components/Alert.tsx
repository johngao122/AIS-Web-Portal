import React, { ReactNode } from "react";

type AlertType = "success" | "error" | "warning" | "info";
type AlertPosition = "top" | "bottom";

interface AlertProps {
    message: ReactNode;
    type?: AlertType;
    position?: AlertPosition;
}

export const Alert = ({
    message,
    type = "success",
    position = "top",
}: AlertProps) => {
    const colors: Record<AlertType, string> = {
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    };

    return (
        <div className={`w-full ${colors[type]} border-b`}>
            <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="flex justify-center items-center">
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
