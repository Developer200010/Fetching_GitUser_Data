# kindly note :-
* `Used github API and it has a limited get request`
---
## Good Day :-)
## This project is made to fetch all the public data of github users

> Description : One can fetch of a specific user data like repos name, desc. and languages use.

>> Functions define in the project and use of it.

```
 1.defaultRander()
 2.fetchRepo()
 3.fetchAllLanguage()
```
---
## Define use of function.
| Function | Description |
| ------ | ----------- |
| defaultRander()   | When it's called first it render the default user data l.e Developer200012, after submission of form it picks up value from searh. In this function fetchRepo() has called so that it fetch the repo data when new user data passed |
| fetchRepo() | In fetchRepo we are specifically geting data of repositoried such as repo name, repo description and for languages a function get calls i.e fetchAllLanguaged . |
| fetchAllLanguage |In fetchAllLanguage, language being provided which is called in fetchRepo. |
---

>> API use in function

```
1.defaultRender() - https://api.github.com/users/"+originalname
2.fetchRepo() - https://api.github.com/users/${originalname}/repos?per_page=${dataLimit}&page=${pageNum}
3.fetchAllLanguage - https://api.github.com/repos/${originalname}/${reponame}/languages
```
---

