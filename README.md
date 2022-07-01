# library-backend

## Endpoints

&nbsp;

### 🚩 _/admin_

| Verb         | Path             | Description                                                         |
| ------------ | ---------------- | ------------------------------------------------------------------- |
| GET / POST   | /admin/a-members | adds demodata of 5 members, collection is created if not existant   |
| GET / DELETE | /admin/d-members | deletes demodata based on \_ids of same 5 members from addmembers() |

&nbsp;
&nbsp;

### 🚩 _/member/_

| Verb | Path                             |
| ---- | -------------------------------- |
| GET  | /member/v-loans/:memberid        |
| GET  | /member/v-reservations/:memberid |
| GET  | /member/v-histories/:memberid    |
| GET  | /member/v-reviews/:memberid      |
| GET  | /member/v-profile/:memberid      |

&nbsp;
&nbsp;

| Params - memberid        | Field - Members.name | Field - Members.loans/reservations/reviews                                                                  |
| ------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| 62bb5207127ffb266882da91 | ikoh                 | - 8 records in loans(on loan), loans(returned), reservations(pickup ready), reservations(in queue), reviews |
| 62bb5207127ffb266882da92 | swchee               | - 4 records in loans(on loan), loans(returned), reservations(in queue), reviews                             |
| 62bb5207127ffb266882da93 | rlau                 | - 1 record in loans(on loan)                                                                                |
| 62bb5207127ffb266882da94 | sbahri               | - 1 record in reservations(pickup ready)                                                                    |
| 62bb5207127ffb266882da95 | kmsheng              | - 0 records                                                                                                 |
