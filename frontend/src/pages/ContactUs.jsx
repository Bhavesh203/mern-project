import React from "react";
import { useForm, ValidationError } from '@formspree/react';

const ContactUs = () => {
    const [state, handleSubmit] = useForm("manenane");   
  return (
    <div className="container flex flex-col md:flex-row p-8">
      {/* Left Section */}
      <div className="md:w-1/2 p-4">
        <button className="border border-yellow-500 text-yellow-500 px-4 py-2 mb-4">
          CONTACT US
        </button>
        <h1 className="text-3xl font-bold mb-4">FEEL FREE TO CONTACT US</h1>
        <p className="mb-4">
          Torquent mattis iste nisl rerum, placerat do wisi. Interdum diam
          lorem sociis, mollitia eaque perspiciatis, esse nascetur morbi
          laboriosam sociis at nunc pede felis.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-full">
              {/* Location Icon */}
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 3.71 5.22 11.24 6.3 12.8.35.52 1.04.52 1.4 0C13.78 20.24 19 12.71 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>
            <p className="ml-4">123 Street, City, Country</p>
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-full">
              {/* Email Icon */}
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 11 5 6V6zm-7 7l-7-5h14l-7 5z" />
              </svg>
            </div>
            <p className="ml-4">contact@example.com</p>
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 rounded-full">
              {/* Phone Icon */}
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1.16 1.16 0 011.3-.27c1.12.48 2.33.75 3.6.75a1 1 0 011 1v3.42a1 1 0 01-1 1C10.9 22 2 13.1 2 4.5a1 1 0 011-1H6.42a1 1 0 011 1c0 1.27.27 2.48.75 3.6.13.3.05.65-.27 1.3l-2.2 2.2z" />
              </svg>
            </div>
            <p className="ml-4">+123-456-7890</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Subject"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            rows="4"
            placeholder="Message"
            id="message"
            name="message"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-yellow-500 text-white py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
  
    </div>
  );
};

export default ContactUs;
