import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from './List';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const Recent = ({ updateTotal }) => {
  const [questions, setQuestions] = useState([]);
  const [showError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.API_URL || ''}/api/questions_recent`)
      .then(({ data }) => {
        setQuestions(data);
        updateTotal(data.length);
      })
      .catch(e => {
        setError(e);
        // todo: log to Sentry
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>{isLoading ? <LoadingState /> : showError ? <ErrorState /> : <List items={questions} />}</>
  );
};

Recent.propTypes = {
  updateTotal: PropTypes.func.isRequired,
};

export default Recent;
