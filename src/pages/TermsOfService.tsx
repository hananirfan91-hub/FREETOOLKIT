import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Helmet>
        <title>Terms of Service - FreeToolKit</title>
        <meta name="description" content="Terms of Service for FreeToolKit. Read the rules and guidelines for using our free online tools." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="lead text-xl text-slate-600 mb-8">
              By accessing and using FreeToolKit, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use the tools on FreeToolKit's website for personal, non-commercial, or commercial transitory viewing and usage. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Attempt to decompile or reverse engineer any software contained on FreeToolKit's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials and tools on FreeToolKit's website are provided "as is". FreeToolKit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, FreeToolKit does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the tools on its internet website or otherwise relating to such materials or on any sites linked to this site.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall FreeToolKit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on FreeToolKit's Internet site, even if FreeToolKit or a FreeToolKit authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2>5. Revisions and Errata</h2>
            <p>
              The materials appearing on FreeToolKit's website could include technical, typographical, or photographic errors. FreeToolKit does not warrant that any of the materials on its website are accurate, complete, or current. FreeToolKit may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2>6. Site Terms of Use Modifications</h2>
            <p>
              FreeToolKit may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>

            <p className="text-sm text-slate-500 mt-12">
              Last updated: March 30, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
