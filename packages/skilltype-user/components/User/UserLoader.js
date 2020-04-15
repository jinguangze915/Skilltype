import React from 'react'
import Progress from '@skilltype/ui/components/Progress/Progress'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import UserProvider from './UserProvider'

export const LoadingFallback = () => <Progress />

export default withAwait(UserProvider)
