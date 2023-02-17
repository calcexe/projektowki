import Head from "next/head";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <div className="text-white/80 flex flex-col gap-8 p-8">
        <h1 className="text-3xl font-bold">Privacy Policy Statement</h1>
        <p>
          At{" "}
          <Link className="underline hover:no-underline" href="/">
            projektowki.vercel.app
          </Link>
          , we take the privacy of our users seriously and comply with the
          General Data Protection Regulation (GDPR) and other applicable data
          protection laws. This GDPR-Compliant Privacy Policy Statement explains
          the types of personal information we collect when you use our website,
          how we use it, and the rights you have with respect to your personal
          data.
        </p>
        <h2 className="text-xl font-bold">
          Personal Information We Collect and How We Use It
        </h2>
        <p>
          The only personal information we collect is your email address when
          you use the Sign In with Google feature to authenticate and identify
          you on our website. We use this information solely to provide you with
          access to our website and to communicate with you about your account.
          We do not share or disclose this information to any third parties,
          except for our third-party authentication provider, Google, which may
          collect and process your data according to their own privacy policy.
        </p>
        <h2 className="text-xl font-bold">Data Security</h2>
        <p>
          We take appropriate technical and organizational measures to ensure
          the security of your personal data and to prevent unauthorized access,
          disclosure, alteration or destruction. We use reasonable and
          appropriate security measures to protect your personal information,
          including secure storage of your data and regular monitoring of our
          systems for security vulnerabilities.
        </p>
        <h2 className="text-xl font-bold">Your Rights Under GDPR</h2>
        <p>
          Under GDPR, you have the following rights regarding your personal
          information:
        </p>
        <ul className="list-disc list-inside">
          <li>The right to be informed about how your data is processed;</li>
          <li>
            The right to access your personal information and receive a copy of
            it;
          </li>
          <li>
            The right to have your personal information corrected if it is
            inaccurate or incomplete;
          </li>
          <li>
            The right to have your personal information erased under certain
            circumstances;
          </li>
          <li>
            The right to object to the processing of your personal information
            under certain circumstances;
          </li>
          <li>The right to data portability;</li>
          <li>The right to withdraw your consent at any time.</li>
        </ul>
        <h2 className="text-xl font-bold">Contact Us</h2>
        <p>
          If you have any questions or concerns about our GDPR-Compliant Privacy
          Policy Statement or how we handle your personal information, please
          contact us at{" "}
          <a
            href="mailto:ru8inator@gmail.com"
            className="underline hover:no-underline"
          >
            ru8inator@gmail.com
          </a>
          .
        </p>
        <h2 className="text-xl font-bold">
          Changes to this Privacy Policy Statement
        </h2>
        <p>
          We reserve the right to make changes to this GDPR-Compliant Privacy
          Policy Statement at any time. We encourage you to review this Privacy
          Policy Statement regularly for any changes.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
