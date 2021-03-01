const LocalStorageService = (function(){

    var _service;
    function _getService(){
        if(!_service){
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(tokenObj){
        window.localStorage.setItem(`access_token`,tokenObj.access);
        window.localStorage.setItem(`refresh_token`, tokenObj.refresh);
    }
     function _getAccessToken(){
         return window.localStorage.getItem(`access_token`);
     }
     function _getRefreshToken(){
         window.localStorage.getItem(`refresh_token`);
     }
     function _clearToken(){
         window.localStorage.removeItem(`access_token`);
         window.localStorage.removeItem(`refresh_token`);
     }

     return {
         getService : _getService,
         setToken : _setToken,
         getAccessToken : _getAccessToken,
         getRefreshToken : _getRefreshToken,
         clearToken : _clearToken
     }
}) ();
export default LocalStorageService;