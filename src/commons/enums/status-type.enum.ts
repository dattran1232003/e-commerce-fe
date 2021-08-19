export enum EStatus {
  // 200 up
  OK = 'ok',
  CREATED = 'created',
  ACCEPTED = 'accepted',
  // 400 up
  BADREQUEST = 'bad_request',
  UNAUTHORIZE = 'unauthorize',
  FORBIDEN = 'forbiden',
  NOT_FOUND = 'not_found',
  // 500
  INTERNAL_SERVER_ERROR = 'internal_server_error',
}
