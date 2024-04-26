import React from 'react'
import ProfileHeader from './profileHeader'
import ProfileSider from './profileSider'
import ProfileCenter from './profileCenter'

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader/>

      <div className='flex  '>
      <ProfileSider/>
      <ProfileCenter/>
      </div>
    </div>
  )
}

export default ProfilePage
