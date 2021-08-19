import { EStatus } from '@/commons/enums'

export default function statusType(status: number): EStatus {
  const cases: { [k: number]: EStatus } = {
    200: EStatus.OK,
    201: EStatus.CREATED,
    202: EStatus.ACCEPTED,

    400: EStatus.BADREQUEST,
    401: EStatus.UNAUTHORIZE,
    403: EStatus.FORBIDEN,
    404: EStatus.NOT_FOUND,

    // default
    500: EStatus.INTERNAL_SERVER_ERROR,
  }

  return cases[status || 500]
}
