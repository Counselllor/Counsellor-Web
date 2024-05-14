// Regex
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

// Validation for each field
const validate = {
  firstName: (value) => {
    const isValid = value.trim().length >= 3;
    return {
      firstName: !isValid,
      firstNameError: isValid ? false : "First Name must be at least 3 characters long.",
    };
  },
  surname: (value) => {
    const isValid = value.trim().length >= 3;
    return {
      surname: !isValid,
      surnameError: isValid ? false : "Last Name must be at least 3 characters long.",
    };
  },
  email: (value) => {
    const isValid = emailRegex.test(value);
    return {
      email: !isValid,
      emailError: isValid ? false : "Please enter a valid email address",
    };
  },
  password: (value) => {
    const isValid = passwordRegex.test(value);
    return {
      password: !isValid,
      passwordError: isValid ? false : "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*) and 1 number (0-9).",
    };
  },
  loginPassword: (value) => {
    const isValid = !!value.trim();
    return {
      password: !isValid,
      passwordError: isValid ? false : "Please fill this field",
    };
  },
  confirmPassword: (value, password) => {
    const isValid = value === password;
    return {
      confirmPassword: !isValid,
      confirmPasswordError: isValid ? false : "Password does not match",
    };
  },
  dob: (value) => {
    const dob = new Date(value);
    const today = new Date();
    const isValid = (dob.getFullYear() + 10) < today.getFullYear();
    return {
      dob: isValid,
      dobError: isValid ? false : "Invalid Date-of-Birth. Age must be at least 10 years.",
    };
  },
};

export default validate;

