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
export const updateUserPassword = async (id, oldPassword, newPassword, confirmPassword) => {
    const response = await fetch(`http://localhost:8080/user/${id}/passwordUpdate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });

    if (!response.ok) {
        throw new Error("Failed to update password");
    }
};

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

export const fetchAdminUsers = async (filterParams = {}) => {
    try {
        const validParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== undefined && value !== '')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const queryString = new URLSearchParams(validParams).toString();
        const url = `http://localhost:8080/user/admin${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
