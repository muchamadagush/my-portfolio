/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Head from 'next/head'

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Privacy Policy | Agus - Fullstack Web Developer</title>
        <meta name="description" content="Privacy policy for my portfolio website" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div id="privacy-policy" className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xl tracking-widest uppercase text-[#5651e5]">
              Legal
            </p>
            <h2 className="py-4 text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h2>
            <p className="py-2 text-gray-600">
              Last updated: February 14, 2026
            </p>
          </div>

          <div className="max-w-[900px] mx-auto space-y-8 text-gray-700">
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h3>
              <p className="leading-relaxed">
                Welcome to my portfolio website. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website. By using this website, you agree to the terms outlined in this policy.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information I Collect
              </h3>
              <div className="space-y-3 leading-relaxed">
                <p className="font-semibold text-gray-900">Personal Information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address when you contact me through the contact form</li>
                  <li>Any additional information you provide in your messages</li>
                </ul>
                <p className="font-semibold text-gray-900 mt-4">Non-Personal Information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on the website</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. How I Use Your Information
              </h3>
              <p className="leading-relaxed mb-3">
                I use the information I collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To respond to your inquiries and contact requests</li>
                <li>To improve my website and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To communicate with you about potential projects or collaborations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                4. Data Storage and Security
              </h3>
              <p className="leading-relaxed">
                I take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. Your data is stored securely and is only accessible to me. However, please note that no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                5. Cookies and Tracking Technologies
              </h3>
              <p className="leading-relaxed">
                This website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences. Disabling cookies may affect some features of the website.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                6. Third-Party Services
              </h3>
              <p className="leading-relaxed mb-3">
                This website may contain links to third-party websites or services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Social media platforms (LinkedIn, GitHub, Instagram)</li>
                <li>Analytics services (if applicable)</li>
                <li>Hosting services</li>
              </ul>
              <p className="leading-relaxed mt-3">
                I am not responsible for the privacy practices of these third-party services. I encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                7. Your Rights
              </h3>
              <p className="leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request access to your personal information</li>
                <li>Request correction or deletion of your personal information</li>
                <li>Withdraw consent for data processing</li>
                <li>Object to the processing of your personal information</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, please contact me through the contact form on this website.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                8. Children&apos;s Privacy
              </h3>
              <p className="leading-relaxed">
                This website is not intended for children under the age of 13. I do not knowingly collect personal information from children. If you believe I have inadvertently collected information from a child, please contact me immediately.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                9. Changes to This Privacy Policy
              </h3>
              <p className="leading-relaxed">
                I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. I encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                10. Contact Information
              </h3>
              <p className="leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, please contact me through the contact form on my website or via the social media links provided.
              </p>
            </section>
          </div>

          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about how I handle your data, feel free to reach out.
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

export default PrivacyPolicy
