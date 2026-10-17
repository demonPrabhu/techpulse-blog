import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

/**
 * TinyMCE rich text editor styled for dark theme layouts.
 * Integrates directly with react-hook-form Controller wrappers.
 */
export default function RTE({
    name,
    control,
    label,
    defaultValue = '',
    rules
}) {
  return (
    <div className="w-full space-y-2">

        {label && (
            /* Styled the label to match your application's input labels perfectly */
            <label className="text-sm font-semibold tracking-wide text-slate-300 block mb-1">
                {label}
            </label>
        )}

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange}, fieldState: {error}}) => (
            <div className="w-full">
              <Editor
                apiKey={conf.tinyMceApiKey}
                initialValue={defaultValue}
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    
                    /* 🚀 THE FIXED DARK THEME INITIALIZATION PROPERTIES */
                    skin: "oxide-dark",          // Turns the editor UI frame/buttons dark
                    content_css: "dark",         // Turns the editable area inside the iframe dark
                    
                    plugins: [
                        "image", "advlist", "autolink", "lists", "link", 
                        "charmap", "preview", "anchor", "searchreplace", 
                        "visualblocks", "code", "fullscreen", "insertdatetime", 
                        "media", "table", "help", "wordcount"
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    
                    /* Extended font color parameters to make written text readable in dark mode */
                    content_style: `
                        body { 
                            font-family: Inter, Helvetica, Arial, sans-serif; 
                            font-size: 15px; 
                            color: #f1f5f9; 
                            background-color: #0f172a; 
                        }
                    `
                }}
                onEditorChange={onChange}
              />
              {/* Swapped text-red-600 with text-red-400 for proper contrast on dark backdrops */}
              {error && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">{error.message}</p>
              )}
            </div>
          )}
        />

    </div>
  )
}
