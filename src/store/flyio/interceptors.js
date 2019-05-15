import Fly from 'flyio/dist/npm/wx'
const request = new Fly()

request.interceptors.request.use((request) => {
  if (request.body) {
    Object.keys(request.body).forEach(key => {
      if (request.url.includes(':' + key)) {
        // 动态 url ： 'update/:id/name'
        request.url = request.url.replace(':' + key, request.body[key]);
        Reflect.deleteProperty(request.body, key);
      }
    });
    Object.keys(request.body).length || (request.body = null);
  }

  return request;
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)

export default request
