export async function fetchUserData(id) {
    const response = await fetch(`http://localhost:8080/user/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    return response.json();
}

export async function fetchUserReviews(id) {
    const response = await fetch(`http://localhost:8080/user/${id}/reviews`);
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

export const fetchAppliedJobs = async (userId) => {
    const response = await fetch(`http://localhost:8080/user/${userId}/appliedJobs`);
    if (!response.ok) {
        throw new Error("Failed to fetch applied jobs");
    }
    return response.json();
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
export const saveJobPost = async (userId, jobPostId) => {
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}/saveJob/${jobPostId}`, {
            method: 'POST',
        });

    } catch (error) {
        console.error("Error saving job post:", error);
    }
};

export const removeSavedJobPost = async (userId, jobPostId) => {
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}/removeJob/${jobPostId}`, {
            method: 'DELETE',
        });

    } catch (error) {
        console.error("Error removing saved job post:", error);
    }
};

export const getSavedJobPosts = async (userId) => {
        const response = await fetch(`http://localhost:8080/user/${userId}/savedJobPosts`);
        if (!response.ok) {
            throw new Error("Failed to fetch saved jobposts");
        }
        return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:8080/user/${id}/delete`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }

    return response;
};

export const verifyUserPassword = async (id, password) => {
    const response = await fetch(`http://localhost:8080/user/${id}/verifyPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
    return response;
};

export async function updateUserRole(userId, newRole) {
    const response = await fetch(`http://localhost:8080/user/${userId}/roleUpdate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userRole: newRole }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.message || response.statusText;
        throw new Error(`Failed to update user role: ${errorMsg}`);
    }

    return response;
}


