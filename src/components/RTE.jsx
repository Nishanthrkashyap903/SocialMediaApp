import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf.js';
import { Controller } from 'react-hook-form';

export default function RTE({
  control,
  className,
  defaultValue = "",
  label = "",
  name,
}) {
  //TODO: Learn about Controllers in react-hook-form and also customize the editor
  return (
    <div className={`${className}`}>
      <div className='w-3/4 flex justify-start'>
        <label className='text-xl my-2 font-medium'>{label}</label>
      </div>
      <Controller
        name={name ||'content'}
        control={control}
        render={
          ({ field: { onChange } }) =>
          (<Editor
            apiKey={conf.appWriteEditorId}
            init={{
              height: "75%",
              width: "75%",
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            initialValue={defaultValue}
            onEditorChange={onChange}
          />
          )
        }
      />
    </div>

  );
}