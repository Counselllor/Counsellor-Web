// Regex
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

// validation for each field
const validate = {
    firstName: (value)=>{
        return value.trim().length < 3
        ? { firstName: true, firstNameError: "First Name must be atleast 3 characters long." }
        : { firstName: false, firstNameError: false }
      },
      surname: (value)=>{
        return value.trim().length < 3
        ? { surname: true, surnameError: "Last Name must be atleast 3 characters long." }
        : { surname: false, surnameError: false }
      },
      email: (value) => {
        return emailRegex.test(value)
          ? { email: false, emailError: false }
          : { email: true, emailError: "Please enter a valid email address" }
      },
      password: (value)=>{
        return passwordRegex.test(value)
          ? { password: false, passwordError: false }
          : { password: true, passwordError: "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*) and 1 number (0-9)." }
      },
      loginPassword: (value)=>{
        return(!value.trim())
        ?{ password: true, passwordError: "Please fill this field" }
          :{ password: false, passwordError: false }
      },
      confirmPassword: (value, password)=>{
          return (value !== password)?
                 {confirmPassword: true, confirmPasswordError: "Password does not match"}:
                 { confirmPassword: false, confirmPasswordError: false }
      },
}

export default validate;
