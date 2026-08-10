import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

/**
 * TinyMCE rich text editor wired into react-hook-form via Controller.
 * Accepts an optional `rules` object (react-hook-form validation rules)
 * and renders the resulting error message below the editor.
 */
export default function RTE({ // Mistake: Forgot to take Props as object, remember, more than 1 prop, mostly are objects
    name,
    control,
    label,
    defaultValue = '',
    rules
}) {
  return (
    <div>

        {label && <label>
            { label}
            </label>
            }

        <Controller
         name={name}
         control={control}
         rules={rules}
        render={({field: {onChange}, fieldState: {error}}) => (
        <>
        <Editor
        apiKey={conf.tinyMceApiKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
        {error && (
            <p className="mt-1 text-xs text-red-600 font-medium">{error.message}</p>
        )}
        </>
    )}
    />

    </div>
  )
}
