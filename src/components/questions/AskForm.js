import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { EmailIcon, AccountIcon, InfoIcon } from '../../images/icons';

const AskForm = ({ onSuccess, onError, close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, clearErrors, reset } = useForm();

  const onSubmit = data => {
    setIsLoading(true);
    axios
      .post(`${process.env.API_URL || ''}/api/question_create`, data)
      .then(function() {
        setIsLoading(false);
        reset();
        onSuccess();
      })
      .catch(function(error) {
        setIsLoading(false);
        onError();
      });
  };
  return (
    <form className="md:inline-block w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          id="question"
          name="question"
          rows="7"
          className={`w-full py-2 px-3 mt-3 leading-10 text-high-on-surface-0 appearance-none border rounded leading-tight resize-none border rounded focus:outline-none focus:shadow-outline ${
            errors.question
              ? 'border-error placeholder-error'
              : 'border-secondary placeholder-disabled-on-surface-0'
          }`}
          placeholder={`${errors.question ? 'Please, type your question' : 'Type your question about any technology you want to learn about and I will explain it to you in simple terms'}`}
          onChange={() => clearErrors('question')}
          ref={register({
            required: 'Email address is required',
          })}
        ></textarea>
      </div>
      <div>
        <div className="flex flex-row">
          <div className="w-1/12">
            <AccountIcon className="inline-block fill-current h-8 w-8 mt-1 text-disabled-on-surface-0" />
          </div>
          <div className="w-11/12 text-left leading-8">
            <input
              className={`w-full text-medium-on-surface-0 placeholder-disabled-on-surface-0 appearance-none py-2 pl-3 md:px-0 leading-6 focus:outline-none`}
              name="author"
              type="text"
              placeholder="Your name (optional)"
              ref={register()}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/12">
            <EmailIcon className="inline-block fill-current h-8 w-8 mt-1 text-disabled-on-surface-0" />
          </div>
          <div className="w-11/12 flex flex-col text-left leading-8 relative">
            <input
              className={`w-full text-medium-on-surface-0 placeholder-disabled-on-surface-0 appearance-none py-2 pl-3 md:px-0 leading-6 focus:outline-none`}
              name="email"
              type="text"
              placeholder="Your email (optional)"
              onChange={() => clearErrors('email')}
              ref={register({
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <div
              className={`absolute text-error text-xs mt-6 ml-3 md:ml-0 ${
                errors.email ? 'visible' : 'invisible'
              }`}
            >
              {errors.email && errors.email.message}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-3">
        <div className="w-1/12 pl-1">
          <InfoIcon className="inline-block fill-current h-5 w-5 text-blue-300" />
        </div>
        <div className="w-11/12 text-sm md:text-xs text-left text-disabled-on-surface-0 md:mt-1">
          Your email will only be used for notifying you when your question is posted or answered by
          me.
        </div>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <a
          className="py-2 px-8 bg-transparent text-secondary font-medium cursor-pointer border border-secondary rounded mr-2"
          onClick={close}
        >
          Close
        </a>
        <input
          type="submit"
          disabled={isLoading}
          className="py-2 px-8 bg-transparent text-accent font-medium cursor-pointer border border-accent rounded"
          value={isLoading ? 'Sending ...' : 'Send'}
        />
      </div>
    </form>
  );
};

export default AskForm;
