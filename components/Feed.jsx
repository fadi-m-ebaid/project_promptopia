"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'

const PromptCardList = ({ posts, handleTagClick, handlePersonalInfoClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
          handlePersonalInfoClick={() => handlePersonalInfoClick(post.creator._id)}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const router = useRouter();
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPosts = (query) => {
    const filtered = posts.filter((post) => {
      return post.prompt.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query) ||
        post.creator.username.toLowerCase().includes(query)
    });
    setFilteredPosts(filtered);
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery);
    filterPosts(searchQuery);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPosts(tag.toLowerCase());
  };

  const handlePersonalInfoClick = (userId) => {
    router.push(`/other-profile?id=${userId}`)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
      setFilteredPosts(data);
    }
    fetchPosts();

  }, [])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        >
        </input>
      </form>

      <PromptCardList
        posts={searchText.trim() ? filteredPosts : posts}
        handleTagClick={handleTagClick}
        handlePersonalInfoClick={handlePersonalInfoClick}
      ></PromptCardList>
    </section>
  )
}

export default Feed
