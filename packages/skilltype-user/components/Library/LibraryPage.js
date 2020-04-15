import React from 'react'
import Header from '../App/Header'
import Body from '../App/Body'
import Library from './Library'
import { withUserContext } from '../User/UserProvider'

const LibraryPage = ({ userContext, title }) => (
  <React.Fragment>
    <Header title={title} />
    <Body userData={userContext.user}>
      <Library />
    </Body>
  </React.Fragment>
)

export default withUserContext(LibraryPage)
