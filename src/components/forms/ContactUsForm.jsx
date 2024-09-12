import { send as sendEmail } from '@emailjs/browser';
import { useState } from 'react';
import { Form, TextInput } from '../../components';
import { useAlert, useGAEventTracker } from '../../hooks';
import { useTranslation } from '../../contexts/TranslationContext';

function ContactUsForm() {
  const { translate } = useTranslation();
  const gaEventTracker = useGAEventTracker('Contact Us');
  const initialSenderDetails = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  const [senderDetails, setSenderDetails] = useState(initialSenderDetails);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    gaEventTracker({ action: 'Submit', label: 'Contact Us' });
    setLoading(true);
    try {
      await sendEmail(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          subject: senderDetails.subject,
          userName: senderDetails.name,
          message: senderDetails.message,
          userEmail: senderDetails.email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setLoading(false);
      setSenderDetails(initialSenderDetails);
      useAlert('success', translate('mail_sent'));
    } catch (error) {
      console.error(error);
      useAlert('error', error?.text || translate('unknown_error'));
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setSenderDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Form className="card mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <TextInput
          required
          icon="account_circle"
          placeholder={translate('enter_organization_name')}
          type="text"
          value={senderDetails.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <TextInput
          required
          icon="mark_as_unread"
          placeholder={translate('enter_email_id')}
          type="email"
          value={senderDetails.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <TextInput
          required
          icon="subject"
          placeholder={translate('enter_subject')}
          type="text"
          value={senderDetails.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
        />
        <div className="flex w-full items-center rounded-md border border-black/30 bg-white p-2 outline-none dark:border-white/30 dark:bg-black/50">
          <textarea
            required
            className="ml-1 h-[100px] w-full resize-none rounded-lg border-none bg-transparent font-medium tracking-wide text-black outline-none dark:text-white lg:text-xl"
            placeholder={translate('message_placeholder')}
            value={senderDetails.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
          <span className="material-symbols-outlined mx-1 mb-auto mt-1 flex cursor-pointer items-center justify-center text-black dark:text-white md:text-3xl">
            comment
          </span>
        </div>
        <div className="flex gap-5">
          <button
            className="fill-button mt-1 w-full bg-red-500 hover:bg-red-400"
            disabled={loading}
            onClick={() => setSenderDetails(initialSenderDetails)}
          >
            {translate('cancel')}
          </button>
          <button
            className="fill-button mt-1 w-full disabled:opacity-70"
            disabled={loading}
            type="submit"
          >
            {loading ? translate('sending') : translate('send')}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default ContactUsForm;
