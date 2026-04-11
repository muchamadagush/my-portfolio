/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Head from 'next/head'

const PawmoroPrivacyPolicy = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Privacy Policy - Pawmoro: Focus App</title>
        <meta name="description" content="Privacy policy for Pawmoro: Focus App application" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div id="privacy-policy" className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xl tracking-widest uppercase text-[#5651e5]">
              Legal
            </p>
            <h2 className="py-4 text-4xl md:text-5xl font-bold">
              Privacy Policy - Pawmoro: Focus App
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
                This Privacy Policy applies to the <strong>Pawmoro: Focus App</strong> (formerly known as Focus Pet) mobile application. By using this application, you agree to the collection and use of information in relation to this policy. We are committed to protecting your personal information and your right to privacy.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information Collection and Use
              </h3>
              <div className="space-y-3 leading-relaxed">
                <p className="font-semibold text-gray-900">App Data & Focus Progress:</p>
                <p className="leading-relaxed">
                  Pawmoro: Focus App tracks your focus sessions and pet growth progress to provide its core functionality.
                  <strong> This data is processed and stored locally on your device. It is not sent, transmitted, or stored on any external servers.</strong>
                </p>

                <p className="font-semibold text-gray-900 mt-4">Local Storage:</p>
                <p className="leading-relaxed">
                  The application uses local device storage to save your focus history, settings, and pet status. This data remains physically on your device and can be cleared by uninstalling the app or clearing its data.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Third-Party Services (AdMob)
              </h3>
              <p className="leading-relaxed mb-3">
                The app uses Google AdMob as a third-party advertising service. AdMob may collect and use data such as your IP address and mobile advertising ID, along with device information, to deliver relevant advertisements.
              </p>
              <p className="leading-relaxed mb-3">
                Google AdMob may use cookies, device identifiers, or similar technologies for personalized advertising. You can learn more about how Google collects and uses your data by visiting:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#5651e5] hover:underline">
                    Google Privacy & Terms
                  </a>
                </li>
                <li>
                  <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener noreferrer" className="text-[#5651e5] hover:underline">
                    How Google uses data when you use our partners&apos; sites or apps
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                4. Permissions
              </h3>
              <p className="leading-relaxed mb-3">
                To provide a complete focus experience, the app may request the following permissions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Notifications:</strong> To alert you when your focus session or break ends.</li>
                <li><strong>Vibration:</strong> To provide haptic feedback during timer events.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                5. Children&apos;s Privacy
              </h3>
              <p className="leading-relaxed">
                Pawmoro: Focus App does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information without your consent, please contact us so that we can take necessary actions.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                6. Changes to This Privacy Policy
              </h3>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by updating the &quot;Last updated&quot; date on this page.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                7. Contact Us
              </h3>
              <p className="leading-relaxed">
                If you have any questions, concerns, or suggestions about our Privacy Policy for Pawmoro: Focus App, please do not hesitate to contact us.
              </p>
            </section>
          </div>

          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about how Pawmoro: Focus App handles your data, feel free to reach out.
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

export default PawmoroPrivacyPolicy
