import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import Questions from '../../components/questions'


class QuestionsPage extends React.Component {
  render() {
    return (
      <Layout>
        <Questions helmet={<Helmet title={'Ask questions and get answers'} />} />
      </Layout>
    );
  }
}

export default QuestionsPage;
