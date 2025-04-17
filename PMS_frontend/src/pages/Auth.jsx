import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    contactNumber: "",
    experience: "",
    location: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      specialization: "",
      contactNumber: "",
      experience: "",
      location: "",
    });
    setIsDoctor(false);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:8080/auth/login", {
          username: formData.name,
          password: formData.password,
        });

        const token = response.data.token || response.data;

        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("userid", response.data.id);
        //update navbar url for medical-form
        window.dispatchEvent(new Event("userRoleChanged"));

        alert("Login Successful!!");

        setFormData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          contactNumber: "",
          experience: "",
          location: "",
        });
      } else {
        const requestData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          contactNumber: formData.contactNumber,
          role: isDoctor ? "doctor" : "patient",
        };

        if (isDoctor) {
          requestData.specialization = formData.specialization;
          requestData.experience = formData.experience;
          requestData.location = formData.location;
        }

        const response = await axios.post("http://localhost:8080/auth/register", requestData);
        alert("Registration successful!!");

        setFormData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          contactNumber: "",
          experience: "",
          location: "",
        });
        setIsDoctor(false);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setErrorMessage("Invalid username or password");
      } else {
        console.log(error.response);
        setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-primary">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-bold text-xl">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-xl font-bold">User name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-white"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-xl font-bold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-white"
            />
          </div>

          {!isLogin && (
            <>
               {/* Contact Number - visible for both roles */}
               <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold text-xl">Contact Number</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="cursor-pointer label justify-start space-x-3">
                  <input
                    type="checkbox"
                    checked={isDoctor}
                    onChange={() => setIsDoctor(!isDoctor)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-black font-bold">Register as Doctor</span>
                </label>
              </div>

             

              {isDoctor && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold text-xl">Specialization</span>
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold text-xl">Experience (in years)</span>
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold text-xl">Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-center font-medium">{errorMessage}</div>
        )}

        <div className="text-center text-black">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
