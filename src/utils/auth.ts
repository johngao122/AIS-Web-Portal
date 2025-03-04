let refreshIntervalId: NodeJS.Timeout | null = null;

/**
 * Syncs user data between localStorage and sessionStorage.
 * If there's data in localStorage but not in sessionStorage, copies it to sessionStorage.
 * @returns The user data object if found, null otherwise
 */
export const syncStorageOnLoad = () => {
    const localUser = localStorage.getItem("User");
    const sessionUser = sessionStorage.getItem("User");

    if (localUser && !sessionUser) {
        // If user was previously logged in with "Remember Me", sync to session
        sessionStorage.setItem("User", localUser);
        return JSON.parse(localUser);
    }

    return sessionUser ? JSON.parse(sessionUser) : null;
};

export const setupTokenRefresh = () => {
    // Clear any existing interval
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
    }

    const refreshToken = async () => {
        try {
            const storedUser = syncStorageOnLoad();
            if (!storedUser || !storedUser.refreshToken) {
                throw new Error("No valid refresh token found");
            }

            const API = process.env.NEXT_PUBLIC_API;

            const response = await fetch(`${API}/refresh`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${storedUser.refreshToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const newTokens = await response.json();
                if (!newTokens.access_token) {
                    throw new Error("Invalid token response");
                }

                const updatedUserData = {
                    ...storedUser,
                    token: newTokens.access_token,
                    refreshToken:
                        newTokens.refresh_token || storedUser.refreshToken, // Keep old refresh token if new one not provided
                };

                sessionStorage.setItem("User", JSON.stringify(updatedUserData));
                if (localStorage.getItem("User")) {
                    localStorage.setItem(
                        "User",
                        JSON.stringify(updatedUserData)
                    );
                }
            } else {
                // If refresh fails, clear everything and redirect
                clearInterval(refreshIntervalId!);
                sessionStorage.removeItem("User");
                localStorage.removeItem("User");

                // Use history API for navigation to prevent hard refresh
                window.history.pushState({}, "", "/login");
                // Dispatch a navigation event so React can handle the route change
                window.dispatchEvent(new PopStateEvent("popstate"));
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            // Clear tokens on error
            clearInterval(refreshIntervalId!);
            sessionStorage.removeItem("User");
            localStorage.removeItem("User");

            // Log the actual error for debugging
            console.error("Refresh error details:", {
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
                status: error instanceof Response ? error.status : "unknown",
            });

            // Use history API for navigation to prevent hard refresh
            window.history.pushState({}, "", "/login");
            // Dispatch a navigation event so React can handle the route change
            window.dispatchEvent(new PopStateEvent("popstate"));
        }
    };

    // Start the refresh interval
    refreshIntervalId = setInterval(refreshToken, 3600000); // 1 hour

    // Also refresh immediately
    refreshToken();
};

export const clearTokenRefresh = () => {
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
};
