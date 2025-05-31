import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/app/layout/Layout';
import { FadeInView } from '@/components/animations/FadeInView';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message?: string }>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setStatus({ 
        type: 'success', 
        message: t('contact.form.success') 
      });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: t('contact.form.error') 
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{t('navigation.contact')} | Tarcisio Bispo</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <FadeInView>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.description')}
            </p>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <FadeInView delay={0.1} className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-muted-foreground">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href="mailto:contato@tarcisiobispo.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    contato@tarcisiobispo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('contact.location')}</h4>
                  <p className="text-muted-foreground">
                    São Paulo, SP - Brasil
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('contact.phone')}</h4>
                  <a 
                    href="tel:+5511999999999" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +55 (11) 99999-9999
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-4">{t('contact.social')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/in/tarcisiobispo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-muted/80 p-3 rounded-lg transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://github.com/tarcisiobispo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-muted/80 p-3 rounded-lg transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/tarcisiobispo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-muted/80 p-3 rounded-lg transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeInView>

          {/* Formulário de Contato */}
          <FadeInView delay={0.2}>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-sm">
              {status.type === 'success' ? (
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('contact.form.successMessage')}
                  </p>
                  <button
                    onClick={() => setStatus({ type: 'idle' })}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t('contact.form.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold mb-6">
                    {t('contact.form.title')}
                  </h3>
                  
                  {status.type === 'error' && (
                    <div className="flex items-center p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span>{status.message}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                        {t('contact.form.subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={status.type === 'loading'}
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-lg transition-colors ${
                        status.type === 'loading'
                          ? 'bg-primary/70 cursor-not-allowed'
                          : 'bg-primary hover:bg-primary/90'
                      } text-white font-medium`}
                    >
                      {status.type === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeInView>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
