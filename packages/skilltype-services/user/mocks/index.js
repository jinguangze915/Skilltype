import { pickFirst, profileTagGroups } from '@skilltype/data'
import { delay } from '../../lib/mocks'

const { suggestionsByType } = profileTagGroups

let settings = {
  firstName: 'Elaine',
  lastName: 'Westbrooks',
  email: 'elainelw@email.unc.edu',
  role: {
    name: 'ROLE_ADMIN',
  },
  cellPhoneNumber: '(212) 555',
  zipcode: '27514',
  city: 'Chapel Hill',
  state: 'NC',
  country: 'US',
  tagline: 'University Librarian',
  cardColor: 'rain',
  gender: 'female',
  ethnicity: 'black-african-american',
  nationality: 'american',
  disability: false,
  veteran: false,
}
const dedupe = {}
let profile = {
  affiliations: ['Tulane University', 'American Library Association'],
  skills: pickFirst(30, suggestionsByType.skills, dedupe),
  interests: pickFirst(10, suggestionsByType.interests, dedupe),
  productExperience: pickFirst(40, suggestionsByType.products, dedupe),
}

export const getSettings = async () => {
  await delay(2)
  return settings
}
export const getProfile = async () => {
  await delay(2)
  return profile
}
export const saveSettings = async values => {
  settings = values
  await delay(2)
  return settings
}
export const saveProfile = async values => {
  profile = values
  await delay(2)
  return profile
}
