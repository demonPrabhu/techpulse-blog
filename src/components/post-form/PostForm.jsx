import React, { useCallback, useState } from 'react'
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

    const { register, handleSubmit, control, watch, setValue, getValues, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title || '',
            // slug is stored as the row's $id (Appwrite doesn't echo it back as a
            // regular data field — see createPost's rowId: slug), not post.slug.
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const [submitError, setSubmitError] = useState(null)

    const navigate = useNavigate()
    const userData = useSelector( (state)=> state.auth.userData)

    // Edit mode updates the existing row; only re-uploads the image if a new
    // file was chosen, and deletes the old one from storage to avoid orphans.
    // Create mode always uploads an image (required) and creates a new row.
    const submit = async (data) => {
        setSubmitError(null)
        try {
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
                else
                    setSubmitError('Something went wrong updating this post. Please try again.')
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
                    else
                        setSubmitError('Something went wrong publishing this post. Please try again.')
                } else {
                    setSubmitError('Something went wrong uploading the featured image. Please try again.')
                }
        }
        } catch (error) {
            // createPost re-throws only on a 409 (rowId/slug already taken) —
            // every other failure path above already returns falsy instead.
            if (error?.code === 409) {
                setSubmitError('A post with this title/slug already exists. Try a different title or edit the slug field directly.')
            } else {
                setSubmitError('Something went wrong. Please try again.')
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
        <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl md:p-8">
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-4">
                <div className="w-full lg:w-2/3 px-4 flex flex-col gap-5">
                    <div>
                        <Input
                            label='Title'
                            placeholder='Enter a catchy title...'
                            {...register('title', {required: 'Title is required'}) }
                            className="focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            label='Slug'
                            placeholder='url-slug-auto-generated'
                            {...register('slug', {required: 'Slug is required'})}
                            onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
                            className="focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.slug && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{errors.slug.message}</p>
                        )}
                    </div>
                    
                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-1">
                        <RTE
                          label='Content'
                          name='content'
                          control={control}
                          defaultValue={getValues('content')}
                          rules={{
                            validate: (value) =>
                              (value && value.replace(/<[^>]*>/g, '').trim().length > 0) ||
                              'Content is required'
                          }}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0 flex flex-col gap-6">
                    <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-5">
                        <Input
                            label='Featured Image'
                            type='file'
                            accept='image/png, image/jpg, image/jpeg, image/gif'
                            {...register('image', { required: post ? false : 'Featured image is required' })}
                            className="w-full cursor-pointer text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-400 hover:file:bg-blue-500/20"
                        />
                        {errors.image && (
                            <p className="text-xs text-red-400 font-medium">{errors.image.message}</p>
                        )}

                        {post && (
                            <div className="group relative w-full overflow-hidden rounded-xl border border-slate-700">
                                <img 
                                    src={appwriteService.getFilePreview(post.featuredImage)} 
                                    alt={post.title}
                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5">
                        <Select
                            label='Post Visibility Status'
                            options={['active', 'inactive']}
                            {...register('status', {required: 'Status is required'})}
                            className="w-full rounded-xl border border-slate-700/50 bg-slate-950/60 px-4 py-2.5 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.status && (
                            <p className="text-xs text-red-400 font-medium">{errors.status.message}</p>
                        )}

                        {submitError && (
                            <p className="text-xs text-red-400 font-medium">{submitError}</p>
                        )}

                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className={`w-full rounded-xl py-3 px-4 font-semibold shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                                post
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/15'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/15'
                            }`}
                        >
                            {isSubmitting
                                ? (post ? 'Updating...' : 'Publishing...')
                                : (post ? 'Update Changes' : 'Publish Post')}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
