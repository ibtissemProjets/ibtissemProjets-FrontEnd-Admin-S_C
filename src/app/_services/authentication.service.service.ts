import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable, BehaviorSubject} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

export interface UserDetails{
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse{
    token: string
}

export interface TokenPayload{
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
}

@Injectable()
export class AuthenticationService {

private token: string
public isLoggedIn$: BehaviorSubject<boolean>;

constructor(private http: HttpClient, private router: Router,){
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
}

private saveToken(token: string) : void{
    localStorage.setItem('userToken',token)
this.token = token
}

createUser(data): Observable<any> {
    return this.http.post("http://localhost:3000/users/createUser", data);
  }


private getToken(): string{
    if(!this.token){
        this.token = localStorage.getItem('userToken')
    }
    return this.token

}

public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if(token) {
payload = token.split('.')[1]
payload = window.atob(payload)
return JSON.parse(payload)
    }else{
        return null
    }
}

public isLoggedIn(): boolean{
const user = this.getUserDetails()
if(user){
    return user.exp > Date.now() / 1000
}else{
    return false
}
}

public register(user: TokenPayload) : Observable <any>{
    const base = this.http.post('http://localhost:3000/users/register',user)
const request = base.pipe(
    map((data: TokenResponse)=>{
        if(data.token){
            this.saveToken(data.token)
        }
        return data
    })
)
return request
}

public login(user: TokenPayload) : Observable <any>{
    const base = this.http.post('http://localhost:3000/users/login',user)
const request = base.pipe(
    map((data: TokenResponse)=>{
        if(data.token){
            this.saveToken(data.token)
            console.log(data.token)
        }
        return data
    })
)
return request
}

public profile (): Observable<any> {
    return this.http.get('http://localhost:3000/users/profile',{
        headers: {Authorization:`${this.getToken()}`}
    })
}
 
public logout (): void{
this.token = ''
window.localStorage.removeItem('userToken')
this.router.navigateByUrl('/')


}


    logout2() {
        // logic
        this.token = ''
        window.localStorage.removeItem('RestaurantId')
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('userId')
        localStorage.setItem('loggedIn', 'false');
        this.isLoggedIn$.next(false);
        this.router.navigateByUrl('/login')
    }

}