import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Divider } from "@mui/material";
import { token } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useState } from "react";

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isError, isSuccess }] =
    useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      )
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    login(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      dispatch(token(data));
      navigate("/", {
        state: {
          email: getValues("email"),
        },
      });
    }
  }, [
    isError,
    data,
    login,
    error,
    dispatch,
    data.message,
    isSuccess,
    navigate,
    getValues,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-medium">
            <SchoolIcon className="text-3xl text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FormField
                  name="email"
                  control={control}
                  Component={TextInput}
                  error={errors["email"]}
                  className="input-field !pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors["email"] && (
                <p className="text-sm text-error-600">
                  {errors["email"].message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FormField
                  name="password"
                  control={control}
                  type={showPassword ? "text" : "password"}
                  Component={TextInput}
                  error={errors["password"]}
                  className="input-field !pl-10 !pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <VisibilityIcon className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors["password"] && (
                <p className="text-sm text-error-600">
                  {errors["password"].message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot"
                className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
              className="btn-primary !py-3 !text-base"
            >
              {isLoading ? (
                <CircularProgress size="20px" className="!text-white" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <Divider>
              <span className="bg-white px-4 text-sm text-gray-500">
                or continue with
              </span>
            </Divider>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
