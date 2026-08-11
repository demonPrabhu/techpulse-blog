import React, { useCallback } from 'react'
import { Button, Input, RTE, Select } from '.././index.js'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router'

/**
 * Create/edit form for a blog post. Reused for both flows: passing a `post`
 * switches it into edit mode (pre-filled fields, update instead of create).
 */
export default function PostForm({post}) {

    const { register, handleSubmit, control, watch, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            // slug is stored as the row's $id (Appwrite doesn't echo it back as a
            // regular data field — see createPost's rowId: slug), not post.slug.
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    
    const navigate = useNavigate()
    const userData = useSelector( (state)=> state.auth.userData)

    // Edit mode updates the existing row; only re-uploads the image if a new
    // file was chosen, and deletes the old one from storage to avoid orphans.
    // Create mode always uploads an image (required) and creates a new row.
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file)
                appwriteService.deleteFile(post.featuredImage)

            const dbPost = await appwriteService.updatePost(
                post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                }
            )

            if(dbPost)
                navigate(`/post/${dbPost.$id}`)
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    userName: userData.name
                })
                if(dbPost)
                navigate(`/post/${dbPost.$id}`)
            }
    }
}

    // Turns a title into a URL-safe slug: lowercase, non-alphanumeric chars
    // become hyphens, whitespace becomes hyphens. Capped at 36 chars because
    // the slug is used as the Appwrite row ID (see createPost's rowId: slug),
    // and Appwrite rejects row IDs longer than that.
    const slugTransform = useCallback((value)=>{
        if( value && typeof(value) =='string' ){
    const slug = value
            .trim()
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')

    if (slug.length <= 36) return slug

    // Cut at 36 chars, then back off to the last complete hyphen-separated
    // segment so we don't end mid-word (e.g. "-replac" from "-replaced").
    const truncated = slug.slice(0, 36)
    const lastHyphen = truncated.lastIndexOf('-')
    return lastHyphen > 0 ? truncated.slice(0, lastHyphen) : truncated
        }

    return ''
    },[])

    // Auto-generate the slug from the title as the user types, unless
    // they've started editing the slug field directly (see onInput below).
    React.useEffect( () => {
        const subscription = watch( (value, { name })=> {
            if( name == 'title')
                setValue('slug', slugTransform(value.title), { shouldValidate: true} )
        })
        return ()=> subscription.unsubscribe()
    },[watch, setValue, slugTransform] )

return (
        // Added a crisp card wrapper container with background depth
        <div className="w-full p-6 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-4">
                
                {/* Left Side: Dynamic Core inputs (Title, Slug, Text Area Editor) */}
                <div className="w-full lg:w-2/3 px-4 flex flex-col gap-5">
                    <div>
                        <Input
                            label='Title'
                            placeholder='Enter a catchy title...'
                            {...register('title', {required: 'Title is required'}) }
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            label='Slug'
                            placeholder='url-slug-auto-generated'
                            {...register('slug', {required: 'Slug is required'})}
                            onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        />
                        {errors.slug && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.slug.message}</p>
                        )}
                    </div>
                    
                    {/* TinyMCE wrapper card to separate text editor visually */}
                    <div className="rounded-xl border border-gray-100 p-1 bg-gray-50/50">
                        <RTE
                          label='Content'
                          name='content'
                          control={control}
                          defaultValue={getValues('content')}
                          // TinyMCE's "empty" value is HTML like "<p></p>", not "",
                          // so a plain `required` rule wouldn't catch a blank post.
                          rules={{
                            validate: (value) =>
                              (value && value.replace(/<[^>]*>/g, '').trim().length > 0) ||
                              'Content is required'
                          }}
                        />
                    </div>
                </div>

                {/* Right Side: Media Control & Actions bar */}
                <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0 flex flex-col gap-6">
                    
                    {/* Media Upload Box wrapper */}
                    <div className="p-5 border border-gray-200 border-dashed rounded-2xl bg-gray-50/50 flex flex-col gap-4">
                        {/* Only required when creating: an edit keeps the existing image if none is chosen. */}
                        <Input
                            label='Featured Image'
                            type='file'
                            accept='image/png, image/jpg, image/jpeg, image/gif'
                            {...register('image', { required: post ? false : 'Featured image is required' })}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-gray-500 cursor-pointer w-full"
                        />
                        {errors.image && (
                            <p className="text-xs text-red-600 font-medium">{errors.image.message}</p>
                        )}

                        {/* Interactive Image Frame with overlay accents */}
                        {post && (
                            <div className="w-full overflow-hidden border border-gray-200 rounded-xl group relative shadow-inner">
                                <img 
                                    src={appwriteService.getFilePreview(post.featuredImage)} 
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                            </div>
                        )}
                    </div>

                    {/* Status & Options Wrapper */}
                    <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
                        <Select
                            label='Post Visibility Status'
                            options={['active', 'inactive']}
                            {...register('status', {required: 'Status is required'})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        />
                        {errors.status && (
                            <p className="text-xs text-red-600 font-medium">{errors.status.message}</p>
                        )}

                        <Button 
                            type='submit'
                            className={`w-full py-3 px-4 font-semibold text-white rounded-xl shadow-md transform active:scale-95 transition-all duration-200 ${
                                post 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200'
                            }`}
                        >
                            {post ? 'Update Changes' : 'Publish Post'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
