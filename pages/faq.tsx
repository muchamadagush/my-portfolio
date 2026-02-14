/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react'
import Head from 'next/head'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

interface FAQItem {
  question: string
  answer: string
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      question: 'What services do you offer?',
      answer: 'I offer full-stack web development services, including frontend development with React/Next.js, backend development with Node.js, and database design with MongoDB/PostgreSQL. I also provide UI/UX design consultation and website maintenance services.'
    },
    {
      question: 'How can I contact you for a project?',
      answer: 'You can reach me through the contact form on the home page, or directly via email or social media links provided in the footer. I typically respond within 24 hours.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary depending on complexity and requirements. A simple website typically takes 2-4 weeks, while more complex applications may take 2-3 months. I provide detailed timelines during the initial consultation.'
    },
    {
      question: 'Do you work with clients remotely?',
      answer: 'Yes, I work with clients from all over the world. I use various collaboration tools like Zoom, Slack, and project management platforms to ensure smooth communication and project delivery.'
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'I specialize in modern web technologies including React.js, Next.js, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, and Tailwind CSS. You can see the full list of my skills on the Skills section of my portfolio.'
    },
    {
      question: 'Do you provide maintenance and support after project completion?',
      answer: 'Yes, I offer ongoing maintenance and support packages. This includes bug fixes, updates, and feature enhancements. We can discuss the specific terms during our project discussion.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'My pricing varies based on project scope, complexity, and timeline. I offer both fixed-price projects and hourly rates. Contact me with your project details for a customized quote.'
    },
    {
      question: 'Can you work on existing projects?',
      answer: 'Absolutely! I can help debug, optimize, or add new features to existing projects. I\'m comfortable working with various codebases and can quickly adapt to your project\'s architecture.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <React.Fragment>
      <Head>
        <title>FAQ | Agus - Fullstack Web Developer</title>
        <meta name="description" content="Frequently asked questions about my services and work process" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div id="faq" className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xl tracking-widest uppercase text-[#5651e5]">
              Help Center
            </p>
            <h2 className="py-4 text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="py-2 text-gray-600 max-w-[600px] mx-auto">
              Find answers to common questions about my services, process, and availability.
            </p>
          </div>

          <div className="max-w-[900px] mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-[#5651e5]">
                    {openIndex === index ? (
                      <AiOutlineMinus size={24} />
                    ) : (
                      <AiOutlinePlus size={24} />
                    )}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              If you couldn&apos;t find the answer you&apos;re looking for, feel free to reach out.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-[#5651e5] text-white rounded-lg hover:bg-[#4541c7] transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FAQ
