export const fetchJobPosts = async (filterParams = {}) => {
    try {
        const validParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== undefined && value !== '')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const queryString = new URLSearchParams(validParams).toString();
        const url = `http://localhost:8080/jobposts${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
