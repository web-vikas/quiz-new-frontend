export const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
export const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
export const onlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
};

export const passwordValidate = (_, value) => {
    if (!value || isValidPassword(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Password must be at least 8 characters with uppercase, lowercase, and number'));
}

export const conFarmPasswordValuate = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match'));
    },
})