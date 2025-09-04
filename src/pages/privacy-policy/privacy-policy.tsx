const latestDate = "Monday, 13th 2025";
const email = "general@skylla.app";

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="mt-12 px-5 md:px-20 lg:px-40">
        <header className="text-left mb-2">
          <p className="text-sm text-gray-500 mt-2">
            Last Update: {latestDate}
          </p>
        </header>
        <main className="shadow-lg rounded-lg bg-card p-6 md:p-10">
          <h2 className="text-base md:text-lg font-light text-gray-500 mb-6">
            Skylla is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and share your information.
          </h2>
          <div className="space-y-8 md:space-y-10">
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Information We Collect
              </h3>
              <ol className="pl-4 text-sm md:text-base text-gray-500 space-y-2 list-decimal">
                <li>
                  <strong>Account Information:</strong> Name, email address, and
                  payment details.
                </li>
                <li>
                  <strong>Usage Data:</strong> Logs, device information, and
                  analytics data to improve our services.
                </li>
                <li>
                  <strong>Social Media Data:</strong> Content and metadata from
                  linked social media accounts.
                </li>
              </ol>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                How We Use Your Information
              </h3>
              <ul className="list-disc pl-5 text-sm md:text-base text-gray-500 space-y-2">
                <li>To provide and improve Skylla services.</li>
                <li>
                  To communicate with you about updates, promotions, and
                  support.
                </li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Sharing of Information
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We do not sell your personal information. We may share data with
                third-party service providers for payment processing, analytics,
                or customer support.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Your Rights
              </h3>
              <div className="text-sm md:text-base text-gray-500 space-y-4">
                <p>
                  <strong>General:</strong> You may access, update, or delete
                  your personal information by contacting us at{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {email}
                  </a>
                  .
                </p>
                <p>
                  <strong>For EU Users:</strong> We comply with GDPR and honor
                  requests related to data access and deletion.
                </p>
                <p>
                  <strong>For California Residents:</strong> Your rights under
                  CCPA include access to collected data and opting out of data
                  sales.
                </p>
              </div>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Data Security
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We use industry-standard encryption and security practices to
                protect your data.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Retention
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We retain your information only as long as necessary for the
                purposes outlined in this policy.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Changes to This Policy
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We may update this Privacy Policy periodically. Changes will be
                posted on this page with a new “Last Updated” date.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Contact Us
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                If you have questions about this Privacy Policy, contact us at{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-blue-500 hover:underline"
                >
                  {email}
                </a>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
