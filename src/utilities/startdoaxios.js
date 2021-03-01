import axios from "axios";
import LocalStorageService from "./localStorageService"
import router from "./router";
import Cookies from 'js-cookie';
//LocalStorageService

const localStorageService = LocalStorageService.getService();
const csrfToken = Cookies.get('csrftoken');
//Add a request interceptor




