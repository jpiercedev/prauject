import React, { useState } from 'react';

interface OnboardingProps {
  onSubmit: (name: string) => void;
}

const Onboarding = ({ onSubmit }: OnboardingProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
    <h1 className="text-4xl font-serif text-white mb-6 mt-10 text-center">Hello, I'm Prauject.</h1>
    <p className="font-serif text-white mb-6 mt-10">...Your simple, lightweight project manager here to show off Jonathan’s development skills. I’m built with React, TypeScript, and Tailwind, and I keep things simple by storing everything in local storage. Let’s explore together!</p>
      <input
        type="text"
        placeholder="First off... What's your name?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-stone-700 p-4 mb-6 block w-full rounded-lg text-stone-500"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default Onboarding;