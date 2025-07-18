"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cursor from "mouse-follower";
import gsap from "gsap";
import axios from "axios";
import "mouse-follower/dist/mouse-follower.min.css";
import { MdAttachFile } from "react-icons/md";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    interestedIn: [],
    attachment: null,
  });

  const [selectedFileName, setSelectedFileName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState({});

  const interests = [
    "Site from scratch",
    "UI/UX Design",
    "Product design",
    "Webflow site",
    "Branding",
    "Mobile development",
  ];

  const handleInterestClick = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(interest)
        ? prev.interestedIn.filter((item) => item !== interest)
        : [...prev.interestedIn, interest],
    }));

    // Clear interestedIn error when user selects an interest
    if (errors.interestedIn) {
      setErrors((prev) => ({
        ...prev,
        interestedIn: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/zip",
        "application/x-zip-compressed",
        "application/x-rar-compressed",
        "application/vnd.rar",
      ];

      console.log("File type check:", {
        fileType: file.type,
        isAllowed: allowedTypes.includes(file.type),
        allowedTypes: allowedTypes,
      });

      if (!allowedTypes.includes(file.type)) {
        console.log("File type rejected:", file.type);
        setErrors((prev) => ({
          ...prev,
          attachment:
            "Invalid file type. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX, TXT, ZIP, RAR",
        }));
        e.target.value = ""; // Clear the input
        return;
      }

      console.log("File type accepted:", file.type);
      // Clear any previous file errors
      setErrors((prev) => ({ ...prev, attachment: undefined }));
      setSelectedFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }));
    } else {
      setSelectedFileName("");
      setFormData((prev) => ({
        ...prev,
        attachment: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!", formData);
    setErrors({});

    // Validation
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name must be 2-50 characters and contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    if (formData.interestedIn.length === 0) {
      newErrors.interestedIn = "At least one interest must be selected";
    }

    console.log("Validation errors:", newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Form validation failed, stopping submission");
      setErrors(newErrors);
      return;
    }

    console.log("Validation passed, proceeding with submission...");

    setIsSubmitting(true);

    try {
      // Create FormData to handle file upload
      console.log("Creating FormData...");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      // Send each interest as a separate field for proper array handling
      console.log("Adding interests:", formData.interestedIn);
      formData.interestedIn.forEach((interest, index) => {
        formDataToSend.append(`interestedIn[${index}]`, interest);
      });

      // Add file if selected, otherwise don't append attachment field
      if (formData.attachment) {
        console.log("Adding file attachment:", {
          name: formData.attachment.name,
          type: formData.attachment.type,
          size: formData.attachment.size,
        });
        formDataToSend.append("attachment", formData.attachment);
      } else {
        console.log("No file attachment");
      }

     
      const response = await axios.post(
        "http://localhost:3000/send-email",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Email sent successfully:", response.data);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
        interestedIn: [],
        attachment: null,
      });
      setSelectedFileName("");

      // Show styled notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrors({ submit: "Error sending message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Initialize mouse-follower cursor only on non-mobile devices
    Cursor.registerGSAP(gsap);

    let cursor = null;

    const initializeCursor = () => {
      // Check if device is not mobile or tablet
      if (window.innerWidth > 1024) {
        // Only initialize if not already initialized
        if (!cursor) {
          cursor = new Cursor({
            container: document.body,
            speed: 0.5,
            ease: "expo.out",
            visibleTimeout: 300,
            hideNativeCursor: true,
          });
        }
      } else {
        // Destroy cursor if it exists and we're on mobile/tablet
        if (cursor) {
          cursor.destroy();
          cursor = null;
          // Restore native cursor
          document.body.style.cursor = "auto";
        }
      }
    };

    // Initialize after a short delay
    const timeout = setTimeout(initializeCursor, 300);

    // Re-initialize on resize (handles orientation changes)
    window.addEventListener("resize", initializeCursor);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initializeCursor);
      // Clean up cursor if it exists
      if (cursor) {
        cursor.destroy();
        cursor = null;
      }
    };
  }, []);

  return (
    <div className="py-20 md:py-40 px-4 md:px-8 lg:px-16 min-h-screen relative">
      {/* Success Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-8 right-8 z-50 bg-black text-white px-6 py-4 rounded-full shadow-lg border-2 border-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium">
              Message sent successfully! 🎉
            </span>
          </div>
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="text-4xl md:text-6xl lg:text-9xl italic pt-5 md:pt-10 tracking-tight leading-tight"
        style={{
          fontWeight: 300,
        }}
      >
        Hey! Tell us all <br /> the things 👋
      </motion.h1>

      <p className="pt-10 md:pt-20 text-xl md:text-2xl lg:text-3xl">
        I'm interested in...
      </p>
      <div className="pt-5 md:pt-10">
        <ul className="flex flex-wrap gap-3 md:gap-6 lg:gap-10 max-w-[900px]">
          {interests.map((interest, index) => {
            const isSelected = formData.interestedIn.includes(interest);
            return (
              <li
                key={index}
                onClick={() => handleInterestClick(interest)}
                className={`text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden ${
                  isSelected
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
                data-cursor-stick={`#contact-${index + 1}`}
                id={`contact-${index + 1}`}
              >
                <span
                  className={`inline-block transition-transform duration-500 ${
                    isSelected
                      ? "translate-y-[-155%]"
                      : "group-hover:translate-y-[-155%]"
                  } relative z-10`}
                >
                  {interest}
                </span>
                <span
                  className={`inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white ${
                    isSelected
                      ? "translate-y-[-160%]"
                      : "group-hover:translate-y-[-160%]"
                  } z-10`}
                >
                  {interest}
                </span>
                <span
                  className={`absolute bottom-0 left-4 right-0 rounded-full bg-black transition-all duration-500 z-[1] ${
                    isSelected ? "h-full" : "h-0 group-hover:h-full"
                  }`}
                ></span>
              </li>
            );
          })}
        </ul>
        {errors.interestedIn && (
          <p className="text-red-500 text-sm mt-4">{errors.interestedIn}</p>
        )}
      </div>

      <div className="pt-10 md:pt-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 md:gap-20"
        >
          <div className="w-full md:w-[80vw] lg:w-[60vw]">
            <input
              className={`border-b-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-black pb-2 md:pb-3 focus:outline-none w-full text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>
          <div className="w-full md:w-[80vw] lg:w-[60vw]">
            <input
              className={`border-b-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-black pb-2 md:pb-3 focus:outline-none w-full text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div className="w-full md:w-[80vw] lg:w-[60vw]">
            <input
              className={`border-b-2 ${
                errors.message ? "border-red-500" : "border-gray-300"
              } focus:border-black pb-2 md:pb-3 focus:outline-none w-full text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out`}
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">{errors.message}</p>
            )}
          </div>

          <div className="relative pt-10">
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 md:gap-3 text-lg md:text-2xl lg:text-4xl cursor-pointer pb-2 md:pb-3 transition-colors duration-300 ease-in-out w-fit"
            >
              <MdAttachFile className="text-lg md:text-2xl lg:text-3xl" />
              <span
                className={`border-b-2 pb-2 transition-colors duration-300 ${
                  selectedFileName
                    ? "border-black text-black"
                    : "border-gray-300"
                }`}
              >
                {selectedFileName || "Add attachment"}
              </span>
            </label>
            {errors.attachment && (
              <p className="text-red-500 text-sm mt-2">{errors.attachment}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mr-auto text-lg md:text-2xl lg:text-4xl p-6 md:p-12 lg:p-24 border-2 rounded-full relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            data-cursor-stick="#send-button"
            id="send-button"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-360%] relative z-10">
              {isSubmitting ? "Sending..." : "Send Request"}
            </span>
            <span className="inline-block absolute top-full left-0 w-full transition-transform duration-500 text-white group-hover:translate-y-[-360%] z-10">
              {isSubmitting ? "Sending..." : "Send Request"}
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </button>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-lg">{errors.submit}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
