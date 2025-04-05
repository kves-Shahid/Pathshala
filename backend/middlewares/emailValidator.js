const axios = require("axios");

const validateEmail = async (email) => {
    const apiKey = process.env.ABSTRACT_API_KEY;
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    try {
        const response = await axios.get(url);
        console.log("API Response:", response.data); 


        if (!response.data.is_valid_format.value) {
            return { isValid: false, message: "Invalid email format" };
        }
        
        if (response.data.is_disposable_email.value) {
            return { isValid: false, message: "Disposable emails are not allowed" };
        }
       
        if (response.data.deliverability === "UNDELIVERABLE") {
            return { isValid: false, message: "Email is not deliverable" };
        }

        return { isValid: true, message: "Email is valid" };
    } catch (error) {
        console.error("Email validation error:", error);
        return { isValid: false, message: "Email validation failed" };
    }
};

module.exports = validateEmail;