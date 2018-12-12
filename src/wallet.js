/**
 * @api{post} /b2b-wallet/ New Wallet
 * @apiName newWallet
 * @apiGroup Wallet
 * @apiDescription Creates a new wallet with bond.
 * @apiPermission Private
 *
 * @apiParam (Identification) {String{1..30}} [reference] Unique reference number/code used by the wallet creator to identify the procedure. On success GrowishPay will provide a unique ID you can also use to identify the wallet.
 *
 * @apiParam (Owner data) {Email} ownerEmail Email of the wallet owner
 * @apiParam (Owner data) {String} ownerTaxcode Owner's tax code in "Codice fiscale" format.
 * @apiParam (Owner Data) {String{2..30}} [ownerOccupation] Owner's occupation
 * @apiParam (Owner data) {String{2..30}} ownerFirstName First name of the wallet owner
 * @apiParam (Owner data) {String{2..30}} ownerLastName Last name of the wallet owner
 * @apiParam (Owner data) {String} ownerBirthday Date of birth of the wallet owner in format YYYY-MM-DD
 *
 * @apiParam (Extra) {Number} bond Bond amount in eurocents
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *        "result": "OK",
 *        "code": 200,
 *        "data": {
 *          "id": "53b157b19a6b51c4048b4572"
 *        }
 *   }
 *
 * @apiUse AppKey
 * @apiUse Token
 * @apiVersion 1.0.0
 */

/**
 * @api{post} /b2b-wallet/:walletId/transaction New Wallet offline transaction
 * @apiName newWalletTransaction
 * @apiGroup Wallet
 * @apiDescription Associates a new offline transaction to a wallet. Use this for register cash-ins outside of GWP EPOS. i.e. at client's shops
 * @apiPermission Private
 *
 * @apiParam (Transaction info) {Number} amount Amount of the transaction in eurocents
 * @apiParam (Transaction info) {String{1..30}} [tenderDescription] Use this to identify the type of cash-in, you can use your own descriptors; cash, card, other...
 *
 * @apiParam (Payer info) {String{1..30}} [payerFirstName] First name of the payer
 * @apiParam (Payer info) {String{1..30}} [payerLastName] Last name of the payer
 * @apiParam (Payer info) {Email} [payerEmail] Email of the payer
 *
 * @apiParam (Extra) {String{1..300}} [message] A message to attach to the transaction.
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *        "result": "OK",
 *        "code": 200,
 *        "data": {
 *          "id": "222abc",
 *          "amount": 50000,
 *          "tender": "custom",
 *          "tenderDescription": "cash contribution in agency",
 *          "payerFirstName": "Rosa",
 *          "payerLastName": "Filippi",
 *          "payerEmail": "email@test.com",
 *          "message": "Congrats!"
 *        }
 *   }
 *
 * @apiUse AppKey
 * @apiUse Token
 * @apiVersion 1.0.0
 */

/**
 * @api{get} /b2b-wallet/:walletId Get Wallet information and transactions
 * @apiName getWallet
 * @apiGroup Wallet
 * @apiDescription Retrieves the wallet data and a list of transactions. When a transaction is made using GWP, the *tender*
 * key is populate with the value *GWP*, otherwise, if it is an offline transaction made with *\/b2b-wallet/:walletId/transaction*
 * the key will be *custom* and the key *tenderDescription* will present your custom description.
 * @apiPermission Private
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *        "result": "OK",
 *        "code": 200,
 *        "data": {
 *          "id": "53b157b19a6b51c4048b4572",
 *          "reference": "123abc",
 *          "ownerEmail": "somewhere@overtheraibow.com",
 *          "ownerFirstName": "John",
 *          "ownerLastName": "Smith",
 *          "ownerTaxcode": "foobar",
 *          "ownerBirthday": "1986-01-01",
 *          "bond": 500000,
 *          "transactions": [
 *              {
 *                "id": "123abc",
 *                "amount": 4200,
 *                "tender": "GWP",
 *                "tenderDescription": null,
 *                "payerFirstName": "John",
 *                "payerLastName": "Wick",
 *                "payerEmail": "email@test.com",
 *                "message": "Congrats!"
 *              },
 *              {
 *                "id": "222abc",
 *                "amount": 50000,
 *                "tender": "custom",
 *                "tenderDescription": "cash contribution in agency",
 *                "payerFirstName": "Rosa",
 *                "payerLastName": "Filippi",
 *                "payerEmail": "email@test.com",
 *                "message": "Congrats!"
 *              }
 *          ],
 *          "totals": {
 *            "collectedUsingGWP": 4200,
 *            "collectedUsingCustomTender": 50000,
 *            "transferredBellowBond": 4200,
 *            "amountInWallet": 0,
 *            "collected": 54200
 *          },
 *          "status": "open"
 *        }
 *   }
 *
 * @apiUse AppKey
 * @apiUse Token
 * @apiVersion 1.0.0
 */

/**
 * @api{post} /close-b2b-wallet/:walletId Close a wallet
 * @apiName closeWallet
 * @apiGroup Wallet
 * @apiDescription It changes the wallet *status* from *open* to *close*. A closed wallet does not accepts any new
 * cash-ins from GWP or custom tender. If there are amounts over the bond, GrowishPay automatically sends an email
 * to the wallet owner asking for a bank account to deposit the excess amount.
 *
 * @apiPermission Private
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *        "result": "OK",
 *        "code": 200,
 *        "data": {}
 *   }
 *
 * @apiUse AppKey
 * @apiUse Token
 * @apiVersion 1.0.0
 */