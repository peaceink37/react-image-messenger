// ./src/api/api.js

// Development or production
const getLocation=()=>{

    let location = window.location.href;
    let l;
    if(location.indexOf('localhost') !== -1){
        l = 'localhost:3000';
    } else {
        l = 'www.kbytedesign.com';
    }
    return l;
}

/**
* Pull kbyte image data and post image api
*/
export const kbyteImages = (searchQuery) => {
    let host = getLocation();
    const KBYTE_ENDPOINT = 'http://'+host+'/api/kbyteimages/?text="outside"&per_page=20';
    
    return fetch(KBYTE_ENDPOINT)
        .then(response => {
            return response.json()
        })
        .then(json => {
            //console.log(" json photos "+json.photo[2].id);
            return json.photo.map((obj) => ({
                id:obj.id || 'f'+Math.round(Math.random()*50),
                mediaUrl:obj.mediaUrl,
                title:obj.title,

            }))
        })


};

// Posts image data and image title to server
export const postKImage = (imageObject) => {

    let host = getLocation();
    const KIMAGE_ENDPOINT = `http://`+host+`/api/upload/imageobj/?title=${imageObject.title}&uid="kelly123`;

    var payload = new FormData();
        payload.append('uid', imageObject.uid || "fuzzy"+Math.round(Math.random()*10000));
        payload.append('imgbase64', imageObject.data);

    return fetch(KIMAGE_ENDPOINT, {
        method:'post',
        body:payload,
        headers: new Headers({
            'Content-Type':undefined
        })
    }).then(response =>{
        console.log(" response post image "+response);
        return response.json();
    })
}


