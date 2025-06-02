
export async function login(email, password) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
    }

    return response.json();
}
export async function registerCompany(companyDto) {
    const response = await fetch('http://localhost:8080/auth/register/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyDto),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Company registration failed');
    }

    return response.text();
};

export async function registerUser(userDto) {
    const response = await fetch('http://localhost:8080/auth/register/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDto),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'User registration failed');
    }

    return response.text();
};

export const navigateToProfile = async (navigate) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:8080/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Not authenticated');

        const result = await response.json();
        const { type, data } = result;

        if (type === 'user') {
            navigate(`/user/${data.id}`);
        } else if (type === 'company') {
            navigate(`/company/${data.id}`);
        }
    } catch (err) {
        console.error('Profile fetch error:', err);
        navigate('/sign-in');
    }
};