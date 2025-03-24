export const mockLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "admin@test.com" && password === "admin") {
                resolve({ role: "admin", token: "fake-admin-token" });
            } else if (email === "user@test.com" && password === "user") {
                resolve({ role: "user", token: "fake-user-token" });
            } else {
                reject("Invalid credentials");
            }
        }, 1000);
    });
};
