import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LifeBuoy,
  Mail,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  Search,
  Phone,
  Globe,
  Linkedin,
  Github,
  User
} from "lucide-react";

export const HelpSupport = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Settings > Security > Reset Password and follow the instructions."
    },
    {
      question: "How can I upload documents?",
      answer: "Navigate to the Documents section and click the 'Upload' button."
    },
    {
      question: "What user roles are available?",
      answer: "We have Super Admin, Admin, Manager, and User roles with different permissions."
    },
    {
      question: "How do I contact the developer?",
      answer: "Use the contact information provided below or fill out the contact form."
    }
  ];

  const resources = [
    {
      title: "Documentation",
      description: "Complete guides and API references",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: <Video className="h-6 w-6" />,
      link: "#"
    },
    {
      title: "Knowledge Base",
      description: "Articles and troubleshooting guides",
      icon: <FileText className="h-6 w-6" />,
      link: "#"
    }
  ]; 
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Get help with your account, features, and troubleshooting
          </p>
        </div> 
      </div>

      {/* Search */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
        <CardContent className="p-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <LifeBuoy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              How can we help you?
            </h2>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search help articles..."
                className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Developer Contact Information */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Developer Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Félix Domingos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
                <a href="mailto:felixsdomingos93@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  felixsdomingos93@gmail.com
                </a>
              </div>
              
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
                <a href="tel:+244955657585" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  +244 955 657 585
                </a>
              </div>
              
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
                <a href="https://felidom.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  www.felidom.vercel.app
                </a>
              </div>
              
              <div className="flex items-center text-sm">
                <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
                <a href="https://linkedin.com/in/felixdomingos" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  linkedin.com/in/felixdomingos
                </a>
              </div>
              
              <div className="flex items-center text-sm">
                <Github className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
                <a href="https://github.com/felixdomingos1" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  github.com/felixdomingos1
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
 
      {/* Resources */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                {resource.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {resource.description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};