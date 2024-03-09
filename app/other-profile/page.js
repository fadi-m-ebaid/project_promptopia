"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'


const OtherProfile = () => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userId = searchParams.get('id')
   

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data)
        }
        if (userId) {
            fetchPosts();
        }
    }, [])


    return (
        <Profile
            name={posts[0]?.creator.username}
            desc={`Welcome to ${posts[0]?.creator.username}'s profile`}
            data={posts}
        />
    )
}

export default OtherProfile
