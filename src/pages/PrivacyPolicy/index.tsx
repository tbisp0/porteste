import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/app/layout/Layout';
import { FadeInView } from '@/components/animations/FadeInView';
import { Shield, Lock, User, Server, Mail, AlertCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{t('privacyPolicy.title')} | Tarcisio Bispo</title>
        <meta name="description" content={t('privacyPolicy.metaDescription')} />
      </Helmet>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <FadeInView>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('privacyPolicy.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('privacyPolicy.lastUpdated')}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <FadeInView delay={0.1}>
                <div className="bg-card rounded-xl p-6 border border-border/20 mb-8">
                  <h2 className="flex items-center text-2xl font-semibold mb-4">
                    <Lock className="w-6 h-6 mr-2 text-primary" />
                    {t('privacyPolicy.intro.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('privacyPolicy.intro.content')}
                  </p>
                </div>
              </FadeInView>

              <FadeInView delay={0.2}>
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2 text-primary" />
                    {t('privacyPolicy.dataCollection.title')}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.dataCollection.content')}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>{t('privacyPolicy.dataCollection.items.name')}</li>
                      <li>{t('privacyPolicy.dataCollection.items.email')}</li>
                      <li>{t('privacyPolicy.dataCollection.items.phone')}</li>
                      <li>{t('privacyPolicy.dataCollection.items.usage')}</li>
                    </ul>
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.3}>
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Server className="w-6 h-6 mr-2 text-primary" />
                    {t('privacyPolicy.dataUsage.title')}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.dataUsage.content')}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>{t('privacyPolicy.dataUsage.items.provide')}</li>
                      <li>{t('privacyPolicy.dataUsage.items.improve')}</li>
                      <li>{t('privacyPolicy.dataUsage.items.communicate')}</li>
                      <li>{t('privacyPolicy.dataUsage.items.analytics')}</li>
                    </ul>
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.4}>
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    {t('privacyPolicy.dataProtection.title')}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      {t('privacyPolicy.dataProtection.content')}
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {t('privacyPolicy.dataProtection.note')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.5}>
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-primary" />
                    {t('privacyPolicy.contact.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('privacyPolicy.contact.content')}{' '}
                    <a 
                      href="mailto:contato@tarcisiobispo.com" 
                      className="text-primary hover:underline"
                    >
                      contato@tarcisiobispo.com
                    </a>.
                  </p>
                </div>
              </FadeInView>

              <FadeInView delay={0.6}>
                <div className="bg-card rounded-xl p-6 border border-border/20">
                  <h2 className="text-xl font-semibold mb-4">
                    {t('privacyPolicy.changes.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('privacyPolicy.changes.content')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {t('privacyPolicy.lastUpdated')}: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </FadeInView>
            </div>
          </div>
        </FadeInView>
      </main>
    </Layout>
  );
};

export default PrivacyPolicy;
