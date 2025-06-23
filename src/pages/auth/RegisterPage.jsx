import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button, CircularProgress, Divider } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { activationToken } from "@redux/slices/authSlice";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  School as SchoolIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { data = {}, isLoading, error, isError, isSuccess }] =
    useRegisterMutation();

  const formSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      )
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  function onSubmit(formData) {
    register(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      dispatch(activationToken(data));
      navigate("/verify-otp");
    }
  }, [isSuccess, data.message, navigate, dispatch, data]);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password?.length >= 8 },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  return (
    <div className="from-primary-50 to-secondary-50 flex min-h-screen items-center justify-center bg-gradient-to-br via-white p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="from-primary-500 to-primary-600 shadow-medium mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
            <SchoolIcon className="text-3xl text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join thousands of learners and start your journey today
          </p>
        </div>

        {/* Register Form */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <PersonIcon className="text-gray-400" />
                </div>
                <FormField
                  name="name"
                  control={control}
                  Component={TextInput}
                  error={errors["name"]}
                  className="input-field !pl-10"
                  placeholder="Enter your full name"
                />
              </div>
              {errors["name"] && (
                <p className="text-error-600 text-sm">
                  {errors["name"].message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EmailIcon className="text-gray-400" />
                </div>
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
                <p className="text-error-600 text-sm">
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
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="text-gray-400" />
                </div>
                <FormField
                  name="password"
                  control={control}
                  type={showPassword ? "text" : "password"}
                  Component={TextInput}
                  error={errors["password"]}
                  className="input-field !pl-10 !pr-10"
                  placeholder="Create a strong password"
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
                <p className="text-error-600 text-sm">
                  {errors["password"].message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="space-y-2 rounded-xl bg-gray-50 p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckIcon
                        className={`text-sm ${req.met ? "text-success-500" : "text-gray-300"}`}
                      />
                      <span
                        className={`text-xs ${req.met ? "text-success-600" : "text-gray-500"}`}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="text-gray-400" />
                </div>
                <FormField
                  name="confirmPassword"
                  control={control}
                  type={showConfirmPassword ? "text" : "password"}
                  Component={TextInput}
                  error={errors["confirmPassword"]}
                  className="input-field !pl-10 !pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <VisibilityIcon className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors["confirmPassword"] && (
                <p className="text-error-600 text-sm">
                  {errors["confirmPassword"].message}
                </p>
              )}
            </div>

            {/* Error Alert */}
            {isError && (
              <Alert severity="error" className="!rounded-xl">
                {error?.data?.message}
              </Alert>
            )}

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
                "Create Account"
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

          {/* Social Register Buttons */}
          <div className="space-y-3">
            <Button
              variant="outlined"
              fullWidth
              className="!border-gray-300 !py-3 !text-gray-700 hover:!bg-gray-50"
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="!border-gray-300 !py-3 !text-gray-700 hover:!bg-gray-50"
              startIcon={<FacebookIcon />}
            >
              Continue with Facebook
            </Button>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
