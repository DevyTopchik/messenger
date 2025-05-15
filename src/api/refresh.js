// refresh.js
export function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    return fetch("https://textchat-ast1.onrender.com/api/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Refresh failed");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("u_id", data.accessToken);
            return data.accessToken;
        })
        .catch((error) => {
            console.error("Token refresh failed:", error);
            localStorage.setItem("isLoginned", false);
            localStorage.removeItem("u_id");
            localStorage.removeItem("refreshToken");
            throw error;
        });
}
