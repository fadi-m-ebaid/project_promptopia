import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='flex-start w-full max-w-full flex-col'>
      <h1 className="text-left head_text">
        <span className='blue_gradient'>{type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and create amazing prompts with the world,
        and let your imagination wild with any AI-Powered platform
      </p>

      <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        onSubmit={handleSubmit}
      >
        <label>
          <span className='font-satoshi font-semibold
          text-base text-gray-700'>Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({
              ...post,
              prompt: e.target.value
            })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          ></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold
          text-base text-gray-700'>Tag {' '}</span>
          <span className='text-normal text-sm'>(#product, #webdevelopment, #economy, #idea)</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({
              ...post,
              tag: e.target.value
            })}
            placeholder='#tag'
            required
            className='form_input'
          ></input>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className='text-gray-500'>
              Cancel
            </Link>
            <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {submitting? `${type}...` : type}
            </button>
        </div>
      </form>
    </section>
  )
}

export default Form
