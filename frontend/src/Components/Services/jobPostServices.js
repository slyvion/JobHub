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

export const Tags = [
    "Angular",
    "Android",
    "AWS",
    "Azure",
    "C",
    "C++",
    "C#",
    "Cloud",
    "DevOps",
    "Docker",
    "Flutter",
    "Git",
    "GraphQL",
    "iOS",
    "Jenkins",
    "Jira",
    "Kafka",
    "Kotlin",
    "Kubernetes",
    "Laravel",
    "Linux",
    "MySQL",
    "M365",
    ".NET",
    "Node.js",
    "Next.js",
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
    "Vue.js",
    "Java"
];

