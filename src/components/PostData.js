
export function PostData(type, userData){
    let BaseUrl = "http://127.0.0.1:1337/";

    // http://127.0.0.1:8080
   // http://127.0.0.1:1337
    // https://handyman-heroku.herokuapp.com


    return new Promise((resolve, reject) => {

        fetch(BaseUrl+type,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData)
        }) 
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);  
        });
    })
}