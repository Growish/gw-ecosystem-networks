<iframe width="100%" height="500" src="https://www.youtube.com/embed/FU3Bh2AgrT0?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

&nbsp;
&nbsp;

### Overview

This document is intended for Networks of travel agencies, business, tour operators, software houses, purchasing groups, or any other type of business
who wants to integrate the GrowishPay payment solutions in white label through a proprietary software to their clients or partners.

Let's say you are a software house that produces a CRM for several clients, and you wish to add a module to that CRM that allows your
users to create electronic wallets so they can accept collective payments. GrowishPay gives you a RESTful API you can integrate in
your CRM to allow them to Login to GrowishPay, create wallets, sync wallet operations to your fiscal system and other tools.

&nbsp;

### Definitions

**Network**: community of all merchants with the same logics and rules.

**Client**: merchant who wants to offer online group payments via credit card and bank withdrawal

**Owner/user**: the person (customer of the client) beneficiary of the service.

&nbsp;

### Preregistration

We need to know who your clients are so we can authorize them to use the GrowishPay API on your behalf. To do so, we can provide a
UI to your clients so they can register one by one or you can provide a CVS file or any other format with all your client required
information. After the registration, we send the access credentials directly to you or to your clients, this credentials are required
to consume the API later on.

&nbsp;

<img src="img/registrazione-agenzie.png" alt="UI di registrazione" height="350"/>

&nbsp;

During developing, we add some testing clients to your account.

&nbsp;

### Wallet bond

When creating a new wallet you specify an owner (from now on User) and a bond among other details. The bond value is expressed in eurocents and it
represents a contract between your client and the user of the wallet. All cash-in operations bellow that bond value
are immediately transfer to the client's wallet. When the collected amount surpass the bond value, all new cash-ins transactions
stay in the user's wallet. This is useful if your client creates wallets to collect money for a product or service, they specified
the cost of the goods as the bond, so all the transaction bellow that, goes directly to your client, all the exceeding amounts remain in the
client's wallet. When creating a new wallet with bond, GrowishPay sends an email to the user with a link to accept or decline
the contract.

&nbsp;

<img src="img/image001.png" alt="UI di registrazione" height="350"/>

&nbsp;

### EPOS

GrowishPay provides an electronic point of sale to do cash-ins on wallets with credit card and withdrawals, for more
documentation and examples; <a href="https://webpaymentsdev.growish.com" target="_blank">click here</a> (Italian only).

&nbsp;

### API Environments

We provide two environments - one for your live production usage, and one fully functional developing environment for testing:


##### DEVELOPING
**Base url**: https://apidev.growish.com/v1

##### PRODUCTION
**Base url**: https://api.growish.com/v1


&nbsp;

### API Formats

**Amounts**: Numbers who refers to money amounts are always expressed in cents (eurocents)

**Currencies**: By default we operate always in EUROS, unless is specified differently in the contract.

**Dates**: Dates are always expressed as *YYYY-MM-DD*

**DateTimes**: Dates with time are always expressed as *YYYY-MM-DD hh:mm:ss*

&nbsp;

### API Response codes
|code|description|
|---|---|
|200|Request successful|
|400|There is at least one validation error in the body of the request  (missing parameters or constraint violation)|
|401|The token is invalid or expired|
|403|Forbidden request|
|404|Object not found or invalid query|
|500|Internal server error|

&nbsp;

### API Successful response format
For all responses with response code 200, the json object is as follows:
<pre>
{
  code: 200,
  data: {},
  message: "OK",
  method: "GET",
  pagination: null,
  uri: "https://api.growish.com/v1/:endpoint"
}
</pre>

The fields *code*, *method*, and *uri* are echoes of the request.

**message**: Human friendly response, default language: Italian.

**data**: Contains the requested asset/entity.

**pagination**: When null, means all the data is available in *data* or the object does not require pagination.
The API calls exposed in this document do not use pagination so you can ignore this field.

&nbsp;

### API Error response format
When the response code is different from 200, the response object behaves differently according to the error code:

&nbsp;

#### 400: There is at least one validation error in the body of the request
The field *message* will contain an object explaining the validation error:

<pre>
{
 "code": 400,
 "message": {
   "email": {
     "isEmpty":"Il dato richiesto non può essere vuoto"
   },
   "birthday": {
     "dateInvalidDate": "Il valore non sembra essere una data valida"
   },
   "firstName": {
     "stringLengthTooShort": "Questo campo deve contenere almeno 2 caratteri"
   }
 }
 "data": null,
 "uri": "https://api.growish.com/v1/user/",
 "method":"POST"
}
</pre>

You can iterate the *message* object and use the resulting strings as validation error messages to show in your forms,
or if you prefer to use your own validation messages use the keys and not the values, but we don't recommend this extra step.
If you need a complete list of validator messages keys, please contact GrowishPay.

&nbsp;

#### 401: The token is invalid or expired
When you get this error, you can ignore the response object format. A 401 errors requires you to redirect your client to the
login screen before continuing since the credential token is no longer valid.

&nbsp;

#### 403: Forbidden request
In this case, GrowishPay gives you a human friendly message in the *message* fields of the response you can simply show to your
user as a popup or alert. This type of error happen when the user use wrong credentials to login or try to do forbidden operations:

<pre>
{
  "code": 403,
  "message": "Credenziali di accesso non valide",
  "uri": "https://api.growish.com/v1/auth/",
  "method": "POST",
  "missingArgument": ""
}
</pre>

*missingArgument* is part of a legacy API, you can ignore it.

#### 404: Object not found or invalid query
Ignore the response format, the endpoint is invalid or the resource does not exist.

#### 500: Internal server error
Ignore the response format, we advise you to try again later, or contact support if the problem persists

&nbsp;

### API Authentication

All request to the API must include the header **X-App-Key**, this header identifies your application with GrowishPay and allows
custom business logic to be implemented and it's the same across all your applications of the same brand. This value will be provided to you when you ask for API access.

Your users will need to login eventually, using the <a href="#api-Authorization-authorization">/auth/login</a> endpoint you send
their credentials, and in case of success, the API respond with a Token valid for 30 days, you'll need to attach this token
on each private endpoint as a request header called **X-Auth-Token**. Store it on a safe place in your application.

&nbsp;

### CORS support

If you intend to add the GrowishPay API to a WebAPP you can do it without having to worry about cross origin requests, since
we support Cross-origin resource Sharing. While developing you must indicate your developing server domain so
we can authorize it, if you are developing locally or on a developing server with no public access you must use
a proxy.

&nbsp;

### Client integration

If needed, we can provide ready-to-use javascripts widgets to display and update API information.

&nbsp;

### Support

If you need help or have any doubts, please contact us at **servizioclienti@growish.com**.