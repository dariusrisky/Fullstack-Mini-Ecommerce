import React from 'react'
import InformationProfile from '../components/InformationProfile'
import NavbarComponent from '../components/NavbarComponent'


function ProfilePage() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <InformationProfile></InformationProfile>
    </div>
  )
}

export default ProfilePage