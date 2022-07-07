# library-backend

## Endpoints

&nbsp;

### 🚩 _/admin/..._

| Verb               | Path       | Function                 | Description                                                                               |
| ------------------ | ---------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| GET (POST)         | /a-members | addmembers()             | - adds demo data of 5 members, collection is created if not existant                      |
| GET (DELETE)       | /d-members | deletemembers()          | - deletes demo data based on \_ids of same 5 members, from addmembers()                   |
| GET (DELETE, POST) | /r-members | resetmembers(delm, addm) | - resets demo date with callback functions, first calls deletemember(), then addmembers() |

&nbsp;
&nbsp;

### 🚩 _/member/..._

| Verb | Path                      | Payload                                 | Function           | Description                                                                      | Comments           |
| ---- | ------------------------- | --------------------------------------- | ------------------ | -------------------------------------------------------------------------------- | ------------------ |
| GET  | /v-loans/:memberid        | id                                      | viewloans()        | - view all loans                                                                 |                    |
| ⬆️   | /v-reservations/:memberid | id                                      | viewreservations() | - view all reservations                                                          |                    |
| ⬆️   | /v-histories/:memberid    | id                                      | viewhistories()    | - view all histories                                                             |                    |
| ⬆️   | /v-reviews/:memberid      | id                                      | viewreviews()      | - view all reviews                                                               |                    |
| ⬆️   | /v-profile/:memberid      | id                                      | viewprofile()      | - view editable profile info                                                     | - Unhashing on pwd |
| PUT  | /u-loans/                 | { id, lid, btitle }                     | updateloans()      | - update single loan status of book - refreshes "status" / "returndate"          |                    |
| ⬆️   | /u-reviews/               | { id, rid, btitle, rrating, rcomments } | updatereviews()    | - update single review - refreshes "rating" / "comments" / "reviewdate"          |                    |
| ⬆️   | /u-profile/               | { id, pname, pemail, ppassword }        | updateprofile()    | - update member profile - refreshes "name" / "email" / "password"                | - Hashing on pwd   |
| ⬆️   | /checkout                 | [ { id, bid, btitle } ]                 | checkout()         | - create loan records for single or multiple items, at checkout on the cart page |                    |

&nbsp;
&nbsp;

| Params - Members.\_id    | Field - Members.name | Field - Members.loans/reservations/reviews                                                                                                          |
| ------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 62bb5207127ffb266882da91 | ikoh                 | 8 total record/s in : loans - "On Loan" (x2), loans (histories) - "Returned" (x2), reservations - "Pickup Ready (x1), "In Queue" (x1), reviews (x2) |
| 62bb5207127ffb266882da92 | swchee               | 4 total record/s in : loans - "On Loan" (x1), loans (histories) - "Returned" (x1), reservations - "In Queue" (x1), reviews (x1)                     |
| 62bb5207127ffb266882da93 | rlau                 | 1 total record/s in : loans - "On Loan" (x1)                                                                                                        |
| 62bb5207127ffb266882da94 | sbahri               | 1 total record/s in : reservations - "Pickup Ready" (x1)                                                                                            |
| 62bb5207127ffb266882da95 | kmsheng              | 0 record/s                                                                                                                                          |
| 62bb5207127ffb266882da99 | TEST USER            | 0 record/s - _[ \*\*\* This particular record is not part of the demodata generated from /admin/a-members ]_                                        |
