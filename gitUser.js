const fetch = require('node-fetch');
const rs = require('readline-sync');


const uApi = (uname) => 
    new Promise((resolve, reject) => {
        fetch('https://api.github.com/users/' + uname, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => {resolve(result)})
        .catch(error => {reject(error)})
    })

const getData = async (uname) => {
    try {
        let data = await uApi(uname);
        if (data.id){
            console.log("==========Github User Info==========");
            console.log("Username : " + data.login);
            console.log("Name : " + data.name);
            console.log("Following : " + data.following);
            console.log("Followers : " + data.followers);
            console.log("==========Github User Info==========");
        }else{
            console.log('[!] Username ' + uname + ' not found');
        }
    } catch (error) {
        console.log('[!] Error : ' + error);
    }
};

do {
    uname = rs.question("[?] Enter Username : ");
    getData(uname);
    condition = rs.keyInYN("[?] Add another Username ?");
}while (condition);