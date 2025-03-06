export const fetchCompanies = async (filterParams = {}) => {
    try {
        const validParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== undefined && value !== '')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const queryString = new URLSearchParams(validParams).toString();
        const url = `http://localhost:8080/companies${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
export const fetchCompanyData = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch company data");
        }
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const fetchJobPostsByCompany = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/jobposts/company/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch job posts");
        }
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const fetchReviewsByCompany = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/reviews/company/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch reviews");
        }
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
export const updateCompanyBio = async (id, description) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateBio`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
        });
        if (!response.ok) throw new Error("Failed to update company description");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyName = async (id, companyName) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateName`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyName }),
        });
        if (!response.ok) throw new Error("Failed to update company name");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyWebsite = async (id, website) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateWebsite`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ website }),
        });
        if (!response.ok) throw new Error("Failed to update website");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyLocation = async (id, location) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateLocation`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location }),
        });
        if (!response.ok) throw new Error("Failed to update location");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
export const updateCompanyFounded = async (id, founded) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateFounded`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ founded }),
        });
        if (!response.ok) throw new Error("Failed to update founded year");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
export const updateCompanyPhone = async (id, phoneNumber) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updatePhone`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber }),
        });
        if (!response.ok) throw new Error("Failed to update phone number");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyEmail = async (id, email) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateEmail`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) throw new Error("Failed to update email");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyPassword = async (id, oldPassword, newPassword) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updatePassword`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldPassword, newPassword }),
        });
        if (!response.ok) throw new Error("Failed to update password");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyCover = async (id, coverImage) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateCover`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coverImage }),
        });
        if (!response.ok) throw new Error("Failed to update cover image");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateCompanyEmployeeNumber = async (id, employeeNumber) => {


    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateEmployeeNumber`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeNumber }),
        });
        if (!response.ok) throw new Error("Failed to update employee number");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};


export const updateCompanyLogo = async (id, logoImage) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateLogo`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ logoImage }),
        });
        if (!response.ok) throw new Error("Failed to update logo image");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
export const updateCompanyOffices = async (id, cities) => {
    try {
        const response = await fetch(`http://localhost:8080/company/${id}/updateOffices`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cities: Array.isArray(cities) ? cities : [] }),
        });

        if (!response.ok) throw new Error("Failed to update offices");
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};





