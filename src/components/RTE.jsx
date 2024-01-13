import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf.js';

export default function RTE(props) {
  return (
    <Editor
      apiKey={conf.appWriteEditorId}
      
      init={{
        height:500,
        width:500,
        
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}