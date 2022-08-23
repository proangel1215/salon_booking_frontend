import * as types from '../constants/index'
import * as _ from 'lodash'
import { message } from 'antd'
import { ref } from '../constants/firebase'

export function addSalon (param) {
  return {
    type: types.ADD_SALON,
    param
  }
}

export function updateSalon (param) {
  return {
    type: types.UPDATE_SALON,
    param
  }
}

export function addUnapprovedSalon (param) {
  return {
    type: types.ADD_SALON_APPROVE,
    param
  }
}

export function updateUnapprovedSalon (param) {
  return {
    type: types.UPDATE_SALON_APPROVE,
    param
  }
}

function makeDBSalon (salon) {
  const dbSalon = {
    address: salon.address,
    contactPerson: salon.contactPerson,
    desciption: salon.desciption,
    email: salon.email,
    lat: salon.lat,
    lng: salon.lng,
    name: salon.name,
    phone: salon.phone,
    webSite: salon.site,
    area: salon.area,
    zip: salon.zip,
    parking: salon.parking,
    serviceTypes: salon.serviceTypes
  }
  if (_.isUndefined(salon.site)) dbSalon.webSite = ''
  if (_.isUndefined(salon.desciption)) dbSalon.desciption = ''
  if (_.isUndefined(salon.contactPerson)) dbSalon.contactPerson = ''
  if (_.isUndefined(salon.email)) dbSalon.email = ''
  if (_.isUndefined(salon.area)) dbSalon.area = ''
  if (_.isUndefined(salon.zip)) dbSalon.zip = ''
  if (_.isUndefined(salon.parking)) dbSalon.parking = ''
  if (_.isUndefined(salon.serviceTypes)) dbSalon.serviceTypes = ''
  return dbSalon
}

export function newSalon (salon) {
  return function * (dispatch, getState) {
    // console.log('add salon action', salon)
    const dbSalon = makeDBSalon(salon)
    // console.log('db salon', dbSalon)
    try {
      yield ref.child('salons').push(dbSalon)
      message.success(`New salon "${salon.name}" is created!`, 3)
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function editSalon (salonId, salon) {
  return function * (dispatch, getState) {
    // console.log('add salon action', salon)
    const dbSalon = makeDBSalon(salon)
    // console.log('db salon', dbSalon)
    try {
      yield ref.child('salons').child(salonId).update(dbSalon)
      message.success(`Salon "${salon.name}" is saved!`, 3)
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function fetchSalon (salonId) {
  return function * (dispatch, getState) {
    try {
      const snapshot = yield ref.child('salons').child(salonId).once('value')
      const salon = snapshot.val()
      dispatch(addSalon(salon))
    } catch (e) {
      console.error(e.stack)
    }
  }
}
