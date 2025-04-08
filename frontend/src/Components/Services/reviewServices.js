export const addReview = async (id, reviewData) => {
    const response = await fetch(`http://localhost:8080/${id}/add-review`, {
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
