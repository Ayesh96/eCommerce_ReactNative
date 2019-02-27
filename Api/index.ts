import config from './configuration'



export const checkConfig = () => {
    if (config.url === "" || config.consumerKey === "" || config.consumerSecret === "" || config.consumerKey === undefined || config.consumerSecret === undefined) {
        console.log('configuration missing')
        return false
    }else{
        console.log('configuration found : ',config)
        return true
    }
}

export const WC = {
    post: (endpoint,data,success,error)=>{
        if(checkConfig()){
                  let url = config.url + "wp-json/wc/v3/" + endpoint + "?consumer_key=" + config.consumerKey + "&consumer_secret=" + config.consumerSecret + "&oauth_signature=" + config.auth
                  let body = JSON.stringify(data)
                  let header = {
                      "Content-Type": "application/json"
                  }
                  let requestConfig = {
                      method: "POST",
                      headers: header,
                      body: body
                  }
                  fetch(url, requestConfig)
                      .then(d => {
                          d.json()
                              .then(
                                  data => {
                                      if (data.status === "error") {
                                          error(data)
                                      } else {
                                          success(data)
                                      }
                                  }
                              )
                      })
                      .catch(e => {
                          error(e)
                      })
        }else{
            console.log('Missing config')
            return
        }

    },
    get:  (endpoint,params,success,error)=>{
        if(checkConfig()){
            let parameter = ""
            Object.entries(params).forEach(
                ([key, value]) => {
                    let val = "&" + key + "=" + value
                    let prev = parameter
                    parameter = prev + val
                    console.log(key, value)
                }
            )
            let url = config.url + "wp-json/wc/v3/" + endpoint + "?consumer_key=" + config.consumerKey + "&consumer_secret=" + config.consumerSecret + "&oauth_signature=" + config.auth + parameter
            console.log('final url ',url)
            fetch(url)
            .then(d=>{
                d.json()
                .then(
                    data=>{

                    if(data.status === "error"){
                        error(data)
                    }else{
                        success(data)
                    }
                    }
                )
            })
            .catch(e=>{
                error(e)
            })
        }else{
            console.log('Missing config')
            return
        }
    },
    auth: (credentials,success,error)=> {
        if(checkConfig()){
        if(credentials){
            if (!credentials.user){
                console.log('username required')
                return
            }
            if (!credentials.password){
                console.log('password required')
                return
            }
            let url = config.url + "api/auth/generate_auth_cookie/?insecure=cool&username=" + credentials.user + "&password=" + credentials.password
            fetch(url)
            .then(data=>{
                data.json()
                .then(
                    d=>{
                        success(d)
                })
                .catch(e=>{
                    error(e)
                })
            }).catch(e=>{
                    error(e)
            })
        }else{
            console.log('missing configuration object with username and password')
            return
        }
        }


    },
    customApi: (endpoint, data,success,error) => {
        if (checkConfig()) {
            if (data) {
                let url = config.url + endpoint
                 let h = {
                     "Content-Type": "application/json",
                     "Cache-Control": "no-cache"
                 }
                 let headers = new Headers(h)
                fetch(url,{
                    method:'POST',
                    headers:headers,
                    body:JSON.stringify(data)
                })
                .then(
                    res=>{
                        res.json()
                        .then(
                            d=>{
                                if(d.status === 1){
                                    success(d)
                                }else{
                                    error(d)
                                }
                            }
                        )
                        .catch(e=>{
                            error(e)
                        })
                    }
                )
            } else {
                console.log('missing configuration object with username and password')
                return
            }
        }
    },
    customGet: (endpoint, success, error) => {
      if (checkConfig()) {
        let url = config.url + endpoint
          fetch(url)
            .then(
              res => {
                res.json()
                  .then(
                    d => {
                        success(d)
                        console.log(d)
                    }
                  )
                  .catch(e => {
                    error(e)
                  })
              }
            )

      }
    }
}
export default WC
