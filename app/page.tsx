'use client';

import Image from "next/image";
import {
  FormEvent,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";

import { submitLead } from "@/app/actions";

const testimonials = [
  {
    id: 1,
    quote:
      "A3 Tech Ideas transformed our business operations with AI automation.",
    author: "CEO, U.S. Retail Startup",
    image: "/lady.svg",
  },
  {
    id: 2,
    quote:
      "A3 Tech Ideas transformed our business operations with AI automation.",
    author: "CEO, U.S. Retail Startup",
    image: "/lady.svg",
  },
  {
    id: 3,
    quote:
      "A3 Tech Ideas transformed our business operations with AI automation.",
    author: "CEO, U.S. Retail Startup",
    image: "/lady.svg",
  },
  {
    id: 4,
    quote:
      "A3 Tech Ideas transformed our business operations with AI automation.",
    author: "CEO, U.S. Retail Startup",
    image: "/lady.svg",
  },
];

export default function Home() {
  const [showPhone, setShowPhone] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [statusMessage, setStatusMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const totalSlides = testimonials.length;

  const countryCodes = useMemo(
    () => [
      { code: "+1", label: "US" },
      { code: "+44", label: "UK" },
      { code: "+61", label: "AU" },
      { code: "+91", label: "IN" },
      { code: "+234", label: "NG" },
    ],
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatusMessage(null);

      const payload = {
        name,
        email,
        phoneCountryCode,
        phoneNumber,
        company,
        service,
      };

      startTransition(async () => {
        try {
          await submitLead(payload);
          setStatusMessage({
            type: "success",
            text: "Thanks! We will reach out shortly.",
          });
          setName("");
          setEmail("");
          setPhoneNumber("");
          setCompany("");
          setService("");
          setPhoneCountryCode("+1");
        } catch (error) {
          setStatusMessage({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : "We couldn't submit the form. Please try again.",
          });
        }
      });
    },
    [
      company,
      email,
      name,
      phoneCountryCode,
      phoneNumber,
      service,
      startTransition,
    ]
  );

  const goToSlide = useCallback(
    (index: number) => {
      const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setActiveSlide(normalizedIndex);
    },
    [totalSlides]
  );

  const handleNext = useCallback(() => {
    goToSlide(activeSlide + 1);
  }, [activeSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  const togglePhone = useCallback(() => {
    setShowPhone((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-3">
        <Image
            src="/a3.svg"
            alt="A3 Tech Ideas Logo"
            width={180}
            height={60}
            className="w-[120px] sm:w-[150px] h-auto lg:w-[500px] lg:ml-22 lg:mt-5"
          priority
        />
        </div>
        <div className="flex items-center gap-3">
          <a
            id="phone-contact"
            href="tel:+15413134454"
            className={`flex items-center gap-2 bg-white border border-[#F56F19] text-[#F56F19] rounded-full shadow-sm overflow-hidden transition-all duration-300 ease-in-out origin-right ${
              showPhone
                ? "max-w-[240px] px-4 py-2 opacity-100 translate-x-0"
                : "max-w-0 px-0 py-0 opacity-0 translate-x-2"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a3 3 0 013-3h2a1 1 0 011 1v2a1 1 0 01-.293.707L6.414 7.707a9.042 9.042 0 004.879 4.879l2-2A1 1 0 0114 10h2a1 1 0 011 1v2a3 3 0 01-3 3h-.25C7.271 16 4 12.729 4 8.25V8a3 3 0 013-3H7" />
            </svg>
            <span className="whitespace-nowrap text-sm sm:text-base font-semibold">
              +1 541-313-4454
            </span>
          </a>
          <button
            type="button"
            onClick={togglePhone}
            aria-expanded={showPhone}
            aria-controls="phone-contact"
            className="bg-[#F56F19] rounded-full p-2 sm:p-3 flex items-center justify-center text-white shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F56F19]"
          >
            <span className="sr-only">Toggle phone number</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 relative pb-20 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="w-full max-w-3xl md:pl-4 lg:pl-8 xl:pl-12 2xl:pl-16">
            <h1 className="font-bold text-black leading-[1.1] sm:leading-tight tracking-tight text-[clamp(2.25rem,3.8vw,4.5rem)] mb-4 sm:mb-6">
              <span className="block sm:whitespace-nowrap">Transform Your Business with AI,</span>
              <span className="block sm:whitespace-nowrap">Automation & Digital Innovation</span>
          </h1>
            <p className="text-[#817E7E] leading-relaxed text-[clamp(1rem,1.7vw,1.875rem)] mt-4 sm:mt-6 md:mt-7 lg:mt-8 max-w-2xl">
              Empowering USA businesses with cutting-edge technology and growth-driven strategies.
            </p>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("request-callback")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#F56F19] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90 transition-colors mt-6 sm:mt-9 md:mt-10 lg:mt-12 xl:mt-16"
            >
              Get Free Consultation
            </button>
          </div>
          <div className="flex justify-center sm:justify-end items-end lg:absolute lg:right-12 xl:right-16 lg:bottom-12 mt-8 lg:mt-0">
            <video
              src="/video.mp4"
              className="w-full max-w-[360px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Technology showcase video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 lg:py-24 lg:px-16 bg-gray-50">
    <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-8 sm:mb-12">Our Expertises</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-x-8 sm:gap-y-16 lg:gap-y-26">
            
            {/* 1. Software Development */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">Software Development</h3>
            </div>
            
            {/* 2. Cloud Security (New Icon: Shield with Lock) */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.95c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">Cloud Security</h3>
            </div>
            
            {/* 3. Branding & Marketing */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">Branding & Marketing</h3>
            </div>
            
            {/* 4. IT Consulting (New Icon: Briefcase) */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 6h-2c0-.82-.67-1.5-1.5-1.5S14 5.18 14 6h-4c0-.82-.67-1.5-1.5-1.5S7 5.18 7 6H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H6V8h12v10zM10 6h4v1h-4V6z"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">IT Consulting</h3>
            </div>
            
            {/* 5. Process Automation (New Icon: Circular Arrows/Flow) */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26l1.44-1.44C6.54 14.62 6 13.37 6 12c0-3.31 2.69-6 6-6zm6.76 1.74l-1.44 1.44C17.46 9.38 18 10.63 18 12c0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">Process Automation</h3>
            </div>
            
            {/* 6. Artificial Intelligence */}
            <div className="bg-white rounded-lg px-4 sm:px-6 py-5 sm:py-6 shadow-sm flex flex-col items-center relative pt-10 sm:pt-12 min-h-[120px] sm:min-h-[140px]">
                <div className="bg-[#fff] rounded-full p-3 sm:p-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        <circle cx="7" cy="7" r="1.5"/>
                        <circle cx="17" cy="7" r="1.5"/>
                        <circle cx="7" cy="17" r="1.5"/>
                        <circle cx="17" cy="17" r="1.5"/>
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#555555] text-center px-2">Artificial Intelligence</h3>
            </div>
            
        </div>
    </div>
</section>

      {/* Why Choose A3 Tech Ideas Section */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 lg:py-30 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-8 sm:mb-12">Why Choose A3 Tech Ideas?</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-8 lg:gap-x-12 lg:gap-y-16">
            {/* Proven experience */}
            <div className="bg-white rounded-lg px-6 sm:px-8 lg:px-10 py-6 sm:py-8 shadow-sm border border-black flex flex-col items-center justify-center relative pt-10 sm:pt-12 lg:pt-14 min-h-[160px] sm:min-h-[180px]">
              <div className="bg-[#FAFAFA] rounded-full p-3 sm:p-4 lg:p-5 flex items-center justify-center w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 absolute -top-10 sm:-top-11 lg:-top-12 left-1/2 transform -translate-x-1/2">
                <svg className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-[300] text-[#000] text-center px-2">Proven experience across 100+ businesses</h3>
            </div>
            {/* AI-powered approach */}
            <div className="bg-white rounded-lg px-6 sm:px-8 lg:px-10 py-6 sm:py-8 shadow-sm border border-black flex flex-col items-center justify-center relative pt-10 sm:pt-12 lg:pt-14 min-h-[160px] sm:min-h-[180px]">
              <div className="bg-[#FAFAFA] rounded-full p-3 sm:p-4 lg:p-5 flex items-center justify-center w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 absolute -top-10 sm:-top-11 lg:-top-12 left-1/2 transform -translate-x-1/2">
                <svg className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-[300] text-[#000] text-center px-2">AI-powered approach to scale your results</h3>
            </div>
            {/* Cloud-secured */}
            <div className="bg-white rounded-lg px-6 sm:px-8 lg:px-10 py-6 sm:py-8 shadow-sm border border-black flex flex-col items-center justify-center relative pt-10 sm:pt-12 lg:pt-14 min-h-[160px] sm:min-h-[180px]">
              <div className="bg-[#FAFAFA] rounded-full p-3 sm:p-4 lg:p-5 flex items-center justify-center w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 absolute -top-10 sm:-top-11 lg:-top-12 left-1/2 transform -translate-x-1/2">
                <svg className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-[300] text-[#000] text-center px-2">Cloud-secured, future-ready technology</h3>
            </div>
            {/* Fast delivery */}
            <div className="bg-white rounded-lg px-6 sm:px-8 lg:px-10 py-6 sm:py-8 shadow-sm border border-black flex flex-col items-center justify-center relative pt-10 sm:pt-12 lg:pt-14 min-h-[160px] sm:min-h-[180px]">
              <div className="bg-[#FAFAFA] rounded-full p-3 sm:p-4 lg:p-5 flex items-center justify-center w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 absolute -top-10 sm:-top-11 lg:-top-12 left-1/2 transform -translate-x-1/2">
                <svg className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#F47D1F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V8h12v2z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-[300] text-[#000] text-center px-2">Fast delivery & ongoing support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 lg:py-30 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-8 sm:mb-12">Testimonials</h2>
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white/60">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-full flex flex-col items-center text-center px-4 sm:px-6 py-10 sm:py-12 gap-6"
                  >
                    <Image
                      src={item.image}
                      alt="Testimonial profile"
                      width={210}
                      height={210}
                      className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[210px] lg:h-[210px]"
                    />
                    <p className="text-lg sm:text-xl lg:text-2xl text-[#252424] max-w-2xl">
                      "{item.quote}" — {item.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white border border-[#F56F19] text-[#F56F19] rounded-full p-2 shadow-sm transition hover:bg-[#F56F19] hover:text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.293 15.293a1 1 0 010 1.414l-.083.094a1 1 0 01-1.32.083l-.094-.083-5-5a1 1 0 01-.083-1.32l.083-.094 5-5a1 1 0 011.497 1.32l-.083.094L8.414 10l3.879 3.879a1 1 0 010 1.414z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white border border-[#F56F19] text-[#F56F19] rounded-full p-2 shadow-sm transition hover:bg-[#F56F19] hover:text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 4.707a1 1 0 010-1.414l.083-.094a1 1 0 011.32-.083l.094.083 5 5a1 1 0 01.083 1.32l-.083.094-5 5a1 1 0 01-1.497-1.32l.083-.094L11.586 10 7.707 6.121a1 1 0 010-1.414z" />
              </svg>
            </button>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "bg-[#F56F19] w-7"
                      : "bg-[#FBC8A2] w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="request-callback" className="px-4 sm:px-8 py-12 sm:py-16 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-8 sm:mb-12">
            Request a Callback
          </h2>
          <div className="grid lg:grid-cols-[minmax(0,0.75fr)_auto] gap-8 sm:gap-12 items-center">
            <div className="bg-[#FAFAFA] rounded-lg p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] placeholder:text-[#8E8E8E] text-sm sm:text-base text-[#1F1F1F]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] placeholder:text-[#8E8E8E] text-sm sm:text-base text-[#1F1F1F]"
                  required
                />
                <div className="flex flex-row flex-wrap items-center gap-3 sm:flex-nowrap">
                  <label className="sr-only" htmlFor="phone-country-code">
                    Country code
                  </label>
                  <select
                    id="phone-country-code"
                    value={phoneCountryCode}
                    onChange={(event) => setPhoneCountryCode(event.target.value)}
                    className="w-auto min-w-[5.5rem] px-4 py-3 bg-[#F0F0F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] text-sm sm:text-base text-[#1F1F1F]"
                    required
                  >
                    {countryCodes.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.label} ({option.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  className="flex-1 min-w-[10rem] px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] placeholder:text-[#8E8E8E] text-sm sm:text-base text-[#1F1F1F]"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] placeholder:text-[#8E8E8E] text-sm sm:text-base text-[#1F1F1F]"
                />
                <input
                  type="text"
                  placeholder="What Service are you looking for?"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56F19] placeholder:text-[#8E8E8E] text-sm sm:text-base text-[#1F1F1F]"
                />
                {statusMessage ? (
                  <p
                    className={`text-sm sm:text-base font-medium ${
                      statusMessage.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {statusMessage.text}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#F56F19] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Submitting..." : "Get Your Free Strategy Call"}
                </button>
              </form>
            </div>
            <div className="flex justify-center lg:-translate-y-12 lg:-translate-x-2 transition-transform">
              <video
                src="/lastvideo.mp4"
                className="w-full max-w-[200px] sm:max-w-[380px] lg:max-w-[320px] rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Lead form visual"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F56F19] px-4 sm:px-8 py-8 sm:py-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <a
              href="https://www.instagram.com/a3ideanix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Visit us on Instagram"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/a3-tech-ideasoregon/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Visit us on LinkedIn"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.067-.926-2.067-2.065 0-1.138.92-2.063 2.067-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCYbA4T9j9r5CEH2j67N0RDQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Visit us on YouTube"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 12c0 2.52-.21 4.02-.61 5.01a3.66 3.66 0 0 1-1.58 1.58c-.99.4-2.49.61-5.01.61h-8.2c-2.52 0-4.02-.21-5.01-.61a3.66 3.66 0 0 1-1.58-1.58C1.1 16.02.9 14.52.9 12s.21-4.02.61-5.01A3.66 3.66 0 0 1 3.09 5.4c.99-.4 2.49-.61 5.01-.61h8.2c2.52 0 4.02.21 5.01.61a3.66 3.66 0 0 1 1.58 1.59c.4.98.61 2.48.61 5.01zm-13.5 3.14 6.33-3.14-6.33-3.14v6.28z" />
              </svg>
            </a>
          </div>
          <p className="text-white text-center text-sm sm:text-base">4480 Holgate St, Roseburg, OR, USA</p>
        </div>
      </footer>
    </div>
  );
}
