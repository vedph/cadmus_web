# User Roles

Cadmus provides 4 user roles:

1. `admin`: administrator.
2. `editor`: editor.
3. `operator`: operator.
4. `visitor`: visitor.

Each of the upper roles has all the authorizations of the lower roles. The editing operations according to these roles are listed below, with the minimum role number required.

- register user: `admin`
- resend confirmation email: `visitor`
- conform registration: `visitor`
- change password: `visitor`
- reset password: `visitor`
- delete user: `admin`
- delete item: `editor`
- delete part: `editor`; `operator` only for parts created by himself.
- add/update item: `operator`
- add/update part: `operator`
- get users info list: `visitor`
- get user: `admin`
- get current user: `visitor`
- update user: `admin`
