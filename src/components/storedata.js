
export function storedata(type, userData){
    let BaseUrl = " https://handyman-heroku.herokuapp.com/";


    return new Promise((resolve, reject) => {

        fetch(BaseUrl+type,{
            method: 'PUT',
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