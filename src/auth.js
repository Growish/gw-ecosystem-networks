/**
 * @api{post} /auth/ Login
 * @apiName login
 * @apiGroup Authorization
 * @apiPermission Public
 * @apiParam {String} email The user Email.
 * @apiParam {String} password The user Password.
 * @apiParam {String} accessToken The accessToken
 * @apiSuccessExample Public response example
 * {"code":200,"message":"OK","data":{"token":"Njc0NWRmMzk2ZWVmZGUy77Y2NTA1NGVmOWNkNjQzOGQ21DJlYmFmNQ==","id":"53b157b19a6b51c4048b4572","firstName":"Jhon","lastName":"Smith","birthday":"1986-03-19 00:00:00","imageUrl":"https:\/\/apidev.growish.com\/v1\/user\/53b157b19a6b51c4048b4572\/image\/","taxCode":""},"pagination":null,"uri":"https:\/\/apidev.growish.com\/v1\/auth\/","method":"POST"}
 * @apiUse AppKey
 * @apiVersion 1.0.0
 * @apiError 403 Invalid credentials.
 */

/**
 * @api{delete} /auth/ Logout
 * @apiName logout
 * @apiGroup Authorization
 * @apiPermission Owner
 * @apiSuccessExample
 * {"code":200,"message":"OK","data":[],"pagination":null,"uri":"https:\/\/apidev.growish.com\/v1\/auth\/","method":"DELETE"}
 * @apiUse AppKey
 * @apiVersion 1.0.0
 */