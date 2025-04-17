import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function Home() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Lottie animation related to healthcare and AI
    fetch('https://assets5.lottiefiles.com/packages/lf20_5ngs2ksb.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br  to-blue-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-white-700 leading-tight mb-4">
            AI-Powered Patient <br /> Management System
          </h1>
          <p className="text-lg text-white-700 mb-6">
            Welcome to the future of healthcare — streamline patient records and treatments with the power of AI.
          </p>
          <a
            href="."
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>

        {/* Right side animation */}
        <div className="flex justify-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-full max-w-md"
            />
          )}
        </div>
      </div>
    </section>
  );
}
