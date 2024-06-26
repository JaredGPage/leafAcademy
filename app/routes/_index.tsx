// import React from "react";
import { MetaFunction } from "@remix-run/node";

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "Safe Environment",
    description:
      "At Leaf Academy, we prioritize safety above all else. Our facility is designed to provide a secure and nurturing environment for your children.",
  },
  {
    title: "Engaging Activities",
    description:
      "We offer a variety of engaging activities tailored to the interests and developmental needs of children aged 6 to 10.",
  },
  {
    title: "Qualified Staff",
    description:
      "Our staff consists of qualified professionals who are passionate about childcare and dedicated to creating a positive experience for every child.",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Leaf Academy - Aftercare for Children | Local Pre-primary School" },
    {
      name: "description",
      content:
        "Leaf Academy offers aftercare services for children aged 6 to 10. We provide a safe environment with engaging activities and qualified staff.",
    },
  ];
};



export default function Index() {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col justify-center items-center">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-green-900">Welcome to Leaf Academy</h1>
      <p className="mt-2 text-lg text-green-700">
        Aftercare for Children Aged 6-10
      </p>
    </header>
    
    <main className="max-w-4xl px-4 py-8 bg-white shadow-md rounded-lg">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Our Commitment
        </h2>
        <p className="text-lg text-gray-700">
          Leaf Academy is committed to providing a safe and nurturing environment where children can thrive.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Key Features
        </h2>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="text-lg text-gray-700">
              <h3 className="font-bold text-green-900">{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700">
          Have questions or ready to enroll? Contact us today!
        </p>
        <p className="mt-2 text-lg text-gray-700">
          Phone: (123) 456-7890
        </p>
        <p className="text-lg text-gray-700">
          Email: info@leafacademy.com
        </p>
      </section>
    </main>
  </div>
);
}