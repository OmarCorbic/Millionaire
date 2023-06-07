import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { validateLogIn } from "../../utils/validate";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logIn } from "../../features/user/userSlice";

const LogInForm = ({ closeLoginModal }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { ...values }
      );
      const { token, name } = response.data;
      localStorage.setItem("token", token);
      dispatch(logIn({ name }));
      resetForm();
      closeLoginModal();
      toast.success("Successfully logged in");
    } catch (error) {
      const { data } = error.response;
      setErrors({ response: data.msg });
      toast.error(data.msg);
    }
    // Perform login logic or API call here
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateLogIn(values)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => (
          <Form>
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
              Log in
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
            </pre>{" "} */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LogInForm;
