export const fetchJobPosts = async (filterParams = {}, page = 0, size = 10) => {
    try {
        const validParams = Object.entries(filterParams)
            .filter(([_, value]) => value !== undefined && value !== "")
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const url = `http://localhost:8080/jobposts/search?page=${page}&size=${size}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validParams),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};


export const fetchJobPost = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/jobposts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job details:', error);
        throw error;
    }
};

export const deleteJobPost = async (id) => {
    const response = await fetch(`http://localhost:8080/jobposts/${id}/delete`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete job post');
    }

    return response;
};


export async function createJobPost(jobPostData, token) {
    const response = await fetch("http://localhost:8080/jobposts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobPostData),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create job post: ${errorData}`);
    }

    return response.json();
}



export const updateJobPost = async (id, jobPostData) => {
    try {
        const response = await fetch(`http://localhost:8080/jobposts/${id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobPostData),
        });
        if (!response.ok) {
            throw new Error("Failed to update job post");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const apply = async (jobPostId, userId, formData) => {
    const token = localStorage.getItem("token");
    return await fetch(`http://localhost:8080/jobposts/${jobPostId}/apply`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
};

export const getApplicantsByJobPostId = async (jobPostId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/jobposts/${jobPostId}/applicants`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch applicants.");
    }

    return await response.json();
};

export async function updateApplicantStatus(jobPostId, applicantId, status) {
    const response = await fetch(`http://localhost:8080/jobposts/${jobPostId}/applicants/${applicantId}/updateStatus?status=${status}`, {
        method: "PUT",
    });
    if (!response.ok) throw new Error("Failed to update status");
}




export const Tags = [
    ".NET",
    "AWS",
    "Android",
    "Angular",
    "Azure",
    "C",
    "C#",
    "C++",
    "Cloud",
    "DevOps",
    "Docker",
    "Flutter",
    "Git",
    "GraphQL",
    "Java",
    "JavaScript",
    "Jenkins",
    "Jira",
    "Kafka",
    "Kotlin",
    "Kubernetes",
    "Laravel",
    "Linux",
    "M365",
    "MySQL",
    "Next.js",
    "Node.js",
    "Oracle",
    "PHP",
    "PostgreSQL",
    "PyTorch",
    "Python",
    "React",
    "Rust",
    "Scala",
    "Selenium",
    "SQL",
    "Spring Boot",
    "Swift",
    "TensorFlow",
    "TypeScript",
    "Vue.js"
];


