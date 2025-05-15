import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

function CopyToClipboardButton({ textToCopy, buttonText = "Copiar" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {

      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        alert('No se pudo copiar el texto.');
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('No se pudo copiar el texto.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:opacity-50"
      disabled={!textToCopy}
    >
      {copied ? (
        <>
          <FiCheck className="mr-1.5 h-4 w-4" /> ¡Copiado!
        </>
      ) : (
        <>
          <FiCopy className="mr-1.5 h-4 w-4" /> {buttonText}
        </>
      )}
    </button>
  );
}

export default CopyToClipboardButton;