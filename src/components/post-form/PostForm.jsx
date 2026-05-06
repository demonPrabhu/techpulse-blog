import React, { useCallback } from 'react'
import { Button, Input, RTE, Select } from '.././index.js'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router'

export default function PostForm(post) {

    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    
    const navigate = useNavigate()
    const user = useSelector( (state)=> state.auth.userData)

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
                navigate('/post/{dbPost.$id}')  // Review Later, ${dbPost.$id} in code
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data, 
                    userid: userData.$id
                })
                if(dbPost)
                navigate('/post/{dbPost.$id}')  // Review Later, ${dbPost.$id} in code
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
        const subscription = watch( (value, [ name ])=> {
            if( name == title)
                setValue('slug', slugTransform(value.title), { shouldValidate: true} )         
        })
        return ()=> subscription.unsubscribe()
    },[watch, setValue, slugTransform] )    
    

  return (
    <div>
        <form onSubmit={handleSubmit(submit)}>
{/* title, slug, content, featuredImage, status, userId             */}
            <Input
            label='Title' 
            placeholder='Title'
            {...register('title', {required: true}) }
            />

            <Input 
            label='Slug'
            placeholder='Slug'
            {...register( 'slug', {required: true} )}
            onInput= {( (e)=> setValue( 'slug', slugTransform(e.currentTarget.value), { shouldValidate: true}) )}
            />
            
            <RTE
              label= 'Content :'
              name='Content'  
              control= {control}
              defaultValue= { getValues('content') }
            />

            <Input 
            label= ' Featured Image : '
            type='file'
            accept= ' image/png, image/jpg, image/jpeg, image/gif'
            {...register( 'image', { required: !post })}
            /> 


            { post && 
                <img 
                    src= { appwriteService.getFilePreview(post.featuredImage) }
                    alt= { post.title}
                />
            }

            <Select 
                label= 'Status :'
                options= { ['active' , 'inactive'] }
                {...register('status', {required: true})}
            />

            <Button 
                type='submit'
            >
                { post? 'Update' : 'Submit' }
            </Button>
        </form>
    </div>
  )
}
}