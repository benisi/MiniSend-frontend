## About Minisend

MiniSend is a cloud-based transactional email service that allows our customers to manage transactional emails

## Project setup
```
yarn install
```
### Create a .env file in the root directory and add the env variables below
```
VUE_APP_API_HOST= // example: http://localhost:8000/api
PORT= //example: 8001 (optional)
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### To send a mail, create an api token 

![image](https://user-images.githubusercontent.com/47527863/113569231-09039080-960a-11eb-9339-a4e668de3193.png)


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Send a POST request to http://{your local address}/api/v1/email with the payload

```
{
    "from": {
        "email": "dad@doe.com",
        "name": "father doe"
    },
    "to": [
        {
            "email": "john@doe.com",
            "name": "John doe"
        },
        {
            "email": "mark@doe.com",
            "name": "Mark doe"
        }
    ],
    "subject": "Hi from {$company}",
    "text": "test",
    "html": "<h1>{$company} is saying hi</h1><p>testing html with {$company}</p>",
    "variables": [
        {
            "email": "john@doe.com,
            "substitutions": [
                {
                    "var": "company",
                    "value": "MiniSend"
                }
            ]
        }
    ],
    "attachments" : [
                {
                    "filename" : "test.jpg",
                    "content" : "base 64 file content"
                }
            ]
}
```
### With Headers
```
Authorization: Bearer {generated token}
Accept: application/json
```

### Note

- attachments is optional
- You can either send a text or an html not both
- if you add a variable kindly provide it's substitution, if this is not done nothing will be substituted

