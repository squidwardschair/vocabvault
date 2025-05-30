import { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Recaptcha = ({ onVerify }: { onVerify(token:string): void}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        onVerify(token); // Send token to backend or handle verification here
      }
    };
    if (executeRecaptcha !== null) {
        verifyCallback();
      }
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null; // This component doesn't render anything visible in the DOM
};

export default Recaptcha;