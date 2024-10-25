import { useNavigate } from "react-router-dom";
import { signupController } from "../controllers/authController";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import StyledHr from "./StyledHr";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { userName, email, password } = values;
    const result = await signupController(email, password, userName);
    setSubmitting(false);
    if (result.success) {
      navigate("/login", {
        state: { message: "Sign up successful, you can now login" },
      });
    } else {
      console.log("Sign up failed", result);
      if (result.statusCode === 400) {
        setErrors({ general: result.message || "User doesn't exist" });
      } else {
        setErrors({ general: "An unexpected error occurred, try again!" });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} mb={5} textAlign="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="#3f51b5"
          fontWeight="bold"
        >
          Join the TrojApp Community!
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Your gateway to a smarter, secure life.
        </Typography>
      </Box>
      <Box>
        <Card elevation={10} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom color="#3f51b5">
              Create Your Account
            </Typography>
            <StyledHr />
            <Formik
              initialValues={{
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  {errors.general && <Alert severity="error">{errors.general}</Alert>}
                  <Field
                    as={TextField}
                    name="userName"
                    label="User Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="userName" />}
                    error={Boolean(errors.userName)}
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#f5f5f5",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&:hover fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="email" />}
                    error={Boolean(errors.email)}
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#f5f5f5",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&:hover fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="password" />}
                    error={Boolean(errors.password)}
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#f5f5f5",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&:hover fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="confirmPassword" />}
                    error={Boolean(errors.confirmPassword)}
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#f5f5f5",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&:hover fieldset": {
                          borderColor: "#3f51b5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  />
                  <StyledHr />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      bgcolor: "#3f51b5",
                      padding: "10px",
                      "&:hover": {
                        bgcolor: "#303f9f",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Button color="primary" onClick={() => navigate("/login")}>
                      Log in
                    </Button>
                  </Typography>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
