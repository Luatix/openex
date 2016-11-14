import {Schema, arrayOf} from 'normalizr'

export const file = new Schema('files', {idAttribute: 'file_id'})
export const arrayOfFiles = arrayOf(file)

export const exerciseStatus = new Schema('exercise_statuses', {idAttribute: 'status_id'})
export const arrayOfExercisesStatuses = arrayOf(exerciseStatus)

export const injectStatus = new Schema('inject_statuses', {idAttribute: 'status_id'})
export const arrayOfInjectStatuses = arrayOf(injectStatus)

export const injectState = new Schema('inject_states', {idAttribute: 'state_id'})
export const arrayOfInjectStates = arrayOf(injectState)

export const token = new Schema('tokens', {idAttribute: 'token_id'})
export const arrayOfTokens = arrayOf(token)

export const organization = new Schema('organizations', {idAttribute: 'organization_id'})
export const arrayOfOrganizations = arrayOf(organization)

export const user = new Schema('users', {idAttribute: 'user_id'})
export const arrayOfUsers = arrayOf(user)

export const exercise = new Schema('exercises', {idAttribute: 'exercise_id'})
export const arrayOfExercises = arrayOf(exercise)

export const audience = new Schema('audiences', {idAttribute: 'audience_id'})
export const arrayOfAudiences = arrayOf(audience)

export const event = new Schema('events', {idAttribute: 'event_id'})
export const arrayOfEvents = arrayOf(event)

export const incident = new Schema('incidents', {idAttribute: 'incident_id'})
export const arrayOfIncidents = arrayOf(incident)

export const inject = new Schema('injects', {idAttribute: 'inject_id'})
export const arrayOfInjects = arrayOf(inject)

token.define({
  token_user: user
})

user.define({
  user_organization: organization
})

exercise.define({
  exercise_status: exerciseStatus
})

audience.define({
  audience_users: arrayOfUsers,
  audience_exercise: exercise
})

event.define({
  event_exercise: exercise,
  event_incidents: arrayOfIncidents
})

incident.define({
  incident_event: event,
  incident_injects: arrayOfInjects
})

inject.define({
  inject_incident: incident,
})