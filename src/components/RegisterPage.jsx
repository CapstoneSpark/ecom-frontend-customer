// // // import React, { useState } from "react";
// // // import { registerUser } from "../services/authService";
// // // import { useNavigate } from "react-router-dom";

// // // export default function RegisterPage() {
// // //   const navigate = useNavigate();

// // //   const [form, setForm] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     phone: "",
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");

// // //   const handleChange = (e) => {
// // //     setForm({
// // //       ...form,
// // //       [e.target.name]: e.target.value,
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");

// // //     try {
// // //       await registerUser(form);
// // //       setSuccess("Registration successful! Redirecting...");
// // //       setTimeout(() => navigate("/login"), 1200);
// // //     } catch (err) {
// // //       setError("Registration failed. Try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
// // //       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
// // //         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
// // //           Create Account
// // //         </h2>

// // //         {error && <p className="text-red-500 text-center">{error}</p>}
// // //         {success && <p className="text-green-600 text-center">{success}</p>}

// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <input
// // //             name="firstName"
// // //             placeholder="First Name"
// // //             value={form.firstName}
// // //             onChange={handleChange}
// // //             className="w-full border p-3 rounded-lg"
// // //             required
// // //           />

// // //           <input
// // //             name="lastName"
// // //             placeholder="Last Name"
// // //             value={form.lastName}
// // //             onChange={handleChange}
// // //             className="w-full border p-3 rounded-lg"
// // //             required
// // //           />

// // //           <input
// // //             name="phone"
// // //             placeholder="Phone"
// // //             value={form.phone}
// // //             onChange={handleChange}
// // //             className="w-full border p-3 rounded-lg"
// // //           />

// // //           <input
// // //             name="email"
// // //             type="email"
// // //             placeholder="Email"
// // //             value={form.email}
// // //             onChange={handleChange}
// // //             className="w-full border p-3 rounded-lg"
// // //             required
// // //           />

// // //           <input
// // //             name="password"
// // //             type="password"
// // //             placeholder="Password"
// // //             value={form.password}
// // //             onChange={handleChange}
// // //             className="w-full border p-3 rounded-lg"
// // //             required
// // //           />

// // //           <button
// // //     type="submit"
// // //     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
// // //   >
// // //     Register
// // //   </button>

// // //           <p className="text-center text-gray-600">
// // //             Already have an account?{" "}
// // //             <a href="/login" className="text-indigo-600 font-medium">
// // //               Login
// // //             </a>
// // //           </p>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import { User, Phone, Mail, Lock } from "lucide-react";
// // import { registerUser } from "../services/authService";
// // import { useNavigate } from "react-router-dom";

// // export default function RegisterPage() {
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     phone: "",
// //     email: "",
// //     password: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     try {
// //       await registerUser(form);
// //       setSuccess("Account created! Redirecting to login...");
// //       setTimeout(() => navigate("/login"), 1200);
// //     } catch {
// //       setError("Registration failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
// //       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
// //         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
// //           Create Account
// //         </h2>

// //         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
// //         {success && <p className="text-green-600 text-center mb-4">{success}</p>}

// //         <form onSubmit={handleSubmit} className="space-y-6">

// //           {/* FIRST NAME */}
// //           <div className="relative">
// //             <User className="absolute left-3 top-3 text-gray-400" size={20} />
// //             <input
// //               type="text"
// //               name="firstName"
// //               placeholder="First Name"
// //               value={form.firstName}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
// //             />
// //           </div>

// //           {/* LAST NAME */}
// //           <div className="relative">
// //             <User className="absolute left-3 top-3 text-gray-400" size={20} />
// //             <input
// //               type="text"
// //               name="lastName"
// //               placeholder="Last Name"
// //               value={form.lastName}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
// //             />
// //           </div>

// //           {/* PHONE */}
// //           <div className="relative">
// //             <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
// //             <input
// //               type="text"
// //               name="phone"
// //               placeholder="Phone"
// //               value={form.phone}
// //               onChange={handleChange}
// //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
// //             />
// //           </div>

// //           {/* EMAIL */}
// //           <div className="relative">
// //             <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
// //             />
// //           </div>

// //           {/* PASSWORD */}
// //           <div className="relative">
// //             <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={form.password}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-indigo-300"
// //             />
// //           </div>

          

// //           <button
// //     type="submit"
// //     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
// //   >
// //     Register
// //   </button>

// //           <p className="text-center text-gray-600">
// //             Already have an account?{" "}
// //             <a href="/login" className="text-indigo-600 font-medium">
// //               Login
// //             </a>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { User, Phone, Mail, Lock } from "lucide-react";
// import { registerUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const validateForm = () => {
//     if (!form.firstName.trim()) return "First name is required";
//     if (form.firstName.length < 2) return "First name must be at least 2 characters";
//     if (!form.lastName.trim()) return "Last name is required";
//     if (form.lastName.length < 2) return "Last name must be at least 2 characters";
//     if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
//       return "Phone number must be 10 digits";
//     }
//     if (!form.email.trim()) return "Email is required";
//     if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
//     if (!form.password.trim()) return "Password is required";
//     if (form.password.length < 6) return "Password must be at least 6 characters";
//     return null;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) return setError(validationError);

//     setLoading(true);

//     try {
//       await registerUser(form);
//       setSuccess("Account created! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 1200);
//     } catch {
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Create Account
//         </h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {success && <p className="text-green-600 text-center mb-4">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* FIRST NAME */}
//           <div className="relative">
//             <User className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={form.firstName}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* LAST NAME */}
//           <div className="relative">
//             <User className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={form.lastName}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* PHONE */}
//           <div className="relative">
//             <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone (optional)"
//               value={form.phone}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* EMAIL */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
//               loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Processing..." : "Register"}
//           </button>

//           <p className="text-center text-gray-600">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-600 font-medium hover:underline">
//               Login
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { User, Phone, Mail, Lock, Loader2, Check } from "lucide-react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        return "";
      case "phone":
        if (value && !/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          return "Phone number must be 10 digits";
        }
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        return "";
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate on change if field was touched
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      password: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validateAllFields()) return;

    setLoading(true);

    try {
      await registerUser(form);
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setApiError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if field is valid (touched and no error)
  const isFieldValid = (name) => {
    return touched[name] && !errors[name] && form[name].trim();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}
        {success && (
          <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
            <Check size={20} />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FIRST NAME */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                  errors.firstName && touched.firstName ? "border-red-500" : ""
                } ${isFieldValid("firstName") ? "border-green-500" : ""}`}
              />
              {isFieldValid("firstName") && (
                <Check className="absolute right-3 top-3 text-green-500" size={20} />
              )}
            </div>
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* LAST NAME */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                  errors.lastName && touched.lastName ? "border-red-500" : ""
                } ${isFieldValid("lastName") ? "border-green-500" : ""}`}
              />
              {isFieldValid("lastName") && (
                <Check className="absolute right-3 top-3 text-green-500" size={20} />
              )}
            </div>
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                  errors.email && touched.email ? "border-red-500" : ""
                } ${isFieldValid("email") ? "border-green-500" : ""}`}
              />
              {isFieldValid("email") && (
                <Check className="absolute right-3 top-3 text-green-500" size={20} />
              )}
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${
                  errors.password && touched.password ? "border-red-500" : ""
                } ${isFieldValid("password") ? "border-green-500" : ""}`}
              />
              {isFieldValid("password") && (
                <Check className="absolute right-3 top-3 text-green-500" size={20} />
              )}
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}