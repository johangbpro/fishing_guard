import React, { useState } from 'react';
import { Shield, Upload, AlertTriangle, CheckCircle, HelpCircle, Github, Twitter, Linkedin } from 'lucide-react';

type AnalysisResult = {
  isSuspicious: boolean;
  sender: string;
  subject: string;
  recipient: string;
  date: string;
  body: string;
  analysis: string[];
} | null;

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.eml')) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.eml')) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('email_file', selectedFile);

      const response = await fetch('http://localhost:8000/api/analysis/analyze_email/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult({
        isSuspicious: data.is_suspicious,
        sender: data.sender,
        subject: data.subject,
        recipient: data.recipient,
        date: data.date,
        body: selectedFile.name,
        analysis: typeof data.analysis === 'string' 
          ? [data.analysis] 
          : data.analysis || []
      });
    } catch (error) {
      console.error('Error analyzing email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Phishing Guard</h1>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Results</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detect Phishing Attempts
              </h2>
              <p className="text-lg text-gray-600">
                Upload your suspicious email and let our advanced AI analyze it for potential threats
              </p>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg font-medium text-gray-900">
                Drag and drop your .eml file here
              </p>
              <p className="mt-2 text-gray-500">or</p>
              <input
                type="file"
                accept=".eml"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Select File
              </label>
              {selectedFile && (
                <div className="mt-4 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  selectedFile
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Analyze Email
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
                {result.isSuspicious ? (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    <span className="font-medium">Suspicious Email Detected</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    <span className="font-medium">Email Appears Safe</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Details</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500">Sender</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.sender}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.recipient}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500">Subject</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.subject}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500">Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.date}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis</h3>
                <ul className="space-y-2">
                  {result.analysis.map((rec, index) => (
                    <li
                      key={index}
                      className={`flex items-center text-sm text-gray-600 ${
                        result.isSuspicious ? 'bg-red-50' : 'bg-green-50'
                      } p-3 rounded-lg`}
                    >
                      {result.isSuspicious ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400">
                Phishing Guard helps protect you from email-based cyber threats using advanced AI detection.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email: support@phishingguard.com<br />
                Phone: +4242424242
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">© 2025 Phishing Guard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;