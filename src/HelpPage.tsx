function HelpPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Phishing Detection</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">What is Phishing?</h3>
          <p className="text-gray-600 mb-4">
            Phishing is a type of cyber attack where attackers disguise themselves as trustworthy entities to steal sensitive information such as login credentials, credit card numbers, or personal data. These attacks typically come in the form of deceptive emails that appear to be from legitimate organizations.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">How Phishing Guard Works</h3>
          <p className="text-gray-600 mb-4">
            Phishing Guard uses advanced AI to analyze email files and identify potential phishing attempts. Our system examines multiple aspects of an email including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Sender information and domain authenticity</li>
            <li>Links and their destinations</li>
            <li>Language patterns common in phishing attempts</li>
            <li>Suspicious content and requests</li>
            <li>Attachment safety</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Using Phishing Guard</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Supported File Types</h3>
          <p className="text-gray-600">
            Phishing Guard currently supports .eml files, which are standard email message files exported from most email clients.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">How to Analyze an Email</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3">
            <li><strong>Export the suspicious email</strong>: In your email client, save the suspicious email as an .eml file</li>
            <li><strong>Upload the file</strong>: Drag and drop the .eml file onto the upload area or click to browse</li>
            <li><strong>Review results</strong>: Our AI will analyze the email and provide a comprehensive security assessment</li>
          </ol>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Understanding Results</h3>
          <p className="text-gray-600 mb-4">
            After analysis, you'll receive:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>A clear indication if the email is suspicious or safe</li>
            <li>Details about the sender, recipient, subject, and date</li>
            <li>Specific security concerns identified in the email</li>
            <li>Recommended actions based on the analysis</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Analyzing Multiple Emails</h3>
          <p className="text-gray-600">
            You can upload multiple .eml files at once to analyze a batch of emails. Results will be displayed for each file individually.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Protecting Yourself from Phishing</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Common Signs of Phishing Emails</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Urgency or threats to create pressure</li>
            <li>Generic greetings rather than your name</li>
            <li>Requests for personal information</li>
            <li>Suspicious links or attachments</li>
            <li>Grammatical errors or unusual phrasing</li>
            <li>Email address that doesn't match the claimed sender</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Best Practices for Email Security</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3">
            <li><strong>Verify the sender</strong>: Check the full email address, not just the display name</li>
            <li><strong>Don't click suspicious links</strong>: Hover over links to see where they actually lead</li>
            <li><strong>Never share sensitive information</strong> via email</li>
            <li><strong>Be wary of unexpected attachments</strong></li>
            <li><strong>Use multi-factor authentication</strong> whenever possible</li>
            <li><strong>Keep software updated</strong> to patch security vulnerabilities</li>
            <li><strong>Use unique passwords</strong> for different accounts</li>
          </ol>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-3">What to Do If You Identify a Phishing Email</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2">
            <li>Don't interact with the email</li>
            <li>Report it to your IT department or email provider</li>
            <li>Delete the email from your inbox</li>
            <li>If you've already clicked links or provided information, change your passwords immediately</li>
          </ol>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Is my email data secure?</h3>
            <p className="text-gray-600">
              Yes. Phishing Guard processes your emails locally and does not store the content of your emails. Only anonymized analysis data is retained for improving our detection algorithms.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How accurate is the detection?</h3>
            <p className="text-gray-600">
              While our AI provides highly accurate analysis, no system is perfect. Always use your judgment alongside our recommendations, especially for critical security decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Can I use Phishing Guard with my email client?</h3>
            <p className="text-gray-600">
              Currently, Phishing Guard works with exported .eml files. Direct integration with email clients may be available in future updates.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What should I do if I get a false positive?</h3>
            <p className="text-gray-600">
              If you believe an email was incorrectly flagged as suspicious, you can still proceed with caution. Consider contacting the purported sender through a different channel to verify the email's legitimacy.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a limit to how many emails I can analyze?</h3>
            <p className="text-gray-600">
              The free version allows analyzing up to 10 emails per day. For higher volume needs, please contact us about enterprise plans.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact and Support</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            If you have questions, encounter issues, or want to report a potential false positive/negative:
          </p>
          
          <ul className="text-gray-600 space-y-2">
            <li><strong>Email</strong>: support@phishingguard.com</li>
            <li><strong>Phone</strong>: +1 (555) 123-4567</li>
            <li><strong>Hours</strong>: Monday-Friday, 9am-5pm EST</li>
          </ul>
          
          <p className="text-gray-600 mt-4">
            For emergency assistance with potential data breaches, please call our security hotline at +1 (555) 999-8765.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HelpPage;
