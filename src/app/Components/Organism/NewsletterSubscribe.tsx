import React from "react";
import EmailInput from "../Atoms/EmailInput";
import InstagramButton from "../Atoms/InstagramButton";

export default function NewsletterSubscribe() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto flex items-start flex-col gap-4 ">
        {/* Left Section */}
        <div className="flex flex-col">
          <h3 className="font-L-500 text-text-primary">
            Subscribe to our Newsletter
          </h3>
        </div>
        <div className="flex flex-row justify-between w-full">
          <EmailInput />
          <InstagramButton />
        </div>
      </div>
    </section>
  );
}
