const latestDate = "Monday, 13th 2025";
const email = "general@skylla.app";

export const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="px-6 py-10 md:px-20 lg:px-40">
        <header className="text-left mb-2">
          <p className="text-sm text-gray-500 mt-2">
            Last Update: {latestDate}
          </p>
        </header>
        <main className="shadow-lg rounded-lg bg-card p-6 md:p-10">
          <h2 className="text-base md:text-lg font-light text-gray-500 mb-6">
            Welcome to Skylla! By accessing or using our platform, you agree to
            be bound by these Terms of Service. If you do not agree, you may not
            use our services.
          </h2>
          <div className="space-y-8 md:space-y-10">
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Definitions
              </h3>
              <ol className="list-decimal pl-4 text-sm md:text-base text-gray-500 space-y-2">
                <li>
                  <strong>Skylla:</strong> Refers to our platform, services, and
                  tools for managing social media accounts.
                </li>
                <li>
                  <strong>User:</strong> Anyone who accesses or uses Skylla.
                </li>
              </ol>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Eligibility
              </h3>
              <ul className="list-disc pl-5 text-sm md:text-base text-gray-500 space-y-2">
                <li>You must be at least 18 years old to use Skylla.</li>
                <li>
                  By using the service, you confirm that you have the legal
                  capacity to agree to these terms.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Account Responsibilities
              </h3>
              <ul className="list-disc pl-5 text-sm md:text-base text-gray-500 space-y-2">
                <li>
                  Users are responsible for keeping their account credentials
                  secure.
                </li>
                <li>
                  You may not share your account or use another user’s account
                  without permission.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Acceptable Use
              </h3>
              <ul className="list-disc pl-5 text-sm md:text-base text-gray-500 space-y-2">
                <li>
                  Do not use Skylla to post spam, abusive, or illegal content.
                </li>
                <li>You may not interfere with or disrupt our services.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Intellectual Property
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                All Skylla software, content, and branding are owned by Skylla.
                You may not copy or reverse-engineer any part of our services.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Termination
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We may suspend or terminate your account if you violate these
                terms or engage in behavior harmful to Skylla or its users.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Liability and Disclaimer
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                Skylla is provided “as is” without warranties of any kind. We
                are not responsible for any losses or damages resulting from
                your use of the service.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Changes to the Terms
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                We may update these terms from time to time. Continued use of
                Skylla after changes are made constitutes acceptance of the
                revised terms.
              </p>
            </section>
            <section>
              <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-4">
                Contact Us
              </h3>
              <p className="text-sm md:text-base text-gray-500">
                For questions about these Terms, contact us at{" "}
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
