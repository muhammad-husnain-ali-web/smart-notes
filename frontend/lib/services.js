const API = import.meta.env.VITE_API;


// Register API call
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const res = await response.json();
        return res;
    } catch (error) { 
        console.error("Error:", error);
    }
};

// Login API call
export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const res = await response.json();
        return res;
    } catch (error) { 
        console.error("Error:", error);
    }
};

// Logout API call
export async function logout() {
    try{
    let r = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    let res = await r.json();
    return res

    } catch (error) { 
        console.error("Error:", error);
    }
}

// Get user info API call
export async function getUserInfo() {
    try {
        let r = await fetch(`${API}/auth/me`, {
            credentials: "include"
        });
        let res = await r.json();
        return res;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const createNote = async (noteData) => {
    try {
        const response = await fetch(`${API}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(noteData),
        });
        const res = await response.json();
        return res;
    } catch (error) { 
        console.error("Error:", error);
    }
};