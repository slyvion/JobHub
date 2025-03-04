export async function fetchUserData(id) {
    const response = await fetch(`http://localhost:8080/user/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    return response.json();
}

export async function fetchUserReviews(id) {
    const response = await fetch(`http://localhost:8080/reviews/user/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user reviews");
    }
    return response.json();
}

export const updateUserEmail = async (userId, email) => {
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}/emailUpdate`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Failed to update email");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating email:", error);
        throw error;
    }
};
