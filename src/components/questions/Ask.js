import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import avatar from '../../images/profile-pic.jpeg';
import AskForm from './AskForm';
import { CheckIcon, ErrorIcon } from '../../images/icons';

const FormHeader = () => (
  <div className="flex flex-row">
    <div className="w-2/12 md:w-1/12 flex-shrink-0 rounded-full">
      <PreviewCompatibleImage
        imageInfo={{
          image: avatar,
          alt: "It's me around 5 years ago",
        }}
        style={{ overflow: 'initial' }}
        className="h-8 w-8 rounded-full inline-block"
      />
    </div>
    <div className="w-10/12 md:w-11/12 text-left leading-8 pl-2">
      <label htmlFor="question">Ask me a tech question</label>
    </div>
  </div>
);

const Form = ({ onSuccess, onError, close }) => (
  <>
    <FormHeader />
    <AskForm onSuccess={onSuccess} onError={onError} close={close} />
  </>
);

const CloseBtn = ({ close }) => (
  <a
    className="py-2 px-8 bg-transparent text-secondary font-medium cursor-pointer border border-secondary rounded mr-2"
    onClick={close}
  >
    Close
  </a>
);

const AskBtn = ({ showForm, label = 'Ask another question' }) => (
  <a
    className="py-2 px-8 bg-transparent text-accent font-medium cursor-pointer border border-accent rounded"
    onClick={showForm}
  >
    {label}
  </a>
);

const Success = ({ showForm, close }) => (
  <div className="flex flex-col items-center p-1">
    <CheckIcon className="block fill-current h-12 w-12 mb-5 text-green-500" />
    <p className="text-xl mb-5 text-high-on-surface-0">All done!</p>
    <p className="text-sm md:text-xs text-center text-medium-on-surface-0 mb-10">
      Your question will be moderated shortly.
    </p>
    <div className="flex flex-row">
      <CloseBtn close={close} />
      <AskBtn showForm={showForm} />
    </div>
  </div>
);

const Error = ({ showForm, close }) => (
  <div className="flex flex-col items-center p-1">
    <ErrorIcon className="block fill-current h-12 w-12 mb-5 text-error" />
    <p className="text-xl mb-10">Something went wrong...</p>
    <div className="flex flex-row">
      <CloseBtn close={close} />
      <AskBtn showForm={showForm} label="Ask again" />
    </div>
  </div>
);

const Ask = ({ open, closeModal }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const showForm = () => {
    setSuccess(false);
    setError(false);
  };

  const onSuccess = () => setSuccess(true);

  const onError = () => setError(true);

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onOpen={showForm}
      onClose={closeModal}
      className={`${!success && !error ? 'askQuestionModal' : 'askQuestionModalNarrow'}`}
    >
      <div className="flex flex-col p-4 mt-2">
        {!success && !error && <Form onSuccess={onSuccess} onError={onError} close={closeModal} />}
        {success && <Success showForm={showForm} close={closeModal} />}
        {error && <Error showForm={showForm} close={closeModal} />}
      </div>
    </Popup>
  );
};

export default Ask;
