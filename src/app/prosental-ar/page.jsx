"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Animated Counter Component
const StatCard = ({ number, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const duration = 2000;
          
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * number));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [number, hasAnimated]);

  return (
     <div ref={ref} className="text-center p-4">
       <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
         {count}{suffix}
       </div>
       <div className="text-gray-700 md:text-base text-sm font-medium">{label}</div>
     </div>
   );
};
import Cursor from "mouse-follower";
import gsap from "gsap";
import axios from "axios";
import "mouse-follower/dist/mouse-follower.min.css";
import { MdAttachFile } from "react-icons/md";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { getAllProjects } from "../data/projects";

export default function ArabicLanding() {
  const router = useRouter();
  
  // Set RTL and Arabic language on component mount
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    
    return () => {
      // Reset to default when component unmounts
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, []);
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
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Arabic interests/services
  const interests = [
    "موقع من الصفر",
    "تصميم واجهة المستخدم",
    "تصميم المنتج",
    "تطبيقات الجوال",
    "الهوية التجارية",
    "التسويق الرقمي",
  ];

  // Services data in Arabic
  const services = [
    {
      id: 1,
      title: "تطوير المواقع الإلكترونية",
      description: "نقوم بتطوير مواقع إلكترونية حديثة وسريعة باستخدام أحدث التقنيات لضمان تجربة مستخدم مميزة وأداء عالي.",
      features: ["تصميم متجاوب", "سرعة عالية", "أمان متقدم", "تحسين محركات البحث"],
      video: "/mini1.mp4",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "تطبيقات الجوال",
      description: "نصمم ونطور تطبيقات جوال مبتكرة لنظامي iOS و Android بتقنيات متقدمة وواجهات سهلة الاستخدام.",
      features: ["تطبيقات أصلية", "تطبيقات هجينة", "واجهات مستخدم جذابة", "أداء محسن"],
      video: "/mini2.mp4",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "تصميم واجهة المستخدم",
      description: "نقدم تصاميم واجهات مستخدم عصرية وجذابة تركز على تجربة المستخدم وسهولة الاستخدام.",
      features: ["تصميم حديث", "تجربة مستخدم مميزة", "تصميم متجاوب", "اختبار قابلية الاستخدام"],
      video: "/mini3.mp4",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 4,
      title: "Hosting & Domains",
      description: "نوفر خدمات النشر والاستضافة وحجز النطاقات لضمان وصول موقعك للعملاء بأفضل أداء وأمان.",
      features: ["استضافة سحابية", "حجز النطاقات", "شهادات الأمان SSL", "نسخ احتياطية"],
      video: "/mini4.mp4",
      color: "from-orange-500 to-red-600"
    }
  ];

  // Get first 4 projects
  const projects = getAllProjects().slice(0, 4);

  const handleInterestClick = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(interest)
        ? prev.interestedIn.filter((item) => item !== interest)
        : [...prev.interestedIn, interest],
    }));

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
    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          attachment: "نوع الملف غير مدعوم. الأنواع المسموحة: JPEG, PNG, GIF, PDF, DOC, DOCX, TXT, ZIP, RAR",
        }));
        e.target.value = "";
        return;
      }

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
    setErrors({});

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (!validateName(formData.name)) {
      newErrors.name = "الاسم يجب أن يكون بين 2-50 حرف ويحتوي على أحرف فقط";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "الرسالة يجب أن تكون على الأقل 10 أحرف";
    }

    if (formData.interestedIn.length === 0) {
      newErrors.interestedIn = "يجب اختيار خدمة واحدة على الأقل";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("source", "Arabic Landing Page");

      formData.interestedIn.forEach((interest, index) => {
        formDataToSend.append(`interestedIn[${index}]`, interest);
      });

      if (formData.attachment) {
        formDataToSend.append("attachment", formData.attachment);
      }

      const response = await axios.post(
        "https://api.prosental.com/send-email",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        name: "",
        email: "",
        message: "",
        interestedIn: [],
        attachment: null,
      });
      setSelectedFileName("");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrors({ submit: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    Cursor.registerGSAP(gsap);
    let cursor = null;

    const initializeCursor = () => {
      if (window.innerWidth > 1024) {
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
        if (cursor) {
          cursor.destroy();
          cursor = null;
          document.body.style.cursor = "auto";
        }
      }
    };

    const timeout = setTimeout(initializeCursor, 300);
    window.addEventListener("resize", initializeCursor);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initializeCursor);
      if (cursor) {
        cursor.destroy();
        cursor = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Logo */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="https://prosental.com/">
          <Image
            src="/Techshun.png"
            height={40}
            width={140}
            priority
            alt="PROSENTAL"
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-8 left-8 z-50 bg-black text-white px-6 py-4 rounded-full shadow-lg border-2 border-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium">
              تم إرسال الرسالة بنجاح! 🎉
            </span>
          </div>
        </motion.div>
      )}



      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold text-black mb-8 leading-tight"
          >
            نحول أفكارك
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              إلى واقع رقمي
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            وكالة رقمية متخصصة في تطوير المواقع والتطبيقات وتصميم الهوية التجارية
            <br />
            نقدم حلول تقنية مبتكرة تساعد عملك على النمو والتميز
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection(contactRef)}
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ابدأ مشروعك الآن
            </button>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="border-2 border-black text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              تعرف على خدماتنا
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <div className="flex justify-center items-center  ">
              <StatCard number={200} suffix="+" label="مشروع مكتمل" />
              <StatCard number={150} suffix="+" label="عميل راضي" />
              <StatCard number={9} suffix="+" label="سنوات خبرة" />
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              خدماتنا
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الرقمية لتلبية جميع احتياجات عملك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setActiveService(index)}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <video
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    autoPlay
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  >
                    <source src={service.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-black rounded-full flex-shrink-0 ml-2"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              مشاريعنا
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              نفخر بالمشاريع التي أنجزناها وساعدت عملاءنا على تحقيق أهدافهم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <div className="relative overflow-hidden">
                  <video
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    autoPlay
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  >
                    <source src={project.previewVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {project.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {project.description.slice(0, 30)}...
                    </span>
                    <FaArrowLeft className="text-black group-hover:translate-x-1 transition-transform duration-300 text-sm" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              تواصل معنا
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              هل لديك فكرة مشروع؟ دعنا نساعدك في تحويلها إلى واقع رقمي مميز
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-6">معلومات التواصل</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-2  space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black">البريد الإلكتروني</p>
                      <p className="text-gray-600">info@prosental.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8  pt-6 border-t  border-gray-200">
                  <a
                    href="https://wa.me/201034674293?text=مرحباً، أريد الاستفسار عن خدماتكم"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (window.fbq) {
                        window.fbq('track', 'Contact');
                      }
                    }}
                    className="w-full flex items-center flex-row-reverse justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center  shadow-lg"
                  >
                    تواصل عبر واتساب 
                       <FaWhatsapp className="text-green-400 text-xl" />
                  </a>
                    
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-6">أرسل لنا رسالة</h3>
                
                <div className="mb-8">
                  <p className="text-lg font-semibold text-gray-700 mb-4">أنا مهتم بـ...</p>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest, index) => {
                      const isSelected = formData.interestedIn.includes(interest);
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleInterestClick(interest)}
                          className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 font-medium text-sm ${
                            isSelected
                              ? "bg-blue-500 text-white border-blue-500 shadow-lg transform scale-105"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interestedIn && (
                    <p className="text-red-400 text-sm mt-2">{errors.interestedIn}</p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      تفاصيل المشروع *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-gray-50 focus:bg-white ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="أخبرنا عن مشروعك بالتفصيل..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      إرفاق ملفات (اختياري)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-3">
                        <MdAttachFile className="text-gray-500 text-xl" />
                        <span className="text-gray-600">
                          {selectedFileName || "اختر ملف للإرفاق"}
                        </span>
                      </div>
                    </div>
                    {errors.attachment && (
                      <p className="text-red-400 text-sm mt-1">{errors.attachment}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}

                    className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg ${
                      isSubmitting ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب 🚀"}
                  </button>

                  {errors.submit && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-center">{errors.submit}</p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 text-white">
                PROSENTAL
              </h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                وكالة رقمية متخصصة في تطوير الحلول التقنية المبتكرة للشركات والأفراد فى جميع انحاء العالم
              </p>
            
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-blue-400">خدماتنا</h4>
              <ul className="space-y-3">
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">تطوير المواقع الإلكترونية</li>
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">تطوير التطبيقات</li>
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">تصميم واجهات المستخدم</li>
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">Hosting & Domains</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-blue-400">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-blue-400">📧</span>
                  <span className="text-gray-300">info@prosental.com</span>
                </div>
                <a
                  href="https://wa.me/201034674293?text=مرحباً، أريد الاستفسار عن خدماتكم"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center space-x-3 space-x-reverse hover:text-green-400 transition-colors cursor-pointer"
                >
                  <FaWhatsapp className="text-green-400 text-xl" />
                  <span className="text-gray-300">واتساب</span>
                </a>
              </div>
            </div>
          </div>
          

        </div>
      </footer>
    </div>
  );
}