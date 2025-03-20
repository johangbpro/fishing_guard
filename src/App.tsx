import React, { useState } from 'react';
import { Shield, Upload, AlertTriangle, CheckCircle, HelpCircle, Github, Twitter, Linkedin, AlertCircle, Eye, Lock, Mail } from 'lucide-react';

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(-1);
  const [results, setResults] = useState<(AnalysisResult | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files).filter(file => file.name.endsWith('.eml'));
      setSelectedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).filter(file => file.name.endsWith('.eml'));
      setSelectedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
    setResults(prevResults => {
      const newResults = [...prevResults];
      if (newResults[index]) {
        newResults[index] = null;
      }
      return newResults;
    });
  };

  const handleAnalyze = async () => {
    setError(null);
    
    if (results.length === 0 && selectedFiles.length > 0) {
      setResults(new Array(selectedFiles.length).fill(null));
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
      if (results[i]) continue;
      
      setCurrentFileIndex(i);
      setIsAnalyzing(true);
      
      try {
        const formData = new FormData();
        formData.append('email_file', selectedFiles[i]);
        
        const response = await fetch('http://localhost:8000/api/analysis/analyze_email/', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Analysis failed');
        }
        
        const data = await response.json();
        
        setResults(prevResults => {
          const newResults = [...prevResults];
          newResults[i] = {
            isSuspicious: data.is_suspicious,
            sender: data.sender,
            subject: data.subject,
            recipient: data.recipient,
            date: data.date,
            body: selectedFiles[i].name,
            analysis: typeof data.analysis === 'string' 
              ? [data.analysis] 
              : data.analysis || []
          };
          return newResults;
        });
      } catch (error) {
        console.error('Error analyzing email:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        break;
      } finally {
        setIsAnalyzing(false);
      }
    }
    
    setCurrentFileIndex(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Improved Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Phishing Guard
              </h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">Results</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">Help</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg mb-8 shadow-md animate-fadeIn">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <h3 className="text-lg font-medium">Analysis Error</h3>
            </div>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Detect Phishing Attempts
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your suspicious emails and let our advanced AI analyze them for potential threats.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto mb-6">
              <Upload className="h-6 w-6" />
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                 onClick={() => document.getElementById('fileInput')?.click()}>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".eml"
                multiple
              />
              <div className="py-8">
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop your .eml files here, or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Only .eml files are supported
                </p>
              </div>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files ({selectedFiles.length})</h4>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="py-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                        {results[index] && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            results[index]?.isSuspicious 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {results[index]?.isSuspicious ? 'Suspicious' : 'Safe'}
                          </span>
                        )}
                      </div>
                      <button 
                        className="text-xs text-red-600 hover:text-red-800"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              onClick={handleAnalyze}
              disabled={selectedFiles.length === 0 || isAnalyzing}
              className={`mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition duration-200 ${
                selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentFileIndex >= 0 
                    ? `Analyzing file ${currentFileIndex + 1} of ${selectedFiles.length}...` 
                    : 'Processing...'}
                </span>
              ) : (
                `Analyze ${selectedFiles.length} Email${selectedFiles.length !== 1 ? 's' : ''}`
              )}
            </button>
          </div>
          
          {results.some(r => r !== null) && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Analysis Results</h3>
              
              {results.map((result, index) => {
                if (!result) return null;
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className={`p-6 ${result.isSuspicious ? 'bg-red-50' : 'bg-green-50'} border-b`}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-sm">
                          {result.isSuspicious ? (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <span className="font-medium ml-3">
                          {selectedFiles[index]?.name}: {result.isSuspicious ? 'Suspicious Email Detected' : 'Email Appears Safe'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Email Details</h4>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 px-4 py-3 rounded-lg">
                            <dt className="text-sm font-medium text-gray-500">Sender</dt>
                            <dd className="mt-1 text-sm text-gray-900">{result.sender}</dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 rounded-lg">
                            <dt className="text-sm font-medium text-gray-500">Subject</dt>
                            <dd className="mt-1 text-sm text-gray-900">{result.subject}</dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 rounded-lg">
                            <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                            <dd className="mt-1 text-sm text-gray-900">{result.recipient}</dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 rounded-lg">
                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">{result.date}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Analysis</h4>
                        <ul className="space-y-2">
                          {result.analysis.map((rec, recIndex) => (
                            <li
                              key={recIndex}
                              className={`flex items-center text-sm ${
                                result.isSuspicious ? 'bg-red-50' : 'bg-green-50'
                              } p-3 rounded-lg`}
                            >
                              {result.isSuspicious ? (
                                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                              ) : (
                                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                              )}
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How To Protect Yourself From Phishing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <div className="text-blue-600 mb-3">
                <Eye className="h-8 w-8" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Check URLs Carefully</h4>
              <p className="text-sm text-gray-600">Always verify the website URL before entering sensitive information. Phishing sites often use URLs that look similar to legitimate ones.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <div className="text-blue-600 mb-3">
                <Lock className="h-8 w-8" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Enable Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security by enabling two-factor authentication for your important accounts.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <div className="text-blue-600 mb-3">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Be Wary of Urgent Requests</h4>
              <p className="text-sm text-gray-600">Phishing attempts often create a false sense of urgency. Take your time to verify unexpected requests.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Improved Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-1.5 rounded">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-bold text-lg">Phishing Guard</span>
              </div>
              <p className="text-gray-400 text-sm">
                Phishing Guard helps protect you from email-based cyber threats using advanced AI detection.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">
                Email: support@phishingguard.com<br />
                Phone: +1 (555) 123-4567
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Phishing Guard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;