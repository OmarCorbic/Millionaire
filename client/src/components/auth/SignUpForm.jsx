import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateSignUp } from "../../utils/validate";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUpForm = ({ closeSignUpModal }) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        { ...values }
      );
      resetForm();
      closeSignUpModal();
      toast.success("Successfully signed up");
    } catch (error) {
      const { data } = error.response;
      setErrors({ response: data.msg });
      toast.error(data.msg);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateSignUp(values)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => (
          <Form>
            <div>
              <Field
                className="form-text-field"
                placeholder="Name"
                type="name"
                id="name"
                name="name"
              />
              {/* <ErrorMessage
              className="form-error-message"
              name="email"
              component="div"
            /> */}
            </div>
            <div>
              <Field
                className="form-text-field"
                placeholder="E-mail"
                type="email"
                id="email"
                name="email"
              />
              {/* <ErrorMessage
              className="form-error-message"
              name="email"
              component="div"
            /> */}
            </div>

            <div>
              <Field
                className="form-text-field"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
              />
              {/* <ErrorMessage
              className="form-error-message"
              name="password"
              component="div"
            /> */}
            </div>

            <button
              disabled={isSubmitting}
              className="function-button"
              type="submit"
            >
              Sign up
            </button>

            {/* <pre
              style={{ color: "white", fontSize: "0.4em", fontWeight: "300" }}
            >
              {JSON.stringify(errors, null, 4)}
            </pre>
            <pre
              style={{ color: "white", fontSize: "0.4em", fontWeight: "300" }}
            >
              {JSON.stringify(values, null, 4)}
            </pre> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
