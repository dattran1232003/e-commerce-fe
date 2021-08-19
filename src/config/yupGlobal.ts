import * as yup from 'yup'

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/

yup.addMethod<yup.StringSchema>(
  yup.string,
  'password',
  function (message: string) {
    return this.matches(REGEX_PASSWORD, {
      message,
      excludeEmptyString: true,
    })
  }
)

export default yup
