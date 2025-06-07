"use client";
import { socialLinks, workingHours } from "@/lib/constants";
import { I_SocialLink, I_WorkingHour } from "@/lib/interfaces";
import URLS from "@/lib/urls";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegClock, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import RenderMap from "../core/RenderMap";
import SectionHeader from "../core/SectionHeader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(URLS.contactApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setSubmitted(true);
        setShowConfirmationModal(true);
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(
        `Failed to send message. ${
          (error as Error).message || "An unexpected error occurred."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ from_name: "", from_email: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div id="contact-us" className="px-5 lg:px-32 my-24">
      <SectionHeader
        title="Get in touch with us"
        description="Got questions or comments? Reach out to us and someone from our team
          will respond promptly."
        label="Let's Connect"
      />

      <section className="flex flex-col lg:flex-row gap-y-8 lg:gap-y-0 lg:gap-x-4 items-start justify-between">
        {/* Form or Thank You message */}
        <div className="lg:w-1/2 self-stretch">
          {!submitted ? (
            <form onSubmit={handleOnSubmit} className="space-y-4">
              <Input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                disabled={loading}
              />

              <Input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
                className="h-40 overflow-y-scroll resize-none"
                disabled={loading}
              />

              <div className="flex gap-x-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="px-8 py-4"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-4 font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-x-2">
                      <FaSpinner className="animate-spin" />{" "}
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-8 bg-green-50 rounded-md border border-green-200 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Thank you for reaching out!
              </h3>
              <p className="mb-6">
                We received your message and will respond to you as soon as possible.
              </p>
              <Button onClick={resetForm} className="px-8 py-4 font-semibold">
                Send Another Message
              </Button>
            </div>
          )}
        </div>

        {/* Map and Info */}
        <div className="lg:w-1/2 flex flex-col self-stretch">
          <RenderMap mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0782087455714!2d37.010848175738786!3d-1.10361193545534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f475f31591ec5%3A0x372bedd06ee6a9ee!2sCk%20plaza!5e0!3m2!1sen!2ske!4v1748710297255!5m2!1sen!2ske" />
          <div className="flex flex-col gap-y-8 md:flex-row gap-x-5 mt-6">
            <div className="border border-black rounded-md md:w-1/2 py-4 space-y-5">
              <div className="flex items-center justify-center gap-x-2">
                <FaRegClock size={20} />
                <h3 className="font-semibold text-xl">Working Hours</h3>
              </div>
              <ul className="px-2 space-y-2">
                {workingHours.map(({ day, time }) => (
                  <WorkingHourSlot key={day} day={day} time={time} />
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {socialLinks.map(({ icon, href }, index) => (
                <SocialRow key={index} icon={icon} href={href} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md text-center shadow-lg">
            <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
            <p className="mb-4">
              Thank you for getting in touch. We’ll respond as soon as possible.
            </p>
            <Button
              onClick={() => setShowConfirmationModal(false)}
              className="px-6 py-3"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const WorkingHourSlot: React.FC<I_WorkingHour> = ({ day, time }) => (
  <li>
    <span className="font-semibold">{day}:</span> <span>{time}</span>
  </li>
);

const SocialRow: React.FC<I_SocialLink> = ({ icon, href }) => {
  const IconComponent = icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy. Please try again.");
    }
  };

  return (
    <div
      className="w-full flex gap-x-3 border border-black rounded-md items-center p-2 hover:shadow-2xl duration-300 cursor-pointer"
      onClick={handleCopy}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center gap-x-2 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <IconComponent size={50} />
      </Link>
    </div>
  );
};

export default GetInTouch;
