import { type CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js/min'

export const formatPhone = (input: string, defaultCountry: CountryCode = 'PE') => {
  const phone = parsePhoneNumberFromString(input, defaultCountry)
  return phone?.isValid() ? phone.formatInternational() : input
}