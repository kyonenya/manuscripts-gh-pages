import { useState } from 'preact/hooks';
import { articlable } from './types';

export const useSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (params: {
    article: articlable,
    isNew: boolean,
  }) => {
    setIsSubmitting(true);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${params.article.uuid}`, {
      method: params.isNew ? 'POST' : 'PUT',
      body: JSON.stringify(params.article),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(_ => setIsSubmitting(false))
      .catch(err => console.error(err));
  };

  return { submit, isSubmitting };
};