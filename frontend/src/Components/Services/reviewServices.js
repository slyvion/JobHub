export const addReview = async (id, reviewData) => {
    const response = await fetch(`http://localhost:8080/company/${id}/add-review`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        throw new Error("Failed to add review");
    }

    return response.json();
};
export const fetchAdminReviews = async (filterParams = {}) => {
    try {
        const validParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== undefined && value !== '')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const queryString = new URLSearchParams(validParams).toString();
        const url = `http://localhost:8080/reviews/admin${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
