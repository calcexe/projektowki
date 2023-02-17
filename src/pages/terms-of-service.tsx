import Head from "next/head";
import Link from "next/link";
import React from "react";

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <div className="text-white/80 flex flex-col gap-8 p-8">
        <h1 className="text-3xl font-bold">Terms of Service</h1>

        <p>
          These Terms of Service govern your use of the website{" "}
          <Link href="/" className="underline hover:no-underline">
            projektowki.vercel.app
          </Link>{" "}
          (the &quot;Website&quot;). By accessing or using the Website, you
          agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-bold">Use of Website</h2>
        <p>
          The Website is intended for use by individuals who are 18 years of age
          or older. By using the Website, you represent and warrant that you are
          at least 18 years of age. You may use the Website only for lawful
          purposes and in accordance with these Terms of Service.
        </p>

        <h2 className="text-xl font-bold">Privacy Policy</h2>
        <p>
          Your use of the Website is also subject to our Privacy Policy, which
          is incorporated by reference into these Terms of Service. Our Privacy
          Policy explains the types of personal information we collect and how
          we use, disclose, and protect this information.
        </p>

        <h2 className="text-xl font-bold">Account Registration</h2>
        <p>
          To access the Website, you may be required to create an account using
          the Sign In with Google feature. You agree to provide accurate,
          current and complete information during the registration process and
          to update such information as necessary to keep it accurate, current
          and complete. You are responsible for safeguarding your account login
          credentials and for any activities or actions under your account.
        </p>

        <h2 className="text-xl font-bold">Intellectual Property Rights</h2>
        <p>
          The Website and its entire contents, features and functionality
          (including but not limited to all information, software, text,
          displays, images, video and audio, and the design, selection and
          arrangement thereof) are owned by us or our licensors and are
          protected by copyright, trademark, and other intellectual property or
          proprietary rights laws. You may not reproduce, distribute, modify,
          create derivative works of, publicly display, publicly perform,
          republish, download, store or transmit any of the material on our
          Website without our prior written consent.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          The Website and its contents are provided on an &quot;as is&quot; and
          &quot;as available&quot; basis. We make no representations or
          warranties of any kind, express or implied, as to the operation of the
          Website, its contents or any information, products or services made
          available through the Website. We do not warrant that the Website or
          its contents will be error-free, uninterrupted, secure or free from
          viruses or other harmful components.
        </p>

        <h2 className="text-xl font-bold">Limitation of Liability</h2>
        <p>
          We shall not be liable for any damages of any kind arising from the
          use of the Website, including but not limited to direct, indirect,
          incidental, punitive and consequential damages.
        </p>

        <h2 className="text-xl font-bold">Governing Law</h2>
        <p>
          These Terms of Service and your use of the Website shall be governed
          by and construed in accordance with the laws of the jurisdiction in
          which the Website is hosted.
        </p>

        <h2 className="text-xl font-bold">Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms of Service or
          your use of the Website, please contact us at{" "}
          <a
            href="mailto:ru8inator@gmail.com"
            className="underline hover:no-underline"
          >
            ru8inator@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-bold">Changes to these Terms of Service</h2>
        <p>
          We reserve the right to make changes to these Terms of Service at any
          time. We encourage you to review these Terms of Service regularly for
          any changes. Your continued use of the Website following the posting
          of changes will constitute your acceptance of such changes.
        </p>
      </div>
    </>
  );
};

export default TermsOfService;
