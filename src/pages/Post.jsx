import React from 'react'
import RTE from '../components/RTE.jsx'

function Post({className,...props}) {
  //TODO: Complete the post component
  return (
    <div className={`${className} flex justify-center align-middle`}>
      <RTE />
    </div>
  )
}

export default Post
