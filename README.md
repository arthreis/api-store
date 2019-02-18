**api-store**
----  
* **URL**

  <_https://api-store.herokuapp.com/_>
  
**Customer**
----  
  Cria um cliente.

* **URL**

  /customers

* **Method:**

  `POST`
  
*  **URL Params**
   None

   **Required:** 
   None

* **Data Params**
```javascript
  {
    "name": "Firstname Secondname",
    "email" : "user@email.com",
    "password": "123456"
   }
```

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `{ message: 'Cliente cadastrado com sucesso!' }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ FIELD: 'FIELD MESSAGE ERROR' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Falha ao processar sua requisição' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/customers",
      dataType: "json",
      data: {
              "name": "Firstname Secondname",
              "email" : "user@email.com",
              "password": "123456"
            },
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
  * **Notes:**

  <__> 
