import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import EmptyState from './EmptyState';
import { debounce, getlocalStorageItem } from '../../utils';

export default ({ items }) => {
  const [questions, setQuestions] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [showError, setError] = useState(false);

  const lsKey = 'votes';

  const getUserVotes = () => getlocalStorageItem(lsKey) || [];

  const saveUserVotes = id =>
    localStorage.setItem(lsKey, JSON.stringify({ ...getUserVotes(), ...{ [id]: id } }));

  useEffect(() => {
    setQuestions(items);
    setUserVotes(getUserVotes());
  }, [items]);

  const incrementVote = ({ id, index, score }) => {
    const newArr = [...questions];
    newArr[index].score = parseInt(score, 10) + 1;
    // Set active state on the clicked button
    setUserVotes({ ...userVotes, ...{ [id]: id } });
    // Increment vote count on the clicked question
    setQuestions(newArr);
  };

  const voteHandler = args => {
    const { id } = args;
    // Optimistic UI update
    incrementVote(args);
    axios
      .post(`${process.env.API_URL || ''}/api/question_upvote`, {
        id,
      })
      .then(function() {
        saveUserVotes(id);
        setUserVotes(getUserVotes());
      })
      .catch(function(e) {
        setError(e);
        // todo: log to Sentry
      });
  };
  return (
    <ul className="flex flex-col">
      {questions.length > 0 ? (
        questions.map(function(item, index) {
          return (
            <ListItem
              key={index}
              item={item}
              voteHandler={debounce(
                args => voteHandler({ index, score: item.score, ...args }),
                300,
              )}
              active={userVotes[item.id]}
            />
          );
        })
      ) : (
        <EmptyState />
      )}
    </ul>
  );
};
