
const ValidateForm = (values) => {
    let errors = {};

    if(!values.firstname) {
        errors.firstname = "Firstname Required"
    }
    if(!values.lastname) {
        errors.lastname = "Lastname Required"
    }
    if(!values.email) {
        errors.email = "Email Required"
    }
    if(!values.password) {
        errors.password = "Password Required"
    }
    else if(values.password.length< 8){
        errors.password= "Password must contain atleast 8 characters"
    }
    
    return errors;
}

export default ValidateForm;