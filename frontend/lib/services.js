const API = import.meta.env.VITE_API;

export const Test = async () => {
 const body = {
  name: "test",
  description: "test",
 };
    try {
        const response = await fetch(`${API}/test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }       catch (error) { 
        console.error("Error:", error);
    }
};