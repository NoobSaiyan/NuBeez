import axios from 'axios'
import { setAlert } from './alert'
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  NO_REPOS,
} from './types'

//get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    console.log(err.response)
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // })
  }
}

//get all users profile
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const res = await axios.get('/api/profile')

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    console.log('nigga')
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    })
  }
}

//create and update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post('/api/profile', formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const error = err.response.data.error

    if (error) {
      error.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put('api/profile/experience', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.error

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put('api/profile/education', formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.error

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`./api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`./api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//delete profile / account
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert('Your account has been permanantly deleted', 'danger'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
