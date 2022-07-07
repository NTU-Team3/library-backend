# library-backend

## Endpoints

&nbsp;

### 🚩 _/admin_

| Verb               | Path             | Functions                | Description                                                                               |
| ------------------ | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| GET (POST)         | /admin/a-members | addmembers()             | - adds demo data of 5 members, collection is created if not existant                      |
| GET (DELETE)       | /admin/d-members | deletemembers()          | - deletes demo data based on \_ids of same 5 members, from addmembers()                   |
| GET (DELETE, POST) | /admin/r-members | resetmembers(delm, addm) | - resets demo date with callback functions, first calls deletemember(), then addmembers() |

&nbsp;
&nbsp;

### 🚩 _/member_

| Verb | Path                             | Functions          | Description                                                                                                     | Comments           |
| ---- | -------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------ |
| GET  | /member/v-loans/:memberid        | viewloans()        | - view all loans                                                                                                |                    |
| ⬆️   | /member/v-reservations/:memberid | viewreservations() | - view all histories                                                                                            |                    |
| ⬆️   | /member/v-histories/:memberid    | viewhistories()    | - view all reservations                                                                                         |                    |
| ⬆️   | /member/v-reviews/:memberid      | viewreviews()      | - view all reviews                                                                                              |                    |
| ⬆️   | /member/v-profile/:memberid      | viewprofile()      | - view editable profile info                                                                                    | - Unhashing on pwd |
| PUT  | /member/u-loans/                 | updateloans()      | - update single loan status of book - refreshes "On Loan" to "Returned", refreshes "returndate" to current date | - In Progress      |
| ⬆️   | /member/u-reviews/               | updatereviews()    | - update single review - refreshes "rating" / "comments" / "reviewdate"                                         | - In Progress      |
| ⬆️   | /member/u-profile/               | updateprofile()    | - update member profile - refreshes "name" / "email" / "password"                                               | - Hashing on pwd   |
| ⬆️   | /member/checkout                 | checkout()         | - create loan records for single or multiple items, at checkout on the cart page                                |                    |

&nbsp;
&nbsp;

| Params - Members.\_id    | Field - Members.name | Field - Members.loans/reservations/reviews                                                                                                  |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 62bb5207127ffb266882da91 | ikoh                 | 8 record/s in loans - "On Loan" (x2), loans (histories) - "Returned" (x2), reservations - "Pickup Ready (x1), "In Queue" (x1), reviews (x2) |
| 62bb5207127ffb266882da92 | swchee               | 4 record/s in loans - "On Loan" (x1), loans (histories) - "Returned" (x1), reservations - "In Queue" (x1), reviews (x1)                     |
| 62bb5207127ffb266882da93 | rlau                 | 1 record/s in loans - "On Loan" (x1)                                                                                                        |
| 62bb5207127ffb266882da94 | sbahri               | 1 record/s in reservations - "Pickup Ready" (x1)                                                                                            |
| 62bb5207127ffb266882da95 | kmsheng              | 0 record/s                                                                                                                                  |
| 62bb5207127ffb266882da99 | TEST USER            | 0 record/s - _[ \*\*\* This particular record is not part of the demodata generated from /admin/a-members ]_                                |
