"use client";

import React, { useState } from 'react';

export default function ApplicationForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "e01847f3-9b79-41ff-86c7-b07cca510155"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Application submitted successfully!");
        (e.target as HTMLFormElement).reset(); // Clear the form
      } else {
        console.error("Error", data);
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <p className="text-[#bf7140] text-xs font-bold uppercase tracking-widest mb-3">
            House Hunting
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Low income Rentals Application Form
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Tell us what you are looking for and we will get back to you with the best options available.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[24px] shadow-sm p-6 md:p-10">
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* Section: PERSONAL DETAILS */}
            <div>
              <SectionHeader title="Personal Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Full name" name="full_name" placeholder="e.g. John Doe" required />
                <InputGroup label="Phone number" name="phone_number" placeholder="e.g. +1 (380) 589-8845" type="tel" required />
                <div className="md:col-span-2">
                  <InputGroup label="Email address" name="email" placeholder="e.g. john@email.com" type="email" required />
                </div>
                <div className="md:col-span-2">
                  <InputGroup label="Current address" name="current_address" placeholder="4317 W Avenue 23, Los Angeles, CA 93365" required />
                </div>
              </div>
            </div>

            {/* Section: HOUSE PREFERENCES */}
            <div>
              <SectionHeader title="House Preferences" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Preferred location" name="preferred_location" placeholder="e.g. Los Angeles, Cali" required />
                <InputGroup label="Budget ($)" name="budget" placeholder="e.g. 2,000" required />
                
                <SelectGroup 
                  label="Property type" 
                  name="property_type"
                  defaultOption="Select type" 
                  options={['Flat/Apartment', 'Duplex', 'Bungalow', 'Terrace', 'Detached house', 'Semi-detached']}
                  required
                />
                <SelectGroup 
                  label="No. of bedrooms" 
                  name="bedrooms"
                  defaultOption="Select" 
                  options={['1 bedroom', '2 bedroom', '3 bedroom', '4 bedroom', '5+ bedroom']}
                  required
                />
              </div>
            </div>

            {/* Section: VIEWING & MOVE-IN */}
            <div>
              <SectionHeader title="Viewing & Move-in" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Ideal viewing date" name="ideal_viewing_date" type="date" required />
                <InputGroup label="Preferred move-in date" name="preferred_move_in_date" type="date" required />
                
                <div className="md:col-span-2">
                  <SelectGroup 
                    label="How soon can you make your rent payment?" 
                    name="rent_payment_timeline"
                    defaultOption="Select" 
                    options={['Immediately', 'Within 1 week', 'Within 2 weeks', 'Within a month']}
                    required
                  />
                </div>
                
                {/* Compulsory Fields Requested */}
                <div className="md:col-span-2">
                  <InputGroup 
                    label="How much do you currently have to secure the property?" 
                    name="available_funds" 
                    placeholder="e.g. $4,000" 
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <SelectGroup 
                    label="Which payment method would you prefer to pay the application fee $75 which is refundable" 
                    name="payment_method"
                    defaultOption="Select" 
                    options={['Zelle', 'Chime', 'CashApp', 'BTC']}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section: LIFESTYLE */}
            <div>
              <SectionHeader title="Lifestyle" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <RadioGroup label="Do you smoke?" name="smokes" />
                <RadioGroup label="Do you have kids?" name="has_kids" />
                <div className="md:col-span-2">
                  <RadioGroup label="Do you have pets?" name="has_pets" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional notes</label>
                <textarea 
                  name="additional_notes"
                  rows={4}
                  placeholder="Any specific requirements or questions..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#bf7140] focus:ring-1 focus:ring-[#bf7140] transition-colors placeholder:text-gray-400 bg-[#fcfcfc] resize-y"
                ></textarea>
              </div>

              {/* Terms Checkbox */}
              <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-5 flex items-start gap-3 mb-8">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="agreed_to_terms"
                  required
                  className="mt-1 w-4 h-4 text-[#bf7140] border-gray-300 rounded focus:ring-[#bf7140]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I confirm that all information provided is accurate and I agree to the terms & conditions. I understand that viewing of a property requires prior approval.
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>

              {/* Submit Button & Status Message */}
              <div className="flex flex-col gap-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#ae6c44] hover:bg-[#9a5d38] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit application"}
                </button>
                
                {status && (
                  <p className={`text-center text-sm font-medium ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                    {status}
                  </p>
                )}
              </div>
            </div>

          </form>
        </div>
        
        {/* Privacy Note Outside Form */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your details are kept private and used only to match you with available properties.
          </p>
        </div>

      </div>
    </div>
  );
}

/* --- Helper Components --- */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[#be754b] text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
        {title}
      </span>
      <hr className="grow border-gray-100" />
    </div>
  );
}

function InputGroup({ label, name, placeholder, type = "text", required = false }: { label: string, name: string, placeholder?: string, type?: string, required?: boolean }) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type} 
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#bf7140] focus:ring-1 focus:ring-[#bf7140] transition-colors placeholder:text-gray-400 bg-[#fcfcfc]"
      />
    </div>
  );
}

function SelectGroup({ label, name, defaultOption, options, required = false }: { label: string, name: string, defaultOption: string, options: string[], required?: boolean }) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select 
          name={name}
          required={required}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#bf7140] focus:ring-1 focus:ring-[#bf7140] transition-colors bg-[#fcfcfc] appearance-none"
          defaultValue=""
        >
          <option value="" disabled hidden>{defaultOption}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RadioGroup({ label, name }: { label: string, name: string }) {
  // Hardcoding required visual cue since the inputs inside are required
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value="yes" required className="w-4 h-4 text-[#bf7140] border-gray-300 focus:ring-[#bf7140]" />
          <span className="text-sm text-gray-700">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value="no" required className="w-4 h-4 text-[#bf7140] border-gray-300 focus:ring-[#bf7140]" />
          <span className="text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
  );
}