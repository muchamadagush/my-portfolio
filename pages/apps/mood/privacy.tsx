/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Head from 'next/head'

const MoodJournalPrivacyPolicy = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Privacy Policy - Mood Journal | Agus - Fullstack Web Developer</title>
        <meta name="description" content="Privacy policy for the Mood Journal application" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div id="privacy-policy" className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xl tracking-widest uppercase text-[#5651e5]">
              Legal
            </p>
            <h2 className="py-4 text-4xl md:text-5xl font-bold">
              Privacy Policy - Mood Journal
            </h2>
            <p className="py-2 text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-[900px] mx-auto space-y-8 text-gray-700">
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h3>
              <p className="leading-relaxed">
                This Privacy Policy applies to the Mood Journal mobile application. By using this application, you agree to the collection and use of information in relation to this policy. We are committed to protecting your personal information and your right to privacy.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information Collection and Use
              </h3>
              <div className="space-y-3 leading-relaxed">
                <p className="font-semibold text-gray-900">Journal Entries:</p>
                <p className="leading-relaxed">
                  The Mood Journal app allows you to record your daily moods, thoughts, and notes. This data includes mood ratings, text entries, dates, and any optional metadata you choose to add.
                  <strong> All data is stored locally on your device and is not transmitted to any external servers or shared with third parties.</strong>
                </p>

                <p className="font-semibold text-gray-900 mt-4">Local Storage:</p>
                <p className="leading-relaxed">
                  Your journal entries are saved securely on your device's local storage using encrypted databases. We do not have access to this data, and it remains under your control at all times.
                </p>

                <p className="font-semibold text-gray-900 mt-4">No Internet Access:</p>
                <p className="leading-relaxed">
                  The Mood Journal app does not require internet access to function. All features work offline, ensuring your personal data stays on your device.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Data Sharing and Disclosure
              </h3>
              <p className="leading-relaxed">
                We do not share, sell, or transmit your personal data to any third parties. Your journal entries are private and remain solely on your device.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                4. Data Security
              </h3>
              <p className="leading-relaxed">
                We prioritize the security of your data. Since all information is stored locally on your device, security depends on your device's protection measures. We recommend using device-level security features like passcodes, biometric authentication, and regular backups.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                5. Third-Party Services
              </h3>
              <p className="leading-relaxed">
                The Mood Journal app does not integrate with any third-party services or collect data for advertising purposes.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                6. Children's Privacy
              </h3>
              <p className="leading-relaxed">
                The Mood Journal app is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                7. Changes to This Privacy Policy
              </h3>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                8. Contact Us
              </h3>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="leading-relaxed">
                Email: muchamadagush@gmail.com<br />
                Website: https://agusdwisaputra.vercel.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MoodJournalPrivacyPolicy