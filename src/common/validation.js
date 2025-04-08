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
      dob: (value)=>{
        // Check if the date format is valid
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(value)) {
          return {dob: true, dobError: "Invalid date format."}
        }

        // Check if year is valid (4 digits between 1900-2099)
        const year = parseInt(value.split('-')[0]);
        if (year < 1900 || year > 2099) {
          return {dob: true, dobError: "Year must be between 1900 and 2099."}
        }

        const dob = new Date(value);
        const today = new Date();

        if((dob.getFullYear()+10) < today.getFullYear()){
          return { dob: false, dobError: false }
        }else{
          return {dob: true, dobError: "Invalid Date-of-Birth. Age must be atleast 10 years."}
        }
      }
}

export default validate;
