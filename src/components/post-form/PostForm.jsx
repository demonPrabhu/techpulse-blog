import React, { useCallback } from 'react'
import { Button, Input, RTE, Select } from '.././index.js'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router'

export default function PostForm({post}) {

    console.log('PostFormComp')

    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    
    const navigate = useNavigate()
    const userData = useSelector( (state)=> state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file)
                appwriteService.deleteFile(post.featuredImage)

            const dbPost = await appwriteService.updatePost(    // Review Later
                post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                } 
            )

            if(dbPost)
                navigate(`/post/${dbPost.$id}`)  // Review Later, ${dbPost.$id} in code
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data, 
                    userId: userData.$id
                })
                if(dbPost)
                navigate(`/post/${dbPost.$id}`)  // Review Later, ${dbPost.$id} in code
            }        
    }
}

    const slugTransform = useCallback((value)=>{
        if( value && typeof(value) =='string' )
    return value
            .trim()
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
    
    return ''
    },[])

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
                    <Input
                        label='Title' 
                        placeholder='Enter a catchy title...'
                        {...register('title', {required: true}) }
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />

                    <Input 
                        label='Slug'
                        placeholder='url-slug-auto-generated'
                        {...register('slug', {required: true})}
                        onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                    
                    {/* TinyMCE wrapper card to separate text editor visually */}
                    <div className="rounded-xl border border-gray-100 p-1 bg-gray-50/50">
                        <RTE
                          label='Content'
                          name='content'  
                          control={control}
                          defaultValue={getValues('content')}
                        />
                    </div>
                </div>

                {/* Right Side: Media Control & Actions bar */}
                <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0 flex flex-col gap-6">
                    
                    {/* Media Upload Box wrapper */}
                    <div className="p-5 border border-gray-200 border-dashed rounded-2xl bg-gray-50/50 flex flex-col gap-4">
                        <Input 
                            label='Featured Image'
                            type='file'
                            accept='image/png, image/jpg, image/jpeg, image/gif'
                            {...register('image', { required: !post })}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-gray-500 cursor-pointer w-full"
                        /> 

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
                            {...register('status', {required: true})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        />

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



//   return (
//     <div>
//         <form onSubmit={handleSubmit(submit)}
//         className="flex flex-wrap"
//         >
// {/* title, slug, content, featuredImage, status, userId             */}

//         <div
//         className="w-2/3 px-2"
//         >
//             <Input
//             label='Title' 
//             placeholder='Title'
//             {...register('title', {required: true}) }
//             className="mb-4"
//             />

//             <Input 
//             label='Slug'
//             placeholder='Slug'
//             {...register( 'slug', {required: true} )}
//             onInput= {( (e)=> setValue( 'slug', slugTransform(e.currentTarget.value), { shouldValidate: true}) )}
//             className="mb-4"
//             />
            
//             <RTE
//               label= 'Content :'
//               name='content'  
//               control= {control}
//               defaultValue= { getValues('content') }
//             />
//         </div>


//         <div
//         className="1/3 px-2">
//             <Input 
//             label= ' Featured Image : '
//             type='file'
//             accept= ' image/png, image/jpg, image/jpeg, image/gif'
//             {...register( 'image', { required: !post })}
//             className="mb-4"
//             /> 


//             { post && 
//                 (<div className="w-full mb-4">
//                 <img 
//                     src= { appwriteService.getFilePreview(post.featuredImage) }
//                     alt= { post.title}
//                     className="rounded-lg"
//                 />
//                 </div>
//             )}

//             <Select 
//                 label= 'Status :'
//                 options= { ['active' , 'inactive'] }
//                 {...register('status', {required: true})}
//                 className="mb-4"
//             />

//             <Button 
//                 type='submit'
//                 className="w-full"
//             >
//                 { post? 'Update' : 'Submit' }
//             </Button>
//         </div>
//         </form>
//     </div>
//   )
// }
