import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();
  const onSubmit = (data: ContactFormData) => {
    // Implementar envio do formulário
    console.log(data);
  };

  return (
    <motion.section
      id="contato"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder={t('contact.form.namePlaceholder')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {t('contact.form.nameError')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder={t('contact.form.emailPlaceholder')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {t('contact.form.emailError')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              {...register('message', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              rows={4}
              placeholder={t('contact.form.messagePlaceholder')}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {t('contact.form.messageError')}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {t('contact.form.submit')}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">
            {t('contact.info.title')}
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-primary">•</span>
              <span className="ml-2">tarcisiobispo@gmail.com</span>
            </div>
            <div>
              <span className="text-primary">•</span>
              <span className="ml-2">+55 (11) 99999-9999</span>
            </div>
            <div>
              <span className="text-primary">•</span>
              <span className="ml-2">São Paulo, Brasil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
