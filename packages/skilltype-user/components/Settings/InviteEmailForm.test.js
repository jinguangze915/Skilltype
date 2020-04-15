import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@skilltype/ui/shared-styles'
import InviteEmailForm from './InviteEmailForm'

jest.mock('bugsnag-js', () => () => ({
  use(plugin) {
    const boundary = plugin.init()
    delete boundary.prototype.componentDidCatch
    return boundary
  },
}))

beforeEach(() => {
  jest.clearAllMocks()
})
afterEach(cleanup)

const inviteUsers = jest.fn()
const notifyError = jest.fn()
const notifyClose = jest.fn()

const props = {
  userContext: {
    inviteUsers,
  },
  notifyError,
  notifyClose,
}

describe('<InviteEmailForm />', () => {
  describe('IF emails are valid and comma separated and form is submitted', () => {
    it('invites users and clears the input', () => {
      const { container } = render(
        <ThemeProvider>
          <InviteEmailForm {...props} />
        </ThemeProvider>
      )
      const input = container.querySelector('#invite-form_emailsCommaSeparated')
      const submit = container.querySelector('button[type="submit"]')
      fireEvent.change(input, {
        target: { value: 'a@a.co, b@b.co, c@c.co' },
      })
      fireEvent.click(submit)
      expect(inviteUsers).toHaveBeenCalledTimes(1)
      expect(input.value).toBe('')
    })
  })
  describe('IF emails are NOT valid but are comma separated and form is submitted', () => {
    it('invites users and clears the input', () => {
      const { container } = render(
        <ThemeProvider>
          <InviteEmailForm {...props} />
        </ThemeProvider>
      )
      const input = container.querySelector('#invite-form_emailsCommaSeparated')
      const submit = container.querySelector('button[type="submit"]')

      fireEvent.change(input, {
        target: { value: 'a@a.co, b@b.co, c@c.co, ddd' },
      })

      fireEvent.click(submit)
      expect(inviteUsers).not.toHaveBeenCalled()
      expect(notifyError).toHaveBeenCalledTimes(1)
      expect(notifyClose).toHaveBeenCalledTimes(1)
    })
  })
})
