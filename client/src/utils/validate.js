import { toast } from "react-hot-toast";

// validation

export async function validateName(values) {
  const errors = nameVerify({}, values);

  return errors;
}
export async function validatePassword(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

export async function validateResetPassword(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Passwords do not match");
  }

  return errors;
}

export async function validateSignUp(values) {
  const errors = nameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function validateLogIn(values) {
  const errors = emailVerify({}, values);
  loginPasswordVerify(errors, values);
  return errors;
}

// verification

function nameVerify(error = {}, values) {
  if (!values.name) {
    error.name = toast.error("Name required");
  } else if (values.name.includes(" ")) {
    error.name = toast.error("Invalid Name");
  }
  return error;
}

function loginPasswordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password required");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  const specialCharacters = /[1-9]+/;

  if (!values.password) {
    error.password = toast.error("Password required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid password");
  } else if (values.password.length <= 4) {
    error.password = toast.error("Password must be longer than 4 characters");
  } else if (!specialCharacters.test(values.password)) {
    error.password = toast.error("Password must include one or more numbers");
  }
  return error;
}

function emailVerify(error = {}, values) {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!values.email) {
    error.email = toast.error("E-mail required");
  } else if (!emailPattern.test(values.email)) {
    error.email = toast.error("Invalid e-mail");
  }
  return error;
}
