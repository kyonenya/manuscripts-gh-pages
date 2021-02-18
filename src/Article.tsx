import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { Editor } from './Editor';
import { useSubmit } from './useSubmit';
import { articlable, emptyArticle } from './types';

export const Article = (props: {
  initArticle: articlable|null,
  uuid: string,
  isNew: boolean,
  setModified: () => void,
}) => {
  const [article, setArticle] = useState<articlable>(emptyArticle);
  const { submit, isSubmitting } = useSubmit();
  const editorRef: Ref<EasyMDE> = useRef();

  useEffect(() => {
    if (props.initArticle) return setArticle(props.initArticle);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`)
      .then(response => response.json())
      .then(article => setArticle(article));
  }, []);

  const handleSubmit = () => {
    submit({
      text: editorRef.current.value(),
      tags: ['dummyTag1', 'dummyTag2'],
      uuid: props.isNew ? uuidv4().replace(/-/g, '') : article.uuid,
      starred: false,
    }, props.isNew);
    props.setModified();
    if (props.isNew) localStorage.setItem('smde_new', '');
  };

  return (
    <Fragment>
      <HeaderMenu
        createdAt={
          props.isNew
            ? dayjs().format('YYYY-MM-DD HH:mm')
            : article.created_at
              ? dayjs(article.created_at).format('YYYY-MM-DD HH:mm')
              : '...'
          }
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <Editor
        article={article}
        isNew={props.isNew}
        editorRef={editorRef}
      />
    </Fragment>
  );
};

//7bd2954f3a5c41f09e440e1f9e373f13
//034392a0ef2f46e4842e249c9bf6dfc5
