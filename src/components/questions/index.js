import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';
import { BrowserView } from 'react-device-detect';
import Link from '../CustomLink';
import Header from './Header';
import Tabs from './Tabs';
import Active from './Active';
import Recent from './Recent';
import Answered from './Answered';
import { ArrowBackIcon } from '../../images/icons';

export const Questions = ({ helmet }) => {
  const [total, setTotal] = useState(0);

  const updateTotal = total => {
    setTotal(total);
  };

  return (
    <section className="container mx-auto max-w-2xl p-6 md:p-4 md:pt-8">
      {helmet || ''}
      <BrowserView>
        <Link to="/" className="pt-4 block">
          <ArrowBackIcon />
          <span className="ml-1">Home</span>
        </Link>
      </BrowserView>
      <div className="flex flex-col md:mt-6">
        <Header />
        <Tabs total={total} />
        <Router>
          <Active path="/questions/active" updateTotal={updateTotal} />
          <Recent path="/questions/recent" updateTotal={updateTotal} />
          <Answered path="/questions/answered" updateTotal={updateTotal} />
          <Redirect default noThrow from="/" to="/questions/active" />
        </Router>
      </div>
    </section>
  );
};

Questions.propTypes = {
  helmet: PropTypes.object,
};

export default Questions;
